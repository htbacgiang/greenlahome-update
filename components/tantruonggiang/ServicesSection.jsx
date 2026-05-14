import Link from "next/link";
import { FaHome, FaBuilding, FaTools } from "react-icons/fa";

export default function ServicesSection() {
  const services = [
    {
      title: "Thiết Kế Nội Thất Chung Cư",
      icon: <FaBuilding className="text-3xl" />,
      description: "GREENLAHOME mang đến giải pháp thiết kế nội thất hiện đại, bền vững, ứng dụng công nghệ AI tiên tiến. Chúng tôi tạo nên không gian sống đậm chất cá nhân, đáp ứng nhanh chóng và phù hợp với từng khách hàng.",
      link: "/thiet-ke-noi-that-chung-cu"
    },
    {
      title: "Thiết Kế Nội Thất Nhà Phố",
      icon: <FaHome className="text-3xl" />,
      description: "GREENLAHOME cam kết mang đến sản phẩm tinh tế, bền vững với độ bền cao. Sử dụng hệ thống máy móc hiện đại và công nghệ tiên tiến, cùng đội ngũ thi công lành nghề và giám sát chuyên môn cao.",
      link: "/thiet-ke-noi-that-nha-pho"
    },
    {
      title: "Thi Công Nội Thất Trọn Gói",
      icon: <FaTools className="text-3xl" />,
      description: "GREENLAHOME hợp tác với các thương hiệu ván hàng đầu như An Cường, Minh Long. Sử dụng ván gỗ MDF đạt chuẩn E0, E1, đảm bảo thân thiện với môi trường và an toàn tuyệt đối cho người sử dụng.",
      link: "/thi-cong-noi-that-tron-goi"
    }
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-5xl text-center md:mb-12">
          <span className="inline-flex rounded-full border border-green-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-green-700 shadow-sm">
            Dịch vụ tại GreenLaHome
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-950 md:text-4xl">
            Giải pháp nội thất hiện đại, tinh gọn và đúng nhu cầu
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {services.map((service, index) => (
            <Link href={service.link} key={index} className="group block h-full">
              <article className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-[0_18px_50px_rgba(15,23,42,0.1)] md:p-7">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition duration-300 group-hover:bg-green-600 group-hover:text-white">
                    {service.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-300">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold leading-snug text-gray-950 transition duration-300 group-hover:text-green-700">
                  {service.title}
                </h3>

                <div className="my-5 h-px w-full bg-gray-100">
                  <div className="h-px w-12 bg-green-500 transition-all duration-300 group-hover:w-24" />
                </div>

                <p className="mb-6 flex-1 text-sm leading-7 text-gray-600 md:text-base">
                  {service.description}
                </p>

                <div className="inline-flex items-center gap-2 text-sm font-bold text-green-700">
                  <span>Xem chi tiết</span>
                  <svg className="h-4 w-4 transition duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
