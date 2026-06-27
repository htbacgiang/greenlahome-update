import {
  GetServerSideProps,
  NextPage,
} from "next";
import parse from "html-react-parser";
import DefaultLayout2 from "../../components/layout/DefaultLayout2";
import db from "../../utils/db";
import Post from "../../models/Post";
import Author from "../../models/Author";
import Share from "../../components/common/Share";
import TableOfContents from "../../components/common/TableOfContents";
import Link from "next/link";
import Image from "next/image";
import slugify from "slugify";
import { trimText } from "../../utils/helper";
import {
  normalizeSiteImageUrl,
  rewriteCloudinaryImageUrls,
} from "../../utils/imageUrls";

type AuthorData = {
  name: string;
  role?: string;
  biography?: string;
  avatarUrl?: string;
};

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
  authorData?: AuthorData;
  headings: { id: string; text: string; level: number }[];
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
  debugSlug?: string;
};

const host = process.env.NEXT_PUBLIC_HOST || "https://greenlahome.vn";

const getPostHref = (post: { slug: string; isDirectPost?: boolean }) =>
  post.isDirectPost ? `/${post.slug}` : `/bai-viet/${post.slug}`;

const SinglePost: NextPage<Props> = ({ post, meta }) => {
  // Add null/undefined checks to prevent errors
  if (!post) {
    return (
      <DefaultLayout2>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mt-[100px]">
            <h1 className="text-2xl font-bold text-gray-800">Bài viết không tồn tại</h1>
            <p className="text-gray-600 mt-2">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Link href="/bai-viet" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
              ← Quay lại danh sách bài viết
            </Link>
          </div>
        </div>
      </DefaultLayout2>
    );
  }

  const { title, content, meta: postMeta, slug, thumbnail, category, createdAt, recentPosts } = post;

  // Xử lý content để thêm figcaption cho ảnh có data-show-caption="true"
  const processedContent = (() => {
    if (!content) return content;

    let processed = rewriteCloudinaryImageUrls(content);

    // Tìm tất cả các thẻ img (không nằm trong figure)
    // Regex này sẽ match img không nằm trong figure tag
    processed = processed.replace(
      /(<figure[^>]*>[\s\S]*?<\/figure>)|<img([^>]*)>/gi,
      (match, figureTag, imgAttrs) => {
        // Nếu là figure tag thì giữ nguyên
        if (figureTag) {
          return match;
        }

        // Xử lý img tag
        if (!imgAttrs) return match;

        // Kiểm tra xem có data-show-caption="true" không
        const showCaptionMatch = imgAttrs.match(/data-show-caption=["']true["']/i);
        if (!showCaptionMatch) {
          return match; // Không có data-show-caption="true", giữ nguyên
        }

        // Lấy alt text
        const altMatch = imgAttrs.match(/alt=["']([^"']+)["']/i);
        if (!altMatch || !altMatch[1]) {
          return match; // Không có alt text, giữ nguyên
        }

        const altText = altMatch[1];

        // Bọc ảnh trong figure và thêm figcaption
        return `<figure><img${imgAttrs}><figcaption>${altText}</figcaption></figure>`;
      }
    );

    return processed;
  })();

  return (
    <DefaultLayout2>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Main Content - 75% width on md and up */}
          <div className="w-full md:w-3/4 pr-0 md:pr-4 mb-4 md:mb-0 overflow-visible">
            <div className="md:pb-20 pb-6 container mx-auto mt-[60px] sm:mt-[91px]">
              {/* Breadcrumb */}
              <div className="flex font-bold gap-2 text-base text-gray-600">
                <Link href="/bai-viet" className="hover:text-blue-800 whitespace-nowrap">
                  Bài viết
                </Link>
                <span>›</span>
                <span className="flex font-bold gap-2 mb-4 text-base text-gray-600">
                  {trimText(title, 35)}
                </span>
              </div>

              {/* Tiêu đề bài viết */}
              <h1 className="md:text-3xl text-xl font-bold text-primary-dark dark:text-primary">
                {title}
              </h1>
              <div className="mt-2 mb-2">
                <Share url={`${host}/bai-viet/${slug}`} />
              </div>

              {/* Table of Contents */}
              <TableOfContents headings={post.headings} />

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

              {/* Author Bio Card */}
              {post.authorData && (
                <div className="mt-12 p-6 rounded-xl border border-gray-200/80 bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col sm:flex-row items-center sm:items-start gap-5 transition-shadow hover:shadow-sm">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border border-green-100 dark:border-green-900 bg-slate-50 shrink-0">
                    {post.authorData.avatarUrl ? (
                      <Image
                        src={post.authorData.avatarUrl}
                        alt={post.authorData.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold">
                        {post.authorData.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="text-center sm:text-left flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase tracking-widest block mb-1">
                      {post.authorData.role || "Tác giả bài viết"}
                    </span>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {post.authorData.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
                      {post.authorData.biography}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Posts Section - 25% width on md and up */}
          <div className="w-full md:w-1/4 px-0.5  pl-3">
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
                          <span className=" text-orange-700">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              ></path>
                            </svg>
                          </span>
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
    </DefaultLayout2>
  );
};

export default SinglePost;

export const getServerSideProps: GetServerSideProps<
  { post?: PostData; meta?: MetaData },
  { slug: string }
> = async ({ params }) => {
  try {
    await db.connectDb();
    const baseUrl = process.env.NEXT_PUBLIC_HOST || "https://greenlahome.vn";

    // Chỉ lấy bài viết đã publish (không phải nháp) và chưa bị xóa
    const post = await Post.findOne({
      slug: params?.slug,
      isDraft: { $ne: true },
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }]
    }).populate("author");

    if (!post) {
      console.log(`Post not found for slug: ${params?.slug}`);
      const errorMeta: MetaData = {
        title: `Bài viết không tồn tại (${params?.slug}) | Greenlahome`,
        description: `Chúng tôi không tìm thấy bài viết với slug: ${params?.slug}. Hãy kiểm tra lại đường dẫn.`,
        keywords: "bài viết không tồn tại, thiết kế nội thất, Greenlahome",
        robots: "noindex, follow",
        author: "Greenlahome",
        canonical: `${baseUrl}/bai-viet`,
        og: {
          title: "Bài viết không tồn tại | Greenlahome",
          description: `Không tìm thấy slug: ${params?.slug}`,
          type: "website",
          image: `${baseUrl}/images/noi-that-1.jpg`,
          imageWidth: "1200",
          imageHeight: "630",
          url: `${baseUrl}/bai-viet`,
          siteName: "Greenlahome",
        },
        twitter: {
          card: "summary_large_image",
          title: "Bài viết không tồn tại | Greenlahome",
          description: `Không tìm thấy slug: ${params?.slug}`,
          image: `${baseUrl}/images/noi-that-1.jpg`,
        },
      };
      return {
        props: {
          meta: errorMeta,
          debugSlug: params?.slug || "MISSING"
        }
      };
    }

    // Chỉ lấy các bài viết đã publish và chưa bị xóa cho recent posts
    const posts = await Post.find({
      _id: { $ne: post._id },
      isDraft: { $ne: true },
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }]
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("slug title thumbnail category createdAt isDirectPost");

    const recentPosts = posts.map((p) => {
      // Giữ nguyên URL Cloudinary, chỉ fallback khi không có thumbnail
      const thumbUrl = p.thumbnail?.url;
      const thumbnail = thumbUrl
        ? (thumbUrl.startsWith("http://") || thumbUrl.startsWith("https://")
            ? thumbUrl
            : `${baseUrl}/${thumbUrl.replace(/^\/+/, "")}`)
        : undefined;

      return {
        id: p._id.toString(),
        title: p.title,
        slug: p.slug,
        category: p.category || "Uncategorized",
        thumbnail,
        createdAt: p.createdAt.toString(),
        isDirectPost: p.isDirectPost || false,
      };
    });

    const { _id, title, content, meta, slug, tags, thumbnail, category, createdAt, author } = post;
    const thumbnailUrl = normalizeSiteImageUrl(thumbnail?.url, baseUrl);

    const truncatedDescription = trimText(meta, 160) || `Đọc bài viết "${title}" về thiết kế nội thất từ chuyên gia Greenlahome. Kiến thức chuyên môn, xu hướng thiết kế mới nhất, giúp bạn tạo không gian sống hoàn hảo.`;

    // Extract populated author info
    const authorObj = author as any;
    const authorData: AuthorData = authorObj && authorObj.name ? {
      name: authorObj.name,
      role: authorObj.role || "Tác giả",
      biography: authorObj.biography || "Chuyên gia tư vấn thiết kế tại GreenlaHome.",
      avatarUrl: authorObj.avatar?.url || "/logo-greenlahome.png",
    } : {
      name: "Ban Biên Tập GreenlaHome",
      role: "Ban Biên Tập",
      biography: "Đội ngũ biên tập nội dung, chuyên viên tư vấn thiết kế và kiến trúc tại GreenlaHome.",
      avatarUrl: "/logo-greenlahome.png",
    };

    // Extract headings and add unique IDs to tags
    const { processedHtml, headings } = parseHeadingsAndAddIds(content || "");

    const metaData: MetaData = {
      title: `${title} | Greenlahome`,
      description: truncatedDescription,
      keywords: `${title}, thiết kế nội thất, Greenlahome, kiến trúc, trang trí nhà, xu hướng thiết kế, ${category}`,
      robots: "index, follow",
      author: authorData.name,
      canonical: `${baseUrl}/bai-viet/${slug}`,
      og: {
        title: `${title} | Greenlahome`,
        description: truncatedDescription,
        type: "article",
        image: thumbnailUrl,
        imageWidth: "1200",
        imageHeight: "630",
        url: `${baseUrl}/bai-viet/${slug}`,
        siteName: "Greenlahome",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Greenlahome`,
        description: truncatedDescription,
        image: thumbnailUrl,
      },
    };

    const postData: PostData = {
      id: _id.toString(),
      title,
      content: processedHtml,
      meta,
      slug,
      tags,
      category: category || "Uncategorized",
      thumbnail: thumbnailUrl,
      createdAt: createdAt.toString(),
      authorData,
      headings,
      recentPosts,
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

// Helper function to generate clean headings and IDs
const parseHeadingsAndAddIds = (html: string) => {
  const headings: { id: string; text: string; level: number }[] = [];
  let index = 1;

  const processedHtml = html.replace(
    /<(h2|h3)([^>]*)>([\s\S]*?)<\/\1>/gi,
    (match, tag, attrs, textContent) => {
      // Remove any tags inside the heading text
      const cleanText = textContent.replace(/<[^>]+>/g, "").trim();
      if (!cleanText) return match;

      const slugified = slugify(cleanText.toLowerCase(), {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: true,
        locale: "vi",
      }) || `heading-${index}`;
      
      const id = `${slugified}-${index++}`;

      headings.push({
        id,
        text: cleanText,
        level: tag.toLowerCase() === "h2" ? 2 : 3,
      });

      // Check if id attribute already exists
      if (/id=/i.test(attrs)) {
        return `<${tag}${attrs.replace(/id=["'][^"']*["']/i, `id="${id}"`)}>${textContent}</${tag}>`;
      } else {
        return `<${tag} id="${id}"${attrs}>${textContent}</${tag}>`;
      }
    }
  );

  return { processedHtml, headings };
};
