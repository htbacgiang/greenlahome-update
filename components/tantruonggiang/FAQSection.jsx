"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const faqItems = [
  {
    question: "Quy trình thông thường khi bắt đầu dự án thiết kế là gì?",
    answer:
      "Quy trình bắt đầu bằng buổi tư vấn để trao đổi ý tưởng, sau đó lên kế hoạch, trình bày phương án thiết kế và triển khai để hiện thực hóa không gian mong muốn.",
  },
  {
    question: "Dự án thiết kế nội thất thường mất bao lâu?",
    answer:
      "Tùy quy mô và độ phức tạp, mỗi dự án thường từ vài tuần đến vài tháng. Chúng tôi sẽ ước lượng cụ thể sau buổi tư vấn đầu tiên.",
  },
  {
    question: "Tôi có thể tận dụng đồ nội thất hiện có trong thiết kế mới không?",
    answer:
      "Có. Chúng tôi sẽ đánh giá đồ hiện có và đề xuất cách tích hợp hợp lý vào thiết kế mới để vừa tiết kiệm vừa giữ tính thẩm mỹ.",
  },
  {
    question: "Tôi sẽ được tư vấn những gì trong buổi gặp đầu tiên?",
    answer:
      "Trong buổi tư vấn, chúng tôi sẽ trao đổi về nhu cầu, phong cách, ngân sách và mặt bằng để đưa ra hướng thiết kế và bước tiếp theo phù hợp.",
  },
  {
    question: "Sau khi bàn giao, nếu có vấn đề phát sinh về kỹ thuật, Greenlahome sẽ đồng hành cùng tôi như thế nào?",
    answer: "Với Greenlahome, bàn giao chìa khóa không phải là điểm kết thúc, mà là khởi đầu của một sự gắn kết. Chúng tôi áp dụng chính sách bảo hành dài hạn và bảo trì trọn đời cho mọi công trình. Bất kể là một bản lề cần chỉnh hay một cánh tủ cần gia cố, đội ngũ kỹ thuật của GreenLa sẽ có mặt kịp thời để xử lý. Chúng tôi không chỉ xây nhà, chúng tôi xây dựng niềm tin vĩnh cửu bằng sự tận tâm thấu cảm nhất"
  },
  {
    question: "Tôi lo ngại chi phí thực tế sẽ đội lên so với báo giá ban đầu, Greenlahome xử lý vấn đề này như thế nào?",
    answer: "Sự minh bạch là khởi đầu của sự tử tế. Tại Greenlahome, nhờ bước khảo sát Laser thực địa chính xác milimet và bộ hồ sơ dấu đỏ pháp lý chi tiết từng con ốc, chúng tôi kiểm soát được 99% khối lượng công việc ngay từ đầu. GreenLa cam kết thực hiện đúng theo báo giá đã ký kết. Mọi sự thay đổi (nếu có) đều xuất phát từ mong muốn nâng cấp của gia chủ và được thống nhất bằng văn bản, giúp hành trình xây nhà của bạn không bao giờ có những 'con số bất ngờ' đầy lo âu."
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.28, delayChildren: 0.18 },
  },
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="py-6 md:py-20 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Text + FAQ accordion */}
          <div>
            <div className="flex items-center gap-2 text-[#C4A882] text-sm font-bold uppercase mb-2">
              <h2 className="inline-flex items-center gap-1">
                Câu hỏi thường gặp
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </h2>
            </div>

            <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-xl">
              Đội ngũ Greenlahome luôn lắng nghe và làm việc chặt chẽ để hiểu ý tưởng của bạn và hiện thực hóa với sự chăm chút từng chi tiết.
            </p>

            <motion.div
              className="space-y-6 lg:space-y-4"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    layout
                    className={`border rounded-xl overflow-hidden bg-white transition-all duration-300 ${isOpen ? 'border-[#E8D5B0] shadow-md' : 'border-gray-100 hover:border-[#F3E8D0]'}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="w-full flex items-start justify-between gap-4 text-left py-4 px-6 focus:outline-none"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-question-${index}`}
                    >
                      <span className={`font-bold text-sm md:text-base pr-2 transition-colors duration-300 ${isOpen ? 'text-[#A0845A]' : 'text-gray-800'}`}>
                        <span className="text-[#C4A882] font-semibold mr-2">{index + 1}.</span> {item.question}
                      </span>
                      <motion.span
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-[#C4A882] text-white' : 'bg-gray-50 text-gray-500'}`}
                        aria-hidden
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M20 12H4" : "M12 4v16m8-8H4"} />
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${index}`}
                          role="region"
                          aria-labelledby={`faq-question-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }}
                          exit={{ height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="px-6 pb-5 pt-0 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-50 mt-2 pt-4">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right: Image */}
          <motion.div
            className="relative w-full aspect-[4/5] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Image
              src="/images/banner-q8-02-m.webp"
              alt="Không gian nội thất cao cấp - Greenlahome"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}