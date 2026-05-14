import { NextApiHandler } from "next";
import User from "../../../models/User";
import db from "../../../utils/db";

const handler: NextApiHandler = (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      return getUsers(req, res);
    default:
      res.status(404).send("Not found!");
  }
};

const getUsers: NextApiHandler = async (req, res) => {
  const { pageNo = "0", limit = "5" } = req.query as {
    pageNo: string;
    limit: string;
  };

  try {
    await db.connectDb();

    const limitNum = parseInt(limit);
    const skipNum = parseInt(pageNo) * limitNum;

    const total = await User.countDocuments();

    const results = await User.find()
      .sort({ createdAt: "desc" })
      .skip(skipNum)
      .limit(limitNum)
      .select("name email phone role image emailVerified gender dateOfBirth address createdAt");

    const users = results.map(({ _id, name, email, phone, role, image, emailVerified, gender, dateOfBirth, address }) => ({
      id: _id.toString(),
      name,
      email,
      phone: phone || null,
      role: role || "user",
      image: image || null,
      emailVerified: emailVerified || false,
      gender: gender || null,
      dateOfBirth: dateOfBirth || null,
      address: address || [],
    }));

    res.json({ users, total });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
