const mongoose = require("mongoose");
const db = require("./utils/db").default;
const Post = require("./models/Post").default;

async function check() {
  await db.connectDb();
  const slug = "thiet-ke-phong-bep-nho-thong-minh-toi-uu-tung-met-vuong-su-dung";
  const post = await Post.findOne({ slug });
  console.log("Post:", post ? { slug: post.slug, isDirectPost: post.isDirectPost, isDraft: post.isDraft, deletedAt: post.deletedAt } : "NOT FOUND");
  await db.disconnectDb();
}
check();
