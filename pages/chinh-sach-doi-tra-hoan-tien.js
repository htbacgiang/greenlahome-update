import Head from "next/head";
import Image from "next/image";
import {
  FaCheckCircle,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaPhone,
  FaRedoAlt,
  FaTools,
} from "react-icons/fa";
import DefaultLayout from "../components/layout/DefaultLayout";

const returnPolicySections = [
  {
    icon: FaRedoAlt,
    title: "Chính sách đổi trả và hoàn tiền",
    paragraphs: [
      "GreenLaHome luôn nỗ lực mang đến cho khách hàng những sản phẩm và dịch vụ chất lượng.",
      "Trong trường hợp khách hàng không hài lòng về sản phẩm do lỗi từ nhà sản xuất hoặc lỗi phát sinh trong quá trình cung cấp, vận chuyển và lắp đặt, GreenLaHome sẽ xem xét hỗ trợ đổi trả theo từng trường hợp cụ thể.",
      "Khách hàng vui lòng thông báo cho GreenLaHome trong vòng 03 ngày kể từ ngày nhận sản phẩm hoặc bàn giao hạng mục để được hỗ trợ xử lý.",
    ],
  },
  {
    icon: FaClipboardCheck,
    title: "Điều kiện đổi trả",
    items: [
      "Sản phẩm còn nguyên trạng, chưa qua sử dụng hoặc chưa bị tác động làm thay đổi hiện trạng ban đầu.",
      "Sản phẩm không bị hư hỏng do lỗi từ phía khách hàng hoặc do quá trình sử dụng, bảo quản không đúng cách.",
      "Khách hàng cung cấp đầy đủ hóa đơn, chứng từ mua hàng, biên bản bàn giao hoặc các giấy tờ liên quan để xác minh thông tin đơn hàng.",
      "Sản phẩm đổi trả cần được đóng gói, bảo quản cẩn thận trong quá trình vận chuyển.",
    ],
  },
  {
    icon: FaExclamationTriangle,
    title: "Trường hợp không áp dụng đổi trả",
    items: [
      "Sản phẩm bị hư hỏng do lỗi sử dụng hoặc bảo quản từ phía khách hàng.",
      "Các sản phẩm được sản xuất, gia công hoặc thiết kế theo yêu cầu riêng của khách hàng đã được xác nhận và bàn giao.",
      "Các sản phẩm thuộc chương trình khuyến mại, giảm giá hoặc thanh lý (trừ trường hợp phát sinh lỗi từ nhà sản xuất).",
    ],
  },
  {
    icon: FaTools,
    title: "Phương án xử lý",
    paragraphs: [
      "Sau khi tiếp nhận và kiểm tra sản phẩm, GreenLaHome sẽ đánh giá tình trạng thực tế và đưa ra phương án xử lý phù hợp như đổi sản phẩm, sửa chữa, khắc phục lỗi hoặc hoàn tiền (nếu đủ điều kiện áp dụng).",
    ],
  },
];

export default function ReturnPolicyPage() {
  return (
    <DefaultLayout>
      <Head>
        <title>Chính sách đổi trả và hoàn tiền - GreenLaHome</title>
        <meta
          name="description"
          content="Chính sách đổi trả và hoàn tiền của GreenLaHome cho sản phẩm, hạng mục nội thất phát sinh lỗi trong quá trình cung cấp, vận chuyển hoặc lắp đặt."
        />
        <meta
          name="keywords"
          content="chính sách đổi trả, hoàn tiền, đổi trả nội thất, GreenLaHome"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Chính sách đổi trả và hoàn tiền - GreenLaHome"
        />
        <meta
          property="og:description"
          content="GreenLaHome xem xét hỗ trợ đổi trả, sửa chữa, khắc phục lỗi hoặc hoàn tiền theo từng trường hợp cụ thể."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://greenlahome.vn/chinh-sach-doi-tra-hoan-tien"
        />
        <meta property="og:site_name" content="GreenLaHome" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Chính sách đổi trả và hoàn tiền - GreenLaHome"
        />
        <meta
          name="twitter:description"
          content="GreenLaHome xem xét hỗ trợ đổi trả, sửa chữa, khắc phục lỗi hoặc hoàn tiền theo từng trường hợp cụ thể."
        />
        <link
          rel="canonical"
          href="https://greenlahome.vn/chinh-sach-doi-tra-hoan-tien"
        />
      </Head>

      <div className="min-h-screen bg-q8-primary-50">
        <section className="q8-hero-section relative h-[45vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/banner2.jpg"
              alt="Chính sách đổi trả và hoàn tiền GreenLaHome"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          </div>

          <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Chính sách đổi trả và hoàn tiền
            </h1>
            <p className="text-xl text-q8-primary-100 leading-relaxed">
              Hỗ trợ xử lý minh bạch theo từng trường hợp cụ thể
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                {returnPolicySections.map((section) => (
                  <ReturnPolicySection key={section.title} section={section} />
                ))}

                <div className="border-t border-q8-primary-200 pt-8">
                  <div className="bg-q8-primary-50 border border-q8-primary-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-q8-primary-800 mb-3 flex items-center">
                      <FaPhone className="text-[#c4a77d] mr-3 flex-shrink-0" />
                      Liên hệ hỗ trợ đổi trả
                    </h2>
                    <p className="text-q8-primary-700 leading-relaxed">
                      Để được hỗ trợ nhanh chóng, khách hàng vui lòng liên hệ
                      GreenLaHome qua hotline{" "}
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

function ReturnPolicySection({ section }) {
  const Icon = section.icon;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-q8-primary-900 mb-4 flex items-center">
        <Icon className="text-[#c4a77d] mr-3 flex-shrink-0" />
        {section.title}
      </h2>

      <div className="space-y-4">
        {section.paragraphs?.map((paragraph) => (
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
