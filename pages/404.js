// pages/404.js
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function Custom404() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white text-gray-800 p-4 overflow-hidden">

      {/* Subtle Animated Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 bt-floating-2"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-2xl text-center flex flex-col items-center">

        {/* 404 Number with Float Effect */}
        <h1 className="text-8xl sm:text-9xl md:text-[150px] font-black tracking-widest text-emerald-600 drop-shadow-sm mb-2 animate-float">
          404
        </h1>

        {/* Animated Entrance Container for Text */}
        <div className="animate-fadeInDown" style={{ animationFillMode: "both", animationDelay: "0.2s" }}>
          {/* Error Message */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-gray-800">
            Trang Không Tìm Thấy
          </h2>

          {/* Decorative Line (Width animation can be added via a custom utility, here using a subtle scale) */}
          <div className="w-24 h-1 bg-emerald-500 rounded-full mb-3 mx-auto transform transition-transform duration-1000 hover:scale-150"></div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-5xl mx-auto leading-relaxed">
            Rất tiếc! Đường dẫn bạn yêu cầu không tồn tại hoặc đã được di chuyển.
          </p>
        </div>

        {/* Action Button */}
        <div className="animate-fadeInDown" style={{ animationFillMode: "both", animationDelay: "0.4s" }}>
          <Link href="/">
            <button className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-600/30 transition-all duration-300">
              <FaHome className="text-xl" />
              Về Trang Chủ
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}