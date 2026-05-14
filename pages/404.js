// pages/404.js
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function Custom404() {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/banner4.png"
          alt="404 Background"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        {/* 404 Text */}
        <h1 className="text-8xl md:text-9xl font-bold mb-4">404</h1>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Oops! Trang Không Tìm Thấy.
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-sm md:text-lg max-w-md mx-auto mb-6">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra lại
          URL hoặc quay về trang chủ để tiếp tục khám phá nội thất Tân Trường
          Giang.
        </p>

        {/* Back to Home Button */}
        <Link href="/">
          <button className="flex items-center bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors">
            Quay Về Trang Chủ
            <FaArrowRight className="ml-2" />
          </button>
        </Link>
      </div>
    </div>
  );
}