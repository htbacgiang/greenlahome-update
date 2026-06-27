import { useState, useEffect, useRef, useMemo } from "react";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt, FaUser, FaArrowRight, FaClock, FaTag } from "react-icons/fa";
import { trimText } from "../../utils/helper";
import { readPostsFromDb, formatPosts } from "../../lib/utils";

import DefaultLayout2 from "../../components/layout/DefaultLayout2";
import MainCategories from "../../components/common/MainCategories";
import { normalizePostCategory } from "../../utils/postCategories";

import { PostDetail } from "../../utils/types";

type MetaData = {
  title: string;
  description: string;
  keywords: string;
  author: string;
  robots: string;
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

const meta: MetaData = {
  title: "Blog Nội Thất - GreenLaHome",
  description: "Khám phá các bài viết về thiết kế nội thất, mẹo phong thủy và xu hướng không gian sống từ GreenLaHome. Liên hệ ngay để nhận tư vấn miễn phí! Hotline: 0962922332.",
  keywords: "thiết kế nội thất, tư vấn nội thất, phong thủy nội thất, GreenLaHome, xu hướng nội thất, không gian sống",
  author: "GreenLaHome",
  robots: "index, follow",
  canonical: "https://greenlahome.vn/bai-viet",
  og: {
    title: "Blog Nội Thất - GreenLaHome",
    description: "Khám phá các bài viết về thiết kế nội thất, phong thủy và xu hướng không gian sống từ GreenLaHome.",
    type: "website",
    image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
    imageWidth: "1200",
    imageHeight: "630",
    url: "https://greenlahome.vn/bai-viet",
    siteName: "GreenLaHome",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Nội Thất - GreenLaHome",
    description: "Tìm hiểu về thiết kế nội thất, phong thủy và xu hướng không gian sống tại GreenLaHome.",
    image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
  },
};

interface Props {
  initialPosts: PostDetail[];
}

const getPostHref = (post: { slug: string; isDirectPost?: boolean }) =>
  post.isDirectPost ? `/${post.slug}` : `/bai-viet/${post.slug}`;

const Blogs: NextPage<Props> = ({ initialPosts = [] }) => {
  const posts = initialPosts;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const filterBarRef = useRef<HTMLDivElement | null>(null);

  const recentPostsPerPage = 9; // Recent posts pagination
  const featuredPostsCount = 4; // Always show first 4 as featured

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  // Handle category filtering
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const filteredPosts = useMemo(() => {
    const normalizedCategory = normalizePostCategory(selectedCategory);

    if (!normalizedCategory) return posts;

    return posts.filter(
      (post) => normalizePostCategory(post.category) === normalizedCategory
    );
  }, [posts, selectedCategory]);

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined' && filterBarRef.current) {
      const headerOffset = 90;
      const rect = filterBarRef.current.getBoundingClientRect();
      const top = rect.top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Featured posts: luôn lấy từ toàn bộ posts (không phụ thuộc bộ lọc category)
  // - Chỉ lấy 4 bài viết có isFeatured = true, sắp xếp theo ngày tạo mới nhất
  const postsToCheck = posts;
  const featuredPosts = postsToCheck
    .filter((post) => post.isFeatured === true)
    .sort((a, b) => {
      // Sort theo featuredOrder (1-4), bài không có order thì xuống cuối
      const orderA = a.featuredOrder ?? 999;
      const orderB = b.featuredOrder ?? 999;
      return orderA - orderB;
    })
    .slice(0, featuredPostsCount);

  // Recent posts: Tất cả bài viết không phải featured
  const recentPostsAll = filteredPosts.filter((post) => post.isFeatured !== true);

  // Pagination cho recent posts
  const filteredRecentPosts = recentPostsAll;

  const recentStartIndex = (currentPage - 1) * recentPostsPerPage;
  const recentEndIndex = recentStartIndex + recentPostsPerPage;
  const recentPosts = filteredRecentPosts.slice(recentStartIndex, recentEndIndex);

  // Recalculate total pages based on filtered recent posts
  const totalRecentPosts = filteredRecentPosts.length;
  const calculatedTotalPages = Math.ceil(totalRecentPosts / recentPostsPerPage);
  const actualTotalPages = Math.max(1, calculatedTotalPages);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="author" content={meta.author} />
        <meta name="robots" content={meta.robots} />
        <link rel="canonical" href={meta.canonical} />

        {/* Open Graph */}
        <meta property="og:title" content={meta.og.title} />
        <meta property="og:description" content={meta.og.description} />
        <meta property="og:type" content={meta.og.type} />
        <meta property="og:image" content={meta.og.image} />
        <meta property="og:image:width" content={meta.og.imageWidth} />
        <meta property="og:image:height" content={meta.og.imageHeight} />
        <meta property="og:url" content={meta.og.url} />
        <meta property="og:site_name" content={meta.og.siteName} />

        {/* Twitter */}
        <meta name="twitter:card" content={meta.twitter.card} />
        <meta name="twitter:title" content={meta.twitter.title} />
        <meta name="twitter:description" content={meta.twitter.description} />
        <meta name="twitter:image" content={meta.twitter.image} />
      </Head>

      <DefaultLayout2>
        <div className="h-[80px]"></div>
        <div className="pb-12 mt-6 container mx-auto px-4">
          <div className="flex flex-col gap-4 justify-center w-full">
            {/* Breadcrumb */}
            <div className="flex gap-2 uppercase">
              <Link href="/" className="hover:text-green-800 transition-colors">
                Trang chủ
              </Link>
              <span>•</span>
              <Link href="/bai-viet" className="text-green-800 uppercase">
                Bài viết & Chia Sẻ
              </Link>
            </div>

            {/* Content */}
            <>
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="flex flex-col lg:flex-row gap-6 justify-between  ">
                  {/* Main Featured */}
                  {featuredPosts[0]?.thumbnail && (
                    <div className="w-full lg:w-8/12 flex flex-col gap-2">
                      <Link href={getPostHref(featuredPosts[0])}>
                        <div className="aspect-video relative cursor-pointer rounded shadow-sm shadow-secondary-dark overflow-hidden group">
                          <Image
                            src={featuredPosts[0].thumbnail}
                            layout="fill"
                            className="object-cover group-hover:scale-105 transition-all ease duration-300"
                            alt={featuredPosts[0].title}
                          />
                        </div>
                      </Link>
                      <div className="flex items-center gap-2">
                        <Link
                          href={getPostHref(featuredPosts[0])}
                          className="text-green-800 lg:text-lg uppercase font-bold hover:text-green-600 transition-colors"
                        >
                          {featuredPosts[0].title}
                        </Link>
                      </div>
                      <p className="text-base font-medium line-clamp-2 text-gray-600">
                        {trimText(featuredPosts[0].meta, 160)}
                      </p>
                      <div className="text-sm text-gray-500">
                        {formatDate(featuredPosts[0].createdAt)}
                      </div>
                    </div>
                  )}

                  {/* Secondary Featured */}
                  <div className="w-full lg:w-6/12 flex flex-col gap-4">
                    {featuredPosts.slice(1, 4).map((post, idx) => (
                      post.thumbnail && (
                        <div key={post.id} className="flex justify-between gap-4 h-auto lg:h-1/3">
                          <Link href={getPostHref(post)} className="w-1/3 aspect-video relative cursor-pointer rounded shadow-sm shadow-secondary-dark overflow-hidden group">
                            <Image
                              src={post.thumbnail}
                              layout="fill"
                              className="object-cover group-hover:scale-105 transition-all ease duration-300"
                              alt={post.title}
                            />
                          </Link>
                          <div className="w-2/3 flex flex-col justify-center">
                            <div className="flex items-center gap-2 text-sm lg:text-base mb-1">
                              <Link href={getPostHref(post)} className="text-green-800 uppercase font-bold hover:text-green-600 transition-colors">
                                {post.title}
                              </Link>
                            </div>
                            <p className="text-sm font-medium line-clamp-2 text-gray-600">
                              {trimText(post.meta, 100)}
                            </p>
                            <div className="text-xs text-gray-500 mt-1">
                              {formatDate(post.createdAt)}
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Category Filter */}
              <div ref={filterBarRef}>
                <MainCategories onCategorySelect={handleCategorySelect} />
              </div>

              {/* Recent Posts Grid */}
              {recentPosts.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-green-800">Bài viết gần đây</h2>
                    <p className="text-gray-600">
                      {recentPosts.length} bài viết
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentPosts.map((post) => (
                      <article
                        key={post.id}
                        className="group bg-white overflow-hidden transition-all duration-500 transform"
                      >
                        {/* Post Image */}
                        <div className="relative aspect-video overflow-hidden">
                          {post.thumbnail ? (
                            <Image
                              src={post.thumbnail}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 text-3xl">📝</span>
                            </div>
                          )}

                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Post Content */}
                        <div className="py-6">
                          {/* Title */}
                          <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-green-600 transition-colors line-clamp-2">
                            <Link href={getPostHref(post)}>
                              {post.title}
                            </Link>
                          </h3>

                          {/* Meta Info */}
                          <div className="flex items-center mt-2 justify-between text-sm text-gray-500 ">
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-1" />
                              <span>{formatDate(post.createdAt)}</span>
                            </div>
                            {/* Read More */}
                            <Link
                              href={getPostHref(post)}
                              className="inline-flex items-center text-red-500 hover:text-green-600 font-medium transition-colors group/link"
                            >
                              Đọc thêm
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* No Posts Message */}
              {(filteredPosts.length === 0 || (recentPosts.length === 0 && featuredPosts.length === 0)) && (
                <div className="text-center py-16 px-4">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-4xl">📝</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedCategory ? 'Không có bài viết nào trong danh mục này' : 'Chưa có bài viết nào'}
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {selectedCategory ? 'Hãy thử chọn danh mục khác hoặc quay lại sau để xem nội dung mới.' : 'Chúng tôi đang chuẩn bị những nội dung thú vị. Hãy quay lại sau nhé!'}
                  </p>
                  {selectedCategory && (
                    <button
                      onClick={() => handleCategorySelect(null)}
                      className="inline-flex items-center px-8 py-4 bg-green-700 hover:bg-green-600 text-white font-bold rounded-full transition-colors duration-300"
                    >
                      Xem tất cả bài viết
                      <FaArrowRight className="ml-2" />
                    </button>
                  )}
                </div>
              )}

              {/* Enhanced Pagination */}
              <div className="flex flex-col items-center gap-6 mt-12 px-4 lg:px-12">
                {/* Pagination Controls - Show if we have recent posts */}
                {actualTotalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors font-medium flex items-center gap-2"
                    >
                      <FaArrowRight className="rotate-180 text-sm" />
                      Trước
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {(() => {
                        const pages = [];
                        const maxVisiblePages = 5;
                        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                        let endPage = Math.min(actualTotalPages, startPage + maxVisiblePages - 1);

                        // Adjust start if we're near the end
                        if (endPage - startPage + 1 < maxVisiblePages) {
                          startPage = Math.max(1, endPage - maxVisiblePages + 1);
                        }

                        // Always show page 1
                        if (startPage > 1) {
                          pages.push(
                            <button
                              key={1}
                              onClick={() => handlePageChange(1)}
                              className="w-10 h-10 bg-white text-gray-700 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors font-medium flex items-center justify-center"
                            >
                              1
                            </button>
                          );

                          if (startPage > 2) {
                            pages.push(
                              <span key="start-ellipsis" className="px-2 text-gray-400">...</span>
                            );
                          }
                        }

                        // Show pages in range
                        for (let i = startPage; i <= endPage; i++) {
                          pages.push(
                            <button
                              key={i}
                              onClick={() => handlePageChange(i)}
                              className={`w-10 h-10 rounded-full font-medium transition-colors flex items-center justify-center ${i === currentPage
                                ? "bg-green-600 text-white shadow-lg"
                                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                              {i}
                            </button>
                          );
                        }

                        // Always show last page
                        if (endPage < actualTotalPages) {
                          if (endPage < actualTotalPages - 1) {
                            pages.push(
                              <span key="end-ellipsis" className="px-2 text-gray-400">...</span>
                            );
                          }

                          pages.push(
                            <button
                              key={actualTotalPages}
                              onClick={() => handlePageChange(actualTotalPages)}
                              className="w-10 h-10 bg-white text-gray-700 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors font-medium flex items-center justify-center"
                            >
                              {actualTotalPages}
                            </button>
                          );
                        }

                        return pages;
                      })()}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === actualTotalPages}
                      className="px-4 py-2 bg-white text-gray-700 rounded-full border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors font-medium flex items-center gap-2"
                    >
                      Sau
                      <FaArrowRight className="text-sm" />
                    </button>
                  </div>
                )}
              </div>
            </>
          </div>
        </div>
      </DefaultLayout2>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch posts, exclude drafts (includeDrafts = false by default)
    const raw = await readPostsFromDb(undefined, undefined, undefined, false, true);
    const posts = formatPosts(raw) || [];

    return {
      props: {
        initialPosts: posts,
      },
    };
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    return {
      props: {
        initialPosts: [],
      },
    };
  }
};

export default Blogs;
