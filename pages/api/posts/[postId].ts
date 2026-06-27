import formidable from "formidable";
import { NextApiHandler } from "next";
import { getToken } from "next-auth/jwt";
import cloudinary from "../../../lib/cloudinary";
import { readFile } from "../../../lib/utils";
import { postValidationSchema, validateSchema } from "../../../lib/validator";
import Post from "../../../models/Post";
import { IncomingPost } from "../../../utils/types";
import db from "../../../utils/db";

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "PATCH":
      return updatePost(req, res);
    case "DELETE":
      return removePost(req, res);
    case "POST":
      return restorePost(req, res);
    default:
      return res.status(404).send("Not found!");
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

const removePost: NextApiHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const session = token ? { user: token } : null;

  if (!session || !session.user) {
    return res.status(401).json({ error: "Bạn cần đăng nhập!" });
  }

  try {
    await db.connectDb();

    const postId = req.query.postId as string;
    if (!postId) {
      return res.status(400).json({ error: "Invalid post id" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found!" });
    }

    // Kiểm tra quyền - Admin có thể xóa mọi bài viết
    const isAdmin = session.user.role === 'admin';
    const isOwner = post.author && post.author.toString() === session.user.sub;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: "Bạn không có quyền xóa bài viết này!" });
    }

    // Soft delete: Đánh dấu bài viết đã xóa
    post.deletedAt = new Date();
    await post.save();

    res.json({ removed: true, message: "Đã xóa bài viết vào thùng rác!" });
  } catch (error: any) {
    console.error("Delete post error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  } finally {
    await db.disconnectDb();
  }
};

const updatePost: NextApiHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const session = token ? { user: token } : null;

  if (!session || !session.user) {
    return res.status(401).json({ error: "Bạn cần đăng nhập!" });
  }

  try {
    await db.connectDb();

    const postId = req.query.postId as string;
    if (!postId) {
      return res.status(400).json({ error: "Invalid post id" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found!" });
    }

    const isAdmin = session.user.role === 'admin';
    const isOwner = post.author && post.author.toString() === session.user.sub;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: "Bạn không có quyền chỉnh sửa bài viết này!" });
    }

    const { files, body } = await readFile<IncomingPost>(req);
    const error = validateSchema(postValidationSchema, { ...body });
    if (error) {
      return res.status(400).json({ error });
    }

    const { title, content, meta, slug, category } = body;
    const author = (body as any).author;
    const isDraft = parseOptionalBooleanField((body as any).isDraft);
    const isFeatured = parseBooleanField((body as any).isFeatured);
    const isDirectPost = parseBooleanField((body as any).isDirectPost);

    // Đảm bảo slug duy nhất
    const uniqueSlug = await ensureUniqueSlug(
      slug && slug.trim() ? slug.trim() : post.slug,
      postId
    );

    post.title = title;
    post.content = content;
    post.meta = meta;
    post.slug = uniqueSlug;
    post.category = category;
    
    const authorVal = getFieldValue(author);
    if (authorVal) {
      post.author = authorVal as any;
    }

    if (typeof isDraft === 'boolean') {
      post.isDraft = isDraft;
    }

    post.isFeatured = isFeatured;
    post.isDirectPost = isDirectPost;

    // Cập nhật thumbnail
    const thumbnailFile = files.thumbnail as formidable.File | undefined;
    const thumbnailUrl = (body as any).thumbnail as string | undefined;

    if (thumbnailFile) {
      const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        thumbnailFile.filepath,
        { folder: process.env.CLOUDINARY_FOLDER || "greenlahome" }
      );
      const oldPublicId = post.thumbnail?.public_id;
      if (oldPublicId) await cloudinary.uploader.destroy(oldPublicId);
      post.thumbnail = { url, public_id };
    } else if (thumbnailUrl && thumbnailUrl.trim() && thumbnailUrl !== post.thumbnail?.url) {
      post.thumbnail = { url: thumbnailUrl.trim() };
    }

    await post.save();
    res.json({ post, message: "Cập nhật thành công!" });
  } catch (error: any) {
    console.error("Update post error:", error);
    res.status(500).json({ error: error.message });
  } finally {
    await db.disconnectDb();
  }
};

const restorePost: NextApiHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const session = token ? { user: token } : null;

  if (!session || !session.user) {
    return res.status(401).json({ error: "Bạn cần đăng nhập!" });
  }

  try {
    await db.connectDb();

    const postId = req.query.postId as string;
    if (!postId) {
      return res.status(400).json({ error: "Invalid post id" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found!" });
    }

    const isAdmin = session.user.role === 'admin';
    const isOwner = post.author && post.author.toString() === session.user.sub;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: "Bạn không có quyền phục hồi bài viết này!" });
    }

    if (!post.deletedAt) {
      return res.status(400).json({ error: "Bài viết này chưa bị xóa!" });
    }

    // Phục hồi bài viết
    post.deletedAt = undefined;
    await post.save();

    res.json({ restored: true, post, message: "Đã phục hồi bài viết thành công!" });
  } catch (error: any) {
    console.error("Restore post error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
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

export default handler;
