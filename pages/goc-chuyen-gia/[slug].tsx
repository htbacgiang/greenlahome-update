import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
// @ts-expect-error type resolution issue with bundler mode
import parse from "html-react-parser";
import DefaultLayout from "../../components/layout/DefaultLayout";
import db from "../../utils/db";
import Post from "../../models/Post";
import Share from "../../components/common/Share";
import Link from "next/link";
import Image from "next/image";
import { trimText } from "../../utils/helper";

type PostData = {
  id: string;
  title: string;
  content: string;
  meta: string;
  tags: string[];
  slug: string;
  thumbnail: string;
  createdAt: string;
  category: string;
  relatedPosts: {
    id: string;
    title: string;
    slug: string;
    category: string;
    thumbnail?: string;
  }[];
};

type MetaData = {
  title: string;
  description: string;
  author: string;
  canonical: string;
  og: {
    title: string;
    description: string;
    type: string;
    image: string;
    imageWidth: string;
    imageHeight: string;
    url: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
};

type Props = {
  post: PostData;
  meta: MetaData;
};

const host = "https://greenlahome.vn/goc-chuyen-gia";

export const APP_NAME = "Nội thất Greenla Home";
const SinglePost: NextPage<Props> = ({ post }) => {
  const { title, content, meta, slug, thumbnail, category, createdAt, relatedPosts } = post;

  return (
    <DefaultLayout>
      <div className="container mx-auto px-5 py-8 md:flex md:space-x-8">
        <div className="flex-[3] mb-4 md:mb-0">
          <div className="md:pb-20 pb-6 container mx-auto mt-[60px] sm:mt-[91px]">
            {/* Breadcrumb */}
            <div className="flex font-semibold gap-2 text-base text-gray-600">
              <Link href="/goc-chuyen-gia" className="hover:text-blue-800 whitespace-nowrap">
                Góc chuyên gia
              </Link>
              <span>›</span>
              <span className="flex font-semibold gap-2 mb-4 text-base text-gray-600">
                {trimText(title, 35)}
              </span>
            </div>

            {/* Tiêu đề bài viết */}
            <h1 className="md:text-3xl text-xl font-bold text-primary-dark dark:text-primary">
              {title}
            </h1>
            <div className="mt-2 mb-2">
              <Share url={`${host}/${slug}`} />
            </div>
            <div className="mt-2 uppercase text-green-800 font-xl">
              <b>{category}</b>
            </div>
            <div className="blog prose prose-lg dark:prose-invert max-w-2xl md:max-w-4xl lg:max-w-5xl">
              {parse(content)}
            </div>
          </div>
        </div>

        {/* Related Posts Section */}
        <div className="flex-[1] md:mt-[91px] mt-10">
          <div className="pt-5">
            <p className="text-3xl font-semibold text-primary-dark dark:text-primary p-2 mb-4">
              Bài viết cùng chủ đề
            </p>
            <div className="flex flex-col space-y-4">
              {relatedPosts
                .filter((p) => p.category === category)
                .slice(0, 5)
                .map((p) => (
                  <Link key={p.slug} href={`/bai-viet/${p.slug}`} legacyBehavior>
                    <a className="flex space-x-3 items-start group">
                      {/* Ảnh thu nhỏ */}
                      {p.thumbnail && (
                        <Image
                          src={p.thumbnail}
                          alt={p.title}
                          width={120}
                          height={90}
                          className="w-[120px] h-[90px] object-cover rounded-md flex-shrink-0"
                        />
                      )}

                      {/* Tiêu đề + ngày */}
                      <div className="flex flex-col text-sm">
                        <span className="text-gray-800 font-medium group-hover:text-blue-700 leading-snug">
                          {p.title}
                        </span>
                        <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          📅 {new Date(post.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SinglePost;

export const getServerSideProps: GetServerSideProps<
  { post: PostData; meta: MetaData },
  { slug: string }
> = async ({ params }) => {
  try {
    await db.connectDb();

    const post = await Post.findOne({ slug: params?.slug });
    if (!post) {
      console.log(`Post not found for slug: ${params?.slug}`);
      return { notFound: true };
    }

    const posts = await Post.find({
      _id: { $ne: post._id },
      category: post.category,
    })
      .sort({ createdAt: "desc" })
      .limit(5)
      .select("slug title thumbnail category");

    const relatedPosts = posts.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      slug: p.slug,
      category: p.category || "Uncategorized",
      thumbnail: p.thumbnail?.url,
    }));

    const { _id, title, content, meta, slug, tags, thumbnail, category, createdAt } = post;

    const metaData: MetaData = {
      title,
      description: meta,
      author: "Nội thất Greenla Home",
      canonical: `https://greenlahome.vn/goc-chuyen-gia/${slug}`,
      og: {
        title,
        description: meta,
        type: "website",
        image: thumbnail?.url || "https://greenlahome.vn/images/noi-that-1.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: `https://greenlahome.vn/goc-chuyen-gia/${slug}`,
        siteName: "Nội thất Greenla Home",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: meta,
        image: thumbnail?.url || "https://greenlahome.vn/images/noi-that-1.jpg",
      },
    };

    const postData: PostData = {
      id: _id.toString(),
      title,
      content,
      meta,
      slug,
      tags,
      category,
      thumbnail: thumbnail?.url || "",
      createdAt: createdAt.toString(),
      relatedPosts,
    };

    return {
      props: {
        post: postData,
        meta: metaData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return { notFound: true };
  }
};