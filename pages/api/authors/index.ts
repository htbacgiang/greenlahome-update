import { NextApiHandler } from "next";
import db from "../../../utils/db";
import { getToken } from "next-auth/jwt";
import Author from "../../../models/Author";
import slugify from "slugify";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return getAuthors(req, res);
    case "POST":
      return createAuthor(req, res);
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
};

const getAuthors: NextApiHandler = async (req, res) => {
  try {
    await db.connectDb();
    const authors = await Author.find({}).sort({ createdAt: -1 });
    res.json({ authors });
  } catch (error: any) {
    console.error("Error in getAuthors:", error);
    res.status(500).json({ error: error.message });
  } finally {
    await db.disconnectDb();
  }
};

const createAuthor: NextApiHandler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const session = token ? { user: token } : null;

  if (!session || !session.user || (session.user as any).role !== "admin") {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const { name, role, biography, avatar, slug } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Tên tác giả không được để trống" });
    }

    await db.connectDb();

    // Ensure unique slug
    const baseSlug = slug && slug.trim() ? slug.trim() : slugify(name.toLowerCase(), { strict: true });
    let finalSlug = baseSlug;
    let suffix = 1;
    while (await Author.findOne({ slug: finalSlug })) {
      finalSlug = `${baseSlug}-${suffix++}`;
    }

    const newAuthor = new Author({
      name: name.trim(),
      role: role ? role.trim() : "",
      biography: biography ? biography.trim() : "",
      avatar: avatar || { url: "" },
      slug: finalSlug,
    });

    await newAuthor.save();
    res.status(201).json({ author: newAuthor, message: "Tạo tác giả thành công!" });
  } catch (error: any) {
    console.error("Error in createAuthor:", error);
    res.status(500).json({ error: error.message });
  } finally {
    await db.disconnectDb();
  }
};

export default handler;
