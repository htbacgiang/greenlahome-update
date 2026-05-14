import formidable from "formidable";
import { NextApiRequest } from "next";
import Post, { PostModelSchema } from "../models/Post";
import { CommentResponse, PostDetail, UserProfile } from "../utils/types";
import db from "../utils/db";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface FormidablePromise<T> {
  files: formidable.Files;
  body: T;
}

export const readFile = <T extends object>(
  req: NextApiRequest
): Promise<FormidablePromise<T>> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ files, body: fields as T });
    });
  });
};

/**
 * Lấy tất cả bài viết mà không giới hạn.
 */
export const readAllPostsFromDb = async (): Promise<PostModelSchema[]> => {
  await db.connectDb();
  return await Post.find()
    .sort({ createdAt: "desc" })
    .select("-content");
};

/**
 * Lấy bài viết phân trang với hỗ trợ isDraft và isDirectPost filters
 */
export const readPostsFromDb = async (
  limit?: number,
  pageNo?: number,
  skip?: number,
  includeDrafts: boolean = false,
  includeDirectPosts: boolean = false
): Promise<PostModelSchema[]> => {
  if (limit && limit > 100)
    throw Error("Please use limit under 100");

  const finalSkip = skip !== undefined ? skip : (limit && pageNo ? limit * pageNo : 0);
  await db.connectDb();

  const filter: any = {
    $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
  };

  if (!includeDrafts) {
    filter.isDraft = { $ne: true };
  }
  if (!includeDirectPosts) {
    filter.isDirectPost = { $ne: true };
  }

  let query = Post.find(filter)
    .sort({ createdAt: "desc" })
    .select("-content")
    .skip(finalSkip);

  if (limit) {
    query = query.limit(limit);
  }

  const posts = await query;
  return posts;
};

export const formatPosts = (posts: PostModelSchema[]): PostDetail[] => {
  return posts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    category: post.category,
    createdAt: post.createdAt.toString(),
    thumbnail: post.thumbnail?.url || "",
    meta: post.meta,
    tags: post.tags,
    isDraft: post.isDraft || false,
    isFeatured: post.isFeatured || false,
    featuredOrder: post.featuredOrder ?? null,
    isDirectPost: post.isDirectPost || false,
  }));
};

const getLikedByOwner = (likes: any[], user: UserProfile) =>
  likes.includes(user.id);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
