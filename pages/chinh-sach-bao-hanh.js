import Head from "next/head";
import Image from "next/image";
import {
  FaClipboardCheck,
  FaExclamationTriangle,
  FaFileContract,
  FaPhone,
  FaShieldAlt,
  FaTools,
} from "react-icons/fa";
import DefaultLayout from "../components/layout/DefaultLayout";

const warrantySections = [
  {
    icon: FaShieldAlt,
    title: "Chính sách hỗ trợ và bảo hành",
    paragraphs: [
      "GreenLaHome cam kết mang đến cho khách hàng những sản phẩm và dịch vụ chất lượng, cùng chính sách bảo hành rõ ràng và minh bạch.",
    ],
  },
  {
    icon: FaFileContract,
    title: "Thời gian và phạm vi bảo hành",
    paragraphs: [
      "Thời gian bảo hành đối với các hạng mục nội thất và sản phẩm do GreenLaHome cung cấp được thực hiện theo nội dung đã thỏa thuận trong hợp đồng hoặc phiếu bảo hành đi kèm.",
      "Chính sách bảo hành chỉ áp dụng đối với các lỗi phát sinh từ nguyên vật liệu, quá trình sản xuất, vận chuyển hoặc lắp đặt do GreenLaHome thực hiện.",
    ],
  },
  {
    icon: FaExclamationTriangle,
    title: "Các trường hợp không áp dụng bảo hành",
    paragraphs: [
      "GreenLaHome không áp dụng bảo hành đối với các trường hợp sản phẩm bị hư hỏng do lỗi sử dụng của khách hàng, sử dụng không đúng hướng dẫn, bảo quản không đúng quy cách, tác động từ môi trường hoặc các yếu tố khách quan khác.",
      "Đồng thời, các dấu hiệu hao mòn tự nhiên trong quá trình sử dụng, các vết trầy xước, va đập hoặc hư hỏng do tác động bên ngoài cũng không thuộc phạm vi bảo hành.",
    ],
  },
  {
    icon: FaClipboardCheck,
    title: "Thời hạn và hồ sơ hỗ trợ bảo hành",
    paragraphs: [
      "Thời hạn bảo hành được tính từ ngày bàn giao sản phẩm hoặc nghiệm thu công trình.",
      "Để được hỗ trợ bảo hành, khách hàng vui lòng cung cấp các thông tin liên quan đến hợp đồng, biên bản bàn giao hoặc phiếu bảo hành (nếu có).",
    ],
  },
  {
    icon: FaTools,
    title: "Phương án xử lý bảo hành",
    paragraphs: [
      "Đối với các sản phẩm hoặc hạng mục còn trong thời gian bảo hành, GreenLaHome sẽ xem xét và đưa ra phương án xử lý phù hợp như sửa chữa, thay thế hoặc các giải pháp hỗ trợ khác nhằm đảm bảo quyền lợi của khách hàng.",
    ],
  },
];

export default function WarrantyPolicyPage() {
  return (
    <DefaultLayout>
      <Head>
        <title>Chính sách hỗ trợ và bảo hành - GreenLaHome</title>
        <meta
          name="description"
          content="Chính sách hỗ trợ và bảo hành rõ ràng, minh bạch của GreenLaHome dành cho các hạng mục nội thất và sản phẩm do GreenLaHome cung cấp."
        />
        <meta
          name="keywords"
          content="chính sách bảo hành, hỗ trợ bảo hành, bảo hành nội thất, GreenLaHome"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Chính sách hỗ trợ và bảo hành - GreenLaHome"
        />
        <meta
          property="og:description"
          content="GreenLaHome cam kết chính sách hỗ trợ và bảo hành rõ ràng, minh bạch cho khách hàng."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://greenlahome.vn/chinh-sach-bao-hanh"
        />
        <meta property="og:site_name" content="GreenLaHome" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Chính sách hỗ trợ và bảo hành - GreenLaHome"
        />
        <meta
          name="twitter:description"
          content="GreenLaHome cam kết chính sách hỗ trợ và bảo hành rõ ràng, minh bạch cho khách hàng."
        />
        <link rel="canonical" href="https://greenlahome.vn/chinh-sach-bao-hanh" />
      </Head>

      <div className="min-h-screen bg-q8-primary-50">
        <section className="q8-hero-section relative h-[45vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/banner2.jpg"
              alt="Chính sách hỗ trợ và bảo hành GreenLaHome"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          </div>

          <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Chính sách hỗ trợ và bảo hành
            </h1>
            <p className="text-xl text-q8-primary-100 leading-relaxed">
              Rõ ràng, minh bạch và đảm bảo quyền lợi của khách hàng
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                {warrantySections.map((section) => (
                  <WarrantySection key={section.title} section={section} />
                ))}

                <div className="border-t border-q8-primary-200 pt-8">
                  <div className="bg-q8-primary-50 border border-q8-primary-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-q8-primary-800 mb-3 flex items-center">
                      <FaPhone className="text-[#c4a77d] mr-3 flex-shrink-0" />
                      Liên hệ hỗ trợ bảo hành
                    </h2>
                    <p className="text-q8-primary-700 leading-relaxed">
                      Mọi thông tin chi tiết về chính sách hỗ trợ và bảo hành,
                      vui lòng liên hệ GreenLaHome qua hotline{" "}
                      <a
                        href="tel:0962922332"
                        className="text-[#c4a77d] hover:text-[#a88963] font-bold"
                      >
                        096.292.2332
                      </a>{" "}
                      hoặc thông tin liên hệ được công bố trên website{" "}
                      <a
                        href="https://greenlahome.vn"
                        className="text-[#c4a77d] hover:text-[#a88963] font-bold"
                      >
                        greenlahome.vn
                      </a>{" "}
                      để được tư vấn và hỗ trợ kịp thời.
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

function WarrantySection({ section }) {
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
      </div>
    </div>
  );
}
