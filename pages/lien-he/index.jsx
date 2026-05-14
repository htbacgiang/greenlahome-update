import Head from "next/head";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import DefaultLayout from "../../components/layout/DefaultLayout";
import ContactForm from "../../components/header/ContactForm";

// Contact details (configurable)
const contactInfo = {
  address: "Số 10 lô C5, KDT Geleximco Lê Trọng Tấn, Hà Đông, Hà Nội",
  email: "lienhe@greenlahome.vn",
  phone: "096.292.2332",
};

// Base URL for production (use environment variable in real apps)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://greenlahome.vn";

export default function ContactPage({ meta }) {
  return (
    <>
      
      <DefaultLayout>
        <section className=" py-10 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white text-center mb-10 md:mt-[100px] mt-10">
              Liên Hệ
            </h1>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center mb-12">
              {/* Card: Địa chỉ */}
              <div
                className="bg-gray-700 p-6 sm:p-8 rounded-lg text-center w-full max-w-xs"
                role="region"
                aria-label="Thông tin địa chỉ"
              >
                <div className="text-orange-500 text-4xl mb-4 flex justify-center">
                  <MdLocationOn aria-hidden="true" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">Địa chỉ</h3>
                <p className="text-gray-400">{contactInfo.address}</p>
              </div>
              {/* Card: E-Mail */}
              <div
                className="bg-gray-700 p-6 sm:p-8 rounded-lg text-center w-full max-w-xs"
                role="region"
                aria-label="Thông tin email"
              >
                <div className="text-orange-500 text-4xl mb-4 flex justify-center">
                  <MdEmail aria-hidden="true" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">E-Mail</h3>
                <p className="text-gray-400">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </p>
              </div>
              {/* Card: Số điện thoại */}
              <div
                className="bg-gray-700 p-6 sm:p-8 rounded-lg text-center w-full max-w-xs"
                role="region"
                aria-label="Thông tin số điện thoại"
              >
                <div className="text-orange-500 text-4xl mb-4 flex justify-center">
                  <MdPhone aria-hidden="true" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">
                  Số điện thoại
                </h3>
                <p className="text-gray-400">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="hover:text-pink-500 transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </p>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </DefaultLayout>
    </>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Liên Hệ – GreenLa Home",
    description:
      "Liên hệ với GreenLa Home qua địa chỉ, email và số điện thoại. Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp thắc mắc của bạn.",
    keywords:
      "liên hệ, GreenLa Home, địa chỉ, email, số điện thoại, nội thất, thiết kế nội thất",
    author: "GreenLa Home",
    robots: "index, follow",
    canonical: "https://greenlahome.vn/lien-he",
    og: {
      title: "Liên Hệ – GreenLa Home",
      description:
        "Liên hệ với GreenLa Home qua địa chỉ, email và số điện thoại để được tư vấn về thiết kế và thi công nội thất.",
      type: "website",
      image: "https://greenlahome.vn/images/banner4.png",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://greenlahome.vn/hien-he",
      siteName: "GreenLa Home",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Liên Hệ – GreenLa Home",
      description:
        "Liên hệ với GreenLa Home để được tư vấn về thiết kế và thi công nội thất cao cấp.",
      image: "https://greenlahome.vn/images/banner4.png",
      site: "@GreenLaHome", // Replace with actual Twitter handle if available
    },
  };

  return {
    props: {
      meta,
    },
  };
}