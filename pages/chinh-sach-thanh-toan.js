import Head from "next/head";
import Image from "next/image";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileContract,
  FaGavel,
  FaShieldAlt,
  FaUserShield,
} from "react-icons/fa";
import DefaultLayout from "../components/layout/DefaultLayout";

const paymentSections = [
  {
    icon: FaFileContract,
    title: "Chính sách thanh toán",
    paragraphs: [
      "GreenLaHome áp dụng chính sách thanh toán linh hoạt nhằm tạo điều kiện thuận lợi cho khách hàng trong quá trình triển khai các dự án thiết kế và thi công nội thất.",
      "Việc thanh toán theo từng giai đoạn giúp khách hàng chủ động hơn trong kế hoạch tài chính và quản lý ngân sách hiệu quả.",
    ],
  },
  {
    icon: FaGavel,
    title: "Phân chia các đợt thanh toán",
    paragraphs: [
      "Số lượng đợt thanh toán và tỷ lệ thanh toán của từng đợt sẽ được hai bên thống nhất cụ thể trong hợp đồng.",
      "Các mốc thanh toán được xây dựng dựa trên tiến độ thực hiện công việc, đảm bảo quyền lợi và trách nhiệm của cả khách hàng và GreenLaHome.",
    ],
  },
  {
    icon: FaShieldAlt,
    title: "Lộ trình thanh toán minh bạch",
    paragraphs: [
      "GreenLaHome cam kết cung cấp đầy đủ thông tin về các đợt thanh toán ngay từ khi ký kết hợp đồng.",
      "Toàn bộ các khoản thanh toán đều được ghi nhận rõ ràng trong hợp đồng, biên bản nghiệm thu và chứng từ thanh toán tương ứng, giúp khách hàng dễ dàng theo dõi và quản lý chi phí dự án.",
    ],
  },
  {
    icon: FaUserShield,
    title: "Phương thức thanh toán đa dạng",
    paragraphs: ["Khách hàng có thể lựa chọn hình thức thanh toán phù hợp như:"],
    items: [
      "Chuyển khoản ngân hàng;",
      "Thanh toán bằng tiền mặt;",
      "Thanh toán trực tiếp tại văn phòng GreenLaHome;",
      "Các hình thức thanh toán khác theo thỏa thuận giữa hai bên.",
    ],
  },
];

export default function PaymentPolicyPage() {
  return (
    <DefaultLayout>
      <Head>
        <title>Chính sách thanh toán - GreenLaHome</title>
        <meta
          name="description"
          content="Chính sách thanh toán linh hoạt và minh bạch của GreenLaHome dành cho các dự án thiết kế và thi công nội thất."
        />
        <meta
          name="keywords"
          content="chính sách thanh toán, thanh toán nội thất, GreenLaHome, thiết kế thi công nội thất"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Chính sách thanh toán - GreenLaHome" />
        <meta
          property="og:description"
          content="GreenLaHome áp dụng chính sách thanh toán linh hoạt, minh bạch theo từng giai đoạn dự án."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://greenlahome.vn/chinh-sach-thanh-toan"
        />
        <meta property="og:site_name" content="GreenLaHome" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Chính sách thanh toán - GreenLaHome" />
        <meta
          name="twitter:description"
          content="GreenLaHome áp dụng chính sách thanh toán linh hoạt, minh bạch theo từng giai đoạn dự án."
        />
        <link
          rel="canonical"
          href="https://greenlahome.vn/chinh-sach-thanh-toan"
        />
      </Head>

      <div className="min-h-screen bg-q8-primary-50">
        <section className="q8-hero-section relative h-[45vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/banner2.jpg"
              alt="Chính sách thanh toán GreenLaHome"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          </div>

          <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Chính sách thanh toán
            </h1>
            <p className="text-xl text-q8-primary-100 leading-relaxed">
              Linh hoạt, minh bạch và thuận tiện trong từng giai đoạn dự án
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                {paymentSections.map((section) => (
                  <PaymentSection key={section.title} section={section} />
                ))}

                <div className="border-t border-q8-primary-200 pt-8">
                  <div className="bg-q8-primary-50 border border-q8-primary-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-q8-primary-800 mb-3 flex items-center">
                      <FaExclamationTriangle className="text-[#c4a77d] mr-3 flex-shrink-0" />
                      Hỗ trợ thanh toán
                    </h2>
                    <p className="text-q8-primary-700 leading-relaxed">
                      GreenLaHome tin rằng chính sách thanh toán linh hoạt và
                      minh bạch sẽ mang đến sự thuận tiện và an tâm cho khách
                      hàng trong suốt quá trình hợp tác. Mọi thắc mắc liên quan
                      đến thanh toán, quý khách vui lòng liên hệ với GreenLaHome
                      để được hỗ trợ và giải đáp kịp thời.
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

function PaymentSection({ section }) {
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
