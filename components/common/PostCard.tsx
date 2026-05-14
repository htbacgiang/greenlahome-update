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

  const postPath = `/${getCategoryPath(category)}/${slug}`;

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
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg flex flex-col">
        <div className="relative h-56 w-full">
          {!thumbnail ? (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm bg-gray-800">
              Không có hình ảnh
            </div>
          ) : (
            <Image
              src={thumbnail}
              fill={true}
              alt={title}
              className="rounded-t-lg object-cover"
            />
          )}
        </div>
        <div className="p-4 flex flex-col space-y-2">
          
          <Link href={postPath}>
            <h2 className="text-xl font-bold text-white">{highlightedTitle}</h2>
          </Link>
          <p className="text-gray-400 text-sm leading-6">{trimText(meta, 100)}</p>
          <div className="mt-2 flex items-center text-gray-500 text-sm">
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
              />
            </svg>
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
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
                className={`px-3 py-1 bg-red-500 text-white rounded text-sm ${
                  busy ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
                }`}
              >
                {busy ? "Đang xử lý..." : "Xóa"}
              </button>
            </div>
          )}
        </div>
      </div>
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
                className={`px-4 py-2 bg-red-500 text-white rounded ${
                  busy ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
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