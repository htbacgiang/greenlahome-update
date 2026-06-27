import Image from "next/image";
import { FC, useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { trimText } from "../../utils/helper";
import { PostDetail as BasePostDetail } from "../../utils/types";

interface ExtendedPostDetail extends BasePostDetail {
  category: string;
  createdAt: string;
  thumbnail?: string;
}

interface Props {
  post: ExtendedPostDetail;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick?(): void;
}

const PostCard: FC<Props> = ({
  controls = false,
  post,
  busy,
  onDeleteClick,
}): JSX.Element => {
  const { title, slug, meta, thumbnail, category, createdAt } = post;
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Map category to URL prefix
  const getCategoryPath = (category: string): string => {
    switch (category) {
      case "Góc Phong Thủy":
        return "goc-phong-thuy";
      case "Góc Chuyên Gia":
        return "goc-chuyen-gia";
      default:
        return "bai-viet"; // Fallback for unexpected categories
    }
  };

  const postPath = post.isDirectPost ? `/${slug}` : `/${getCategoryPath(category)}/${slug}`;

  const highlightedTitle = useMemo(
    () =>
      title.split(" ").map((word, index) =>
        word.toUpperCase() === "YOUR" ? (
          <span key={index} className="text-yellow-400">
            {word}{" "}
          </span>
        ) : (
          word + " "
        )
      ),
    [title]
  );

  const handleDelete = () => {
    if (onDeleteClick) onDeleteClick();
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      modalRef.current?.focus();
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setShowModal(false);
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [showModal]);

  return (
    <>
      <article className="group bg-white overflow-hidden transition-all duration-500 transform hover:-translate-y-2">
        {/* Post Image */}
        <div className="relative h-64 overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-4xl">📝</span>
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Post Content */}
        <div className="py-6 px-0">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#A0845A] transition-colors line-clamp-2">
            <Link href={postPath}>{title}</Link>
          </h3>
          {/* Read More */}
          <Link
            href={postPath}
            className="inline-flex items-center text-[#C4A882] hover:text-[#A0845A] font-medium transition-colors group/link"
          >
            Đọc thêm
            <svg className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Dashboard controls */}
          {controls && (
            <div className="mt-4 flex justify-between">
              <Link
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                href={`/dashboard/bai-viet/update/${slug}`}
              >
                Sửa
              </Link>
              <button
                disabled={busy}
                onClick={() => setShowModal(true)}
                className={`px-3 py-1 bg-red-500 text-white rounded text-sm ${busy ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
                  }`}
              >
                {busy ? "Đang xử lý..." : "Xóa"}
              </button>
            </div>
          )}
        </div>
      </article>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={modalRef}
            tabIndex={-1}
            className="bg-gray-900 p-6 rounded-md shadow-md"
            role="dialog"
            aria-labelledby="modal-title"
          >
            <h2 id="modal-title" className="text-lg font-semibold text-white mb-4">
              Xác nhận
            </h2>
            <p className="mb-6 text-gray-400">
              Bạn có chắc chắn muốn xóa bài viết này?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                disabled={busy}
                onClick={handleDelete}
                className={`px-4 py-2 bg-red-500 text-white rounded ${busy ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
                  }`}
              >
                {busy ? "Đang xóa..." : "Xóa"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;
