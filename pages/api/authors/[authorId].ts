import { NextApiHandler } from "next";
import db from "../../../utils/db";
import { getToken } from "next-auth/jwt";
import Author from "../../../models/Author";
import slugify from "slugify";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return getAuthor(req, res);
    case "PUT":
      return updateAuthor(req, res);
    case "DELETE":
      return deleteAuthor(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};

const getAuthor: NextApiHandler = async (req, res) => {
  try {
    const { authorId } = req.query;
    await db.connectDb();
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ error: "Không tìm thấy tác giả" });
    }
    res.json({ author });
  } catch (error: any) {
    console.error("Error in getAuthor:", error);
    res.status(500).json({ error: error.message });
  } finally {
    await db.disconnectDb();
  }
};

const updateAuthor: NextApiHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const session = token ? { user: token } : null;

  if (!session || !session.user || (session.user as any).role !== "admin") {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const { authorId } = req.query;
    const { name, role, biography, avatar, slug } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Tên tác giả không được để trống" });
    }

    await db.connectDb();

    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ error: "Không tìm thấy tác giả" });
    }

    // Ensure unique slug if slug has changed
    let finalSlug = author.slug;
    if (slug && slug.trim() && slug.trim() !== author.slug) {
      const baseSlug = slug.trim();
      finalSlug = baseSlug;
      let suffix = 1;
      while (await Author.findOne({ slug: finalSlug, _id: { $ne: authorId } })) {
        finalSlug = `${baseSlug}-${suffix++}`;
      }
    } else if (name.trim() !== author.name) {
      // Auto-update slug if name changed and slug was not manually specified
      const baseSlug = slugify(name.toLowerCase(), { strict: true });
      finalSlug = baseSlug;
      let suffix = 1;
      while (await Author.findOne({ slug: finalSlug, _id: { $ne: authorId } })) {
        finalSlug = `${baseSlug}-${suffix++}`;
      }
    }

    author.name = name.trim();
    author.role = role ? role.trim() : "";
    author.biography = biography ? biography.trim() : "";
    if (avatar) author.avatar = avatar;
    author.slug = finalSlug;

    await author.save();
    res.json({ author, message: "Cập nhật tác giả thành công!" });
  } catch (error: any) {
    console.error("Error in updateAuthor:", error);
    res.status(500).json({ error: error.message });
  } finally {
    await db.disconnectDb();
  }
};

const deleteAuthor: NextApiHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const session = token ? { user: token } : null;

  if (!session || !session.user || (session.user as any).role !== "admin") {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const { authorId } = req.query;
    await db.connectDb();
    const author = await Author.findByIdAndDelete(authorId);
    if (!author) {
      return res.status(404).json({ error: "Không tìm thấy tác giả" });
    }
    res.json({ message: "Xóa tác giả thành công!" });
  } catch (error: any) {
    console.error("Error in deleteAuthor:", error);
    res.status(500).json({ error: error.message });
  } finally {
    await db.disconnectDb();
  }
};

export default handler;
