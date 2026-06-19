import { GetServerSideProps, NextPage } from "next";
import parse from "html-react-parser";
import DefaultLayout from "../components/layout/DefaultLayout";
import db from "../utils/db";
import Post from "../models/Post";
import Share from "../components/common/Share";
import Link from "next/link";
import Image from "next/image";
import { trimText } from "../utils/helper";

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
  recentPosts: {
    id: string;
    title: string;
    slug: string;
    category: string;
    thumbnail?: string;
    createdAt: string;
    isDirectPost?: boolean;
  }[];
};

type MetaData = {
  title: string;
  description: string;
  keywords: string;
  robots: string;
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
  post?: PostData;
  meta?: MetaData;
};

const host = process.env.NEXT_PUBLIC_HOST || "https://greenlahome.vn";

const normalizeImageUrl = (imageUrl: string | undefined, baseUrl: string): string => {
  if (!imageUrl) return `${baseUrl}/images/noi-that-1.jpg`;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  return `${baseUrl}${imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`}`;
};

const getPostHref = (post: { slug: string; isDirectPost?: boolean }) =>
  post.isDirectPost ? `/${post.slug}` : `/bai-viet/${post.slug}`;

const processPostContent = (content: string) => {
  if (!content) return content;

  return content.replace(
    /(<figure[^>]*>[\s\S]*?<\/figure>)|<img([^>]*)>/gi,
    (match, figureTag, imgAttrs) => {
      if (figureTag || !imgAttrs) return match;

      const showCaptionMatch = imgAttrs.match(/data-show-caption=["']true["']/i);
      if (!showCaptionMatch) return match;

      const altMatch = imgAttrs.match(/alt=["']([^"']+)["']/i);
      if (!altMatch || !altMatch[1]) return match;

      return `<figure><img${imgAttrs}><figcaption>${altMatch[1]}</figcaption></figure>`;
    }
  );
};

const DirectPost: NextPage<Props> = ({ post, meta }) => {
  if (!post) {
    return (
      <DefaultLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mt-[100px]">
            <h1 className="text-2xl font-bold text-gray-800">Bài viết không tồn tại</h1>
            <p className="text-gray-600 mt-2">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Link href="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
              ← Quay lại trang chủ
            </Link>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  const { title, content, slug, category, recentPosts } = post;
  const processedContent = processPostContent(content);

  return (
    <DefaultLayout
      title={meta?.title}
      desc={meta?.description}
      thumbnail={meta?.og?.image}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/4 pr-0 md:pr-4 mb-4 md:mb-0 overflow-visible">
            <div className="md:pb-20 pb-6 container mx-auto mt-[60px] sm:mt-[91px]">
              <div className="flex font-bold gap-2 text-base text-gray-600">
                <Link href="/" className="hover:text-blue-800 whitespace-nowrap">
                  Trang chủ
                </Link>
                <span>›</span>
                <span className="flex font-bold gap-2 mb-4 text-base text-gray-600">
                  {trimText(title, 35)}
                </span>
              </div>

              <h1 className="md:text-3xl text-xl font-bold text-primary-dark dark:text-primary">
                {title}
              </h1>
              <div className="mt-2 mb-2">
                <Share url={`${host}/${slug}`} />
              </div>

              <div className="blog prose prose-lg dark:prose-invert [&_img]:mx-auto overflow-visible">
                <style jsx>{`
                  .blog {
                    overflow: visible;
                  }
                  .blog img {
                    display: block;
                    margin: 1.5em auto;
                  }
                  .blog figure {
                    margin: 1.5em 0;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                  }
                  .blog figure img {
                    display: block;
                    margin: 0 auto;
                  }
                  .blog figcaption {
                    margin-top: 0.5em;
                    font-size: 0.875em;
                    color: #6b7280;
                    font-style: italic;
                    text-align: center;
                    width: 100%;
                    max-width: 100%;
                  }
                  .dark .blog figcaption {
                    color: #9ca3af;
                  }
                `}</style>
                {parse(processedContent || content)}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/4 px-0.5 pl-3">
            <div className="pt-5 md:mt-[91px]">
              <p className="text-3xl font-bold text-primary-dark dark:text-primary p-2 mb-4">
                Bài viết gần đây
              </p>
              <div className="flex flex-col space-y-4">
                {recentPosts && recentPosts.length > 0 ? recentPosts.slice(0, 5).map((p) => (
                  <Link key={p.slug} href={getPostHref(p)} legacyBehavior>
                    <a className="flex space-x-3 w-full group">
                      {p.thumbnail && (
                        <Image
                          src={p.thumbnail}
                          alt={`Thumbnail for ${p.title}`}
                          width={80}
                          height={80}
                          className="w-32 h-32 object-cover rounded"
                        />
                      )}
                      <div className="flex flex-col flex-1">
                        <span className="text-base font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                          {p.title}
                        </span>
                        <div className="text-base flex items-center mt-1 gap-2">
                          <span className="text-gray-500">
                            {new Date(p.createdAt).toLocaleDateString("vi-VN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }).replace("tháng ", "Tháng ")}
                          </span>
                        </div>
                      </div>
                    </a>
                  </Link>
                )) : (
                  <p className="text-gray-600">Không có bài viết gần đây.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DirectPost;

export const getServerSideProps: GetServerSideProps<
  { post?: PostData; meta?: MetaData },
  { slug: string }
> = async ({ params }) => {
  try {
    await db.connectDb();
    const baseUrl = process.env.NEXT_PUBLIC_HOST || "https://greenlahome.vn";

    const post = await Post.findOne({
      slug: params?.slug,
      isDirectPost: { $in: [true, "true", "1", 1] },
      isDraft: { $ne: true },
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    });

    if (!post) {
      return { notFound: true };
    }

    const posts = await Post.find({
      _id: { $ne: post._id },
      isDraft: { $ne: true },
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("slug title thumbnail category createdAt isDirectPost");

    const recentPosts = posts.map((p) => ({
      id: p._id.toString(),
      title: p.title,
      slug: p.slug,
      category: p.category || "Uncategorized",
      thumbnail: normalizeImageUrl(p.thumbnail?.url, baseUrl),
      createdAt: p.createdAt.toString(),
      isDirectPost: p.isDirectPost || false,
    }));

    const { _id, title, content, meta, slug, tags, thumbnail, category, createdAt } = post;
    const thumbnailUrl = normalizeImageUrl(thumbnail?.url, baseUrl);
    const truncatedDescription = trimText(meta, 160) || `Đọc bài viết "${title}" từ GreenLa Home.`;

    const metaData: MetaData = {
      title: `${title} | GreenLa Home`,
      description: truncatedDescription,
      keywords: `${title}, thiết kế nội thất, GreenLa Home, kiến trúc, trang trí nhà, ${category}`,
      robots: "index, follow",
      author: "GreenLa Home",
      canonical: `${baseUrl}/${slug}`,
      og: {
        title: `${title} | GreenLa Home`,
        description: truncatedDescription,
        type: "article",
        image: thumbnailUrl,
        imageWidth: "1200",
        imageHeight: "630",
        url: `${baseUrl}/${slug}`,
        siteName: "GreenLa Home",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | GreenLa Home`,
        description: truncatedDescription,
        image: thumbnailUrl,
      },
    };

    return {
      props: {
        post: {
          id: _id.toString(),
          title,
          content,
          meta,
          slug,
          tags,
          category: category || "Uncategorized",
          thumbnail: thumbnailUrl,
          createdAt: createdAt.toString(),
          recentPosts,
        },
        meta: metaData,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps (direct post):", error);
    return { notFound: true };
  }
};
