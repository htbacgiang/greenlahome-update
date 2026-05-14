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
    <section className="bg-q8-primary-50 py-10 md:py-10 overflow-hidden"
      style={{
        backgroundImage: "url('/images/section-bg-shape-1.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        backgroundSize: "contain",
      }}>
      <div className="container mx-auto px-4">
        {/* Header Section: Split Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mb-0 md:mb-10">
          <div className="">
            <div className="inline-block px-4 py-1.5 bg-green-50 border border-green-100 rounded-full mb-6">
              <span className="text-xs font-bold text-green-600 uppercase tracking-widest">
                Dịch Vụ Tại GreenLaHome
              </span>
            </div>
            <p className="text-gray-500 hidden md:block text-lg md:text-xl leading-relaxed  border-l-4 border-green-500 pl-6 py-2">
              <span className="font-bold">GREENLAHOME</span> chuyên thiết kế, thi công nội thất theo phong cách hiện đại dành cho căn hộ, nhà phố và biệt thự. <br /> Chúng tôi ứng dụng công nghệ AI trong thiết kế nhằm tối ưu theo nhu cầu và gu thẩm mỹ riêng của từng khách hàng.
            </p>
          </div>

        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link href={service.link} key={index} className="group">
              <div className="bg-white p-10 rounded-[40px] shadow-[0_10px_50px_rgba(0,0,0,0.03)] border border-gray-100 h-full transition-all duration-500 hover:shadow-[0_20px_70px_rgba(34,197,94,0.1)] hover:-translate-y-2 relative overflow-hidden">
                {/* Background Decor */}

                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-green-600 transition-colors duration-300 pr-5">
                    {service.title}
                  </h3>
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
                    {service.icon}
                  </div>
                </div>

                <div className="w-full h-[1px] bg-gray-100 mb-8 relative">
                  <div className="absolute top-0 left-0 h-full w-0 bg-green-500 group-hover:w-full transition-all duration-700"></div>
                </div>

                <p className="text-gray-500 leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-bold text-green-600 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                  <span>Khám phá ngay</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}