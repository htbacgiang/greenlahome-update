import { NextApiHandler } from "next";
import db from "../../../utils/db";
import { getToken } from "next-auth/jwt";
import { postValidationSchema, validateSchema } from "../../../lib/validator";
import { formatPosts, readFile, readPostsFromDb } from "../../../lib/utils";
import Post from "../../../models/Post";
import formidable from "formidable";
import cloudinary from "../../../lib/cloudinary";
import { IncomingPost } from "../../../utils/types";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return readPosts(req, res);
    case "POST":
      return createNewPost(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};

const getFieldValue = (value: any) => Array.isArray(value) ? value[0] : value;

const parseBooleanField = (value: any): boolean => {
  const normalizedValue = getFieldValue(value);
  return normalizedValue === true ||
    normalizedValue === "true" ||
    normalizedValue === "1" ||
    normalizedValue === 1;
};

const parseOptionalBooleanField = (value: any): boolean | undefined => {
  const normalizedValue = getFieldValue(value);
  if (
    normalizedValue === true ||
    normalizedValue === "true" ||
    normalizedValue === "1" ||
    normalizedValue === 1
  ) {
    return true;
  }
  if (
    normalizedValue === false ||
    normalizedValue === "false" ||
    normalizedValue === "0" ||
    normalizedValue === 0
  ) {
    return false;
  }
  return undefined;
};

const createNewPost: NextApiHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const session = token ? { user: token } : null;

  if (!session || !session.user) {
    return res.status(401).json({ error: "Bạn cần đăng nhập để đăng bài!" });
  }

  try {
    const { files, body } = await readFile<IncomingPost>(req);
    let tags: string[] = [];
    try {
      tags = body.tags ? JSON.parse(body.tags as string) : [];
    } catch {
      tags = [];
    }

    // Kiểm tra dữ liệu đầu vào
    const error = validateSchema(postValidationSchema, { ...body, tags });
    if (error) return res.status(400).json({ error });

    const { title, content, slug, meta, category } = body;

    await db.connectDb();

    const existingPostId =
      ((body as any).postId || (body as any).id || "").toString().trim();

    // Nếu frontend gửi kèm id/postId, coi đây là luồng cập nhật
    if (existingPostId) {
      const existingPost = await Post.findById(existingPostId);
      if (!existingPost) {
        return res.status(404).json({ error: "Không tìm thấy bài viết cần cập nhật!" });
      }

      const isAdmin = session.user.role === "admin";
      const isOwner = existingPost.author && existingPost.author.toString() === session.user.sub;
      if (!isAdmin && !isOwner) {
        return res.status(403).json({ error: "Bạn không có quyền chỉnh sửa bài viết này!" });
      }

      const uniqueSlug = await ensureUniqueSlug(
        slug && slug.trim() ? slug.trim() : title || undefined,
        existingPostId
      );

      const isFeatured = parseBooleanField((body as any).isFeatured);
      const isDirectPost = parseBooleanField((body as any).isDirectPost);
      const parsedIsDraft = parseOptionalBooleanField((body as any).isDraft);

      existingPost.title = title;
      existingPost.content = content;
      existingPost.slug = uniqueSlug;
      existingPost.meta = meta;
      existingPost.tags = tags;
      existingPost.category = category;
      existingPost.isFeatured = isFeatured;
      existingPost.isDirectPost = isDirectPost;
      if (typeof parsedIsDraft === "boolean") {
        existingPost.isDraft = parsedIsDraft;
      }

      const authorVal = getFieldValue((body as any).author);
      if (authorVal) {
        existingPost.author = authorVal;
      }

      const thumbnailUrl = (body as any).thumbnail as string | undefined;
      const thumbnailFile = files.thumbnail as formidable.File | undefined;
      if (thumbnailFile) {
        const { secure_url: url, public_id } = await cloudinary.uploader.upload(
          thumbnailFile.filepath,
          { folder: process.env.CLOUDINARY_FOLDER || "greenlahome" }
        );

        const oldPublicId = existingPost.thumbnail?.public_id;
        if (oldPublicId) await cloudinary.uploader.destroy(oldPublicId);

        existingPost.thumbnail = { url, public_id };
      } else if (
        thumbnailUrl &&
        thumbnailUrl.trim() &&
        thumbnailUrl !== existingPost.thumbnail?.url
      ) {
        existingPost.thumbnail = { url: thumbnailUrl.trim() };
      }

      await existingPost.save();
      return res.json({ post: existingPost, message: "Cập nhật bài viết thành công!" });
    }

    // Đảm bảo slug luôn duy nhất
    const uniqueSlug = await ensureUniqueSlug(
      slug && slug.trim() ? slug.trim() : title || undefined
    );

    const isFeatured = parseBooleanField((body as any).isFeatured);
    const isDirectPost = parseBooleanField((body as any).isDirectPost);

    // Tạo bài viết mới
    const authorVal = getFieldValue((body as any).author);
    const newPost = new Post({
      title,
      content,
      slug: uniqueSlug,
      meta,
      tags,
      category,
      author: authorVal || session.user.sub,
      isDraft: false,
      isFeatured: isFeatured || false,
      isDirectPost: isDirectPost || false,
    });

    // Xử lý thumbnail
    const thumbnailUrl = (body as any).thumbnail as string | undefined;
    const thumbnailFile = files.thumbnail as formidable.File | undefined;

    if (thumbnailFile) {
      const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        thumbnailFile.filepath,
        { folder: process.env.CLOUDINARY_FOLDER || "greenlahome" }
      );
      newPost.thumbnail = { url, public_id };
    } else if (thumbnailUrl && thumbnailUrl.trim()) {
      newPost.thumbnail = { url: thumbnailUrl.trim() };
    }

    await newPost.save();
    res.json({ post: newPost });
  } catch (error: any) {
    console.error("Lỗi tạo bài viết:", error);
    res.status(500).json({ error: error.message || "Lỗi máy chủ!" });
  } finally {
    await db.disconnectDb();
  }
};

const ensureUniqueSlug = async (
  rawSlug?: string,
  excludePostId?: string
): Promise<string> => {
  const baseSlug = (rawSlug && rawSlug.trim()) ? rawSlug.trim() : `post-${Date.now()}`;
  let candidate = baseSlug;
  let suffix = 1;

  while (
    await Post.findOne({
      slug: candidate,
      ...(excludePostId ? { _id: { $ne: excludePostId } } : {}),
    })
  ) {
    candidate = `${baseSlug}-${suffix++}`;
  }

  return candidate;
};

const readPosts: NextApiHandler = async (req, res) => {
  try {
    const { limit, pageNo, skip, includeDrafts } = req.query as {
      limit: string;
      pageNo: string;
      skip: string;
      includeDrafts?: string;
    };

    // Chỉ admin mới có thể xem draft
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const session = token ? { user: token } : null;
    const isAdmin = session?.user?.role === 'admin';
    const shouldIncludeDrafts = includeDrafts === 'true' && isAdmin;
    const shouldIncludeDirectPosts = isAdmin;

    const posts = await readPostsFromDb(
      limit ? parseInt(limit) : undefined,
      pageNo ? parseInt(pageNo) : undefined,
      skip ? parseInt(skip) : undefined,
      shouldIncludeDrafts,
      shouldIncludeDirectPosts
    );

    res.json({ posts: formatPosts(posts) });
  } catch (error: any) {
    console.error("Error in readPosts:", error);
    res.status(500).json({ error: error.message });
  }
};

export default handler;
