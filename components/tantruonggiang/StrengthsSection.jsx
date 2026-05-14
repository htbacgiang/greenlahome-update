"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const processSteps = [
  {
    id: "01",
    title: "Tư Vấn Ban Đầu",
    description: "Chúng tôi bắt đầu bằng việc lắng nghe và thấu hiểu tầm nhìn, mục tiêu và nhu cầu thực tế của bạn.",
    image: "/images/noi-that-1.jpg"
  },
  {
    id: "02",
    title: "Thiết Kế & Quy Hoạch",
    description: "Đội ngũ chuyên gia lên ý tưởng và giải pháp tối ưu không gian, đảm bảo tính thẩm mỹ và công năng.",
    image: "/images/thi-cong-noi-that.webp"
  },
  {
    id: "03",
    title: "Triển Khai Thi Công",
    description: "Quy trình thi công tỉ mỉ, chuyên nghiệp với sự giám sát chặt chẽ để hiện thực hóa bản vẽ thiết kế.",
    image: "/images/noi-that-2.jpg"
  },
  {
    id: "04",
    title: "Bàn Giao Dự Án",
    description: "Bàn giao không gian hoàn thiện và cam kết đồng hành cùng khách hàng qua chính sách bảo hành tận tâm.",
    image: "/images/thi-cong-noi-that-nha-pho.webp"
  }
];

export default function StrengthsSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animation cho ảnh 3D: di chuyển từ phải sang trái khi scroll
  const xTransform = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative py-5 md:py-10 bg-q8-primary-50 overflow-hidden">
      {/* Background Decor Text */}
      <div className="absolute top-[40%] left-[5%] w-full h-full pointer-events-none opacity-[0.03] select-none overflow-hidden">
        <h2 className="text-[10vw] font-black text-gray-900 leading-none whitespace-nowrap">
          GREENLAHOME         </h2>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top 3D Image Section */}
        <div className="flex justify-end">
          <motion.div
            style={{ x: xTransform }}
            className="relative w-full max-w-6xl aspect-[16/9] lg:translate-x-20"
          >
            <Image
              src="/images/counter-img-1.png"
              alt="3D Floor Plan Architecture"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-5 md:mb-20">
          <div>
            <div className="inline-block px-4 py-1.5 bg-green-50 border border-green-100 rounded-full mb-6">
              <span className="text-xs font-bold text-green-600 uppercase tracking-widest">
                Quy trình làm việc
              </span>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Kiến Tạo <span className="text-green-600">Kiến Trúc</span> <br />
              & Không Gian Sống <span className="text-gray-400">Hoàn Mỹ.</span>
            </h2>
          </div>
          <div className="lg:text-right hidden md:block">
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-3xl lg:ml-auto">
              Quy trình của chúng tôi luôn thích ứng, tinh chỉnh và phát triển theo tầm nhìn của bạn.
              Giống như những người nghệ sĩ trước một khung tranh trống, chúng tôi biến đổi các căn phòng thành những tác phẩm nghệ thuật sống động.
            </p>
          </div>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 group hover:shadow-[0_20px_60px_rgba(34,197,94,0.1)] transition-all duration-500 ${index % 2 === 1 ? "md:mt-12" : ""
                }`}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Number Overlay */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-600 shadow-sm">
                  BƯỚC {step.id}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 relative">
                {/* Giant BG Number */}
                <span className="absolute bottom-4 right-4 text-7xl font-black text-gray-100 group-hover:text-green-50 transition-colors duration-500 pointer-events-none">
                  {step.id}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  <span className="text-green-600 mr-1">{step.id}.</span> {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed relative z-10">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}