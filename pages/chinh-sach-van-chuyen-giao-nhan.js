import Head from "next/head";
import Image from "next/image";
import {
  FaCheckCircle,
  FaClock,
  FaHandshake,
  FaPhone,
  FaTruck,
} from "react-icons/fa";
import DefaultLayout from "../components/layout/DefaultLayout";

const shippingSections = [
  {
    icon: FaTruck,
    title: "Chính sách vận chuyển, giao nhận",
    paragraphs: [
      "Website greenlahome.vn cung cấp dịch vụ tư vấn, thiết kế và thi công nội thất.",
      "Chính sách vận chuyển và giao nhận được thỏa thuận giữa GreenLaHome và khách hàng trong từng hợp đồng cụ thể, phù hợp với yêu cầu và đặc điểm của từng dự án.",
    ],
  },
  {
    icon: FaPhone,
    title: "Tư vấn phạm vi vận chuyển và lắp đặt",
    paragraphs: [
      "Vui lòng liên hệ số hotline: 096.292.2332 để được tư vấn chi tiết về phạm vi vận chuyển, lắp đặt và bàn giao công trình.",
    ],
  },
  {
    icon: FaClock,
    title: "Thay đổi thời gian giao nhận, lắp đặt hoặc bàn giao",
    paragraphs: [
      "Đối với trường hợp khách hàng muốn thay đổi thời gian giao nhận, lắp đặt hoặc bàn giao, vui lòng liên hệ hotline của GreenLaHome tối thiểu 24 giờ trước thời gian đã được xác nhận.",
    ],
  },
  {
    icon: FaHandshake,
    title: "Cam kết phối hợp thực hiện",
    paragraphs: [
      "GreenLaHome sẽ cố gắng đáp ứng theo thời gian yêu cầu của khách hàng, đồng thời đảm bảo phù hợp với kế hoạch thi công, vận chuyển và các quy định vận hành của công ty.",
    ],
  },
];

export default function ShippingPolicyPage() {
  return (
    <DefaultLayout>
      <Head>
        <title>Chính sách vận chuyển, giao nhận - GreenLaHome</title>
        <meta
          name="description"
          content="Chính sách vận chuyển, lắp đặt và bàn giao công trình của GreenLaHome cho các dự án thiết kế thi công nội thất."
        />
        <meta
          name="keywords"
          content="chính sách vận chuyển, giao nhận, lắp đặt nội thất, bàn giao công trình, GreenLaHome"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Chính sách vận chuyển, giao nhận - GreenLaHome"
        />
        <meta
          property="og:description"
          content="GreenLaHome thỏa thuận chính sách vận chuyển, lắp đặt và bàn giao theo từng hợp đồng cụ thể."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://greenlahome.vn/chinh-sach-van-chuyen-giao-nhan"
        />
        <meta property="og:site_name" content="GreenLaHome" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Chính sách vận chuyển, giao nhận - GreenLaHome"
        />
        <meta
          name="twitter:description"
          content="GreenLaHome thỏa thuận chính sách vận chuyển, lắp đặt và bàn giao theo từng hợp đồng cụ thể."
        />
        <link
          rel="canonical"
          href="https://greenlahome.vn/chinh-sach-van-chuyen-giao-nhan"
        />
      </Head>

      <div className="min-h-screen bg-q8-primary-50">
        <section className="q8-hero-section relative h-[45vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/banner2.jpg"
              alt="Chính sách vận chuyển giao nhận GreenLaHome"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          </div>

          <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Chính sách vận chuyển, giao nhận
            </h1>
            <p className="text-xl text-q8-primary-100 leading-relaxed">
              Thỏa thuận rõ ràng theo từng hợp đồng và đặc điểm dự án
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                {shippingSections.map((section) => (
                  <ShippingSection key={section.title} section={section} />
                ))}

                <div className="border-t border-q8-primary-200 pt-8">
                  <div className="bg-q8-primary-50 border border-q8-primary-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-q8-primary-800 mb-3 flex items-center">
                      <FaPhone className="text-[#c4a77d] mr-3 flex-shrink-0" />
                      Liên hệ hỗ trợ
                    </h2>
                    <p className="text-q8-primary-700 leading-relaxed">
                      Để được tư vấn chi tiết về phạm vi vận chuyển, lắp đặt và
                      bàn giao công trình, quý khách vui lòng liên hệ hotline{" "}
                      <a
                        href="tel:0962922332"
                        className="text-[#c4a77d] hover:text-[#a88963] font-bold"
                      >
                        096.292.2332
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}

function ShippingSection({ section }) {
  const Icon = section.icon;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-q8-primary-900 mb-4 flex items-center">
        <Icon className="text-[#c4a77d] mr-3 flex-shrink-0" />
        {section.title}
      </h2>

      <div className="space-y-4">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-q8-primary-700 leading-relaxed">
            {paragraph}
          </p>
        ))}

        {section.items && (
          <ul className="space-y-3">
            {section.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-q8-primary-700 leading-relaxed"
              >
                <FaCheckCircle className="text-[#c4a77d] mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
