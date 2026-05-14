// pages/AboutUs.js
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { FaCheckCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import SeumenhTTG from "../../components/tantruonggiang/SumenhTTG";
import ConsultationForm from "../../components/tantruonggiang/ConsultationForm";
import Testimonials from "../../components/tantruonggiang/Testimonials";

export default function AboutUs({ meta }) {
  const [runAnimation, setRunAnimation] = useState(false);

  useEffect(() => {
    setRunAnimation(true);
  }, []);

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/noi-that-1.jpg"
            alt="Về Chúng Tôi - Nội thất GreenLa Home"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Về Chúng Tôi</h1>
          <nav aria-label="Breadcrumb" className="text-gray-300">
            <Link href="/">
              <span className="hover:text-orange-500 cursor-pointer">
                Trang Chủ
              </span>
            </Link>
            <span className="mx-2">/</span>
            <span>Về Chúng Tôi</span>
          </nav>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Text Content and Image 1 */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <p className="text-orange-500 text-base uppercase tracking-widest mb-2">
                  CHÚNG TÔI LÀ
                </p>
                <h2 className="text-xl md:text-3xl font-bold text-white mb-4">
                  GreenLa Home - Nội Thất Tinh Tế
                </h2>
                <p className="text-gray-300 text-sm md:text-lg mb-6">
                  GreenLa Home – Chuyên gia thiết kế và thi công nội thất trọn gói,
                  mang đến không gian sống hiện đại, tiện nghi cho chung cư, nhà phố.
                  Với chất liệu gỗ công nghiệp cao cấp, phong cách đa dạng từ tối giản,
                  Scandinavian đến Japandi, Indochine, chúng tôi tối ưu diện tích từ
                  30-120m², kết hợp phong thủy để thu hút tài lộc, sức khỏe.
                </p>
              </div>
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src="/images/noi-that-1.jpg"
                  alt="Thiết Kế Nội Thất GreenLa Home"
                  layout="fill"
                  objectFit="cover"
                  className={`brightness-75 ${
                    runAnimation ? "animate-slide-in-from-right" : ""
                  }`}
                />
              </div>
            </div>

            {/* Right Column: Image 2 and Features */}
            <div className="space-y-6">
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src="/images/noi-that-2.jpg"
                  alt="Nội Thất Cao Cấp GreenLa Home"
                  layout="fill"
                  objectFit="cover"
                  className={`brightness-75 ${
                    runAnimation ? "animate-slide-in-from-left" : ""
                  }`}
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Cam Kết Chất Lượng
                </h2>
                <p className="text-gray-300 text-sm md:text-lg mb-4">
                  Chúng tôi sử dụng công nghệ hiện đại và vật liệu cao cấp để tạo ra
                  sản phẩm bền đẹp, phù hợp với mọi phong cách sống.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-300">
                    <FaCheckCircle className="text-orange-500 mr-2" />
                    Gỗ công nghiệp cao cấp, bền đẹp theo thời gian.
                  </li>
                  <li className="flex items-center text-gray-300">
                    <FaCheckCircle className="text-orange-500 mr-2" />
                    Phong cách thiết kế đa dạng, tối ưu không gian.
                  </li>
                  <li className="flex items-center text-gray-300">
                    <FaCheckCircle className="text-orange-500 mr-2" />
                    Thi công trọn gói, đúng tiến độ, tiết kiệm chi phí.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <SeumenhTTG />
        <Testimonials />
        <ConsultationForm />
      </section>
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Giới Thiệu GreenLa Home - Thiết Kế Nội Thất Trọn Gói",
    content:
      "GreenLa Home – Chuyên gia thiết kế và thi công nội thất trọn gói, mang đến không gian sống hiện đại, tiện nghi cho chung cư, nhà phố. Khám phá xu hướng nội thất 2025!",
    keywords:
      "thiết kế nội thất, nội thất chung cư, thi công trọn gói, nội thất gỗ công nghiệp, GreenLa Home",
    robots: "index, follow",
    author: "GreenLa Home",
    canonical: "https://greenlahome.vn/gioi-thieu",
    og: {
      title: "GreenLa Home – Nội Thất Hiện Đại, Tiện Nghi",
      description:
        "Khám phá dịch vụ thiết kế và thi công nội thất trọn gói từ GreenLa Home: chung cư, nhà phố, gỗ công nghiệp cao cấp, phong cách đa dạng.",
      type: "website",
      image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://greenlahome.vn/gioi-thieu",
    },
    twitter: {
      card: "summary_large_image",
      title: "Giới Thiệu GreenLa Home - Thiết Kế Nội Thất Trọn Gói",
      description:
        "GreenLa Home – Chuyên gia thiết kế và thi công nội thất trọn gói, mang đến không gian sống hiện đại, tiện nghi cho chung cư, nhà phố.",
      image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}