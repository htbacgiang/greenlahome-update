import Head from "next/head";
import Image from "next/image";
import {
  FaCheckCircle,
  FaCog,
  FaDatabase,
  FaEnvelope,
  FaExclamationTriangle,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaShieldAlt,
  FaUserShield,
} from "react-icons/fa";
import DefaultLayout from "../components/layout/DefaultLayout";

const policySections = [
  {
    icon: FaDatabase,
    title: "1. Mục đích và phạm vi thu thập thông tin",
    paragraphs: [
      "GreenLaHome cam kết tôn trọng và bảo vệ quyền riêng tư của khách hàng khi truy cập và sử dụng website greenlahome.vn.",
      "Các thông tin cá nhân được thu thập có thể bao gồm: họ và tên, tên doanh nghiệp, địa chỉ liên hệ, số điện thoại, địa chỉ email và các thông tin cần thiết khác do khách hàng chủ động cung cấp thông qua biểu mẫu đăng ký tư vấn, yêu cầu báo giá hoặc liên hệ trên website.",
    ],
    intro: "Việc thu thập thông tin nhằm mục đích:",
    items: [
      "Tư vấn các sản phẩm, dịch vụ thiết kế và thi công nội thất;",
      "Liên hệ xác nhận thông tin khách hàng;",
      "Hỗ trợ chăm sóc khách hàng trước, trong và sau quá trình sử dụng dịch vụ;",
      "Cải thiện chất lượng dịch vụ và trải nghiệm người dùng trên website.",
    ],
    closing: [
      "Mọi thông tin đều được khách hàng tự nguyện cung cấp và GreenLaHome chỉ thu thập trong phạm vi cần thiết để phục vụ khách hàng tốt nhất.",
    ],
  },
  {
    icon: FaCog,
    title: "2. Phạm vi sử dụng thông tin",
    paragraphs: [
      "Thông tin cá nhân của khách hàng được GreenLaHome sử dụng cho các mục đích sau:",
    ],
    items: [
      "Tiếp nhận và xử lý yêu cầu tư vấn, báo giá hoặc hợp đồng dịch vụ;",
      "Liên hệ hỗ trợ khách hàng trong quá trình triển khai dự án;",
      "Cung cấp thông tin về sản phẩm, dịch vụ, chương trình ưu đãi hoặc các nội dung liên quan đến hoạt động của GreenLaHome;",
      "Nâng cao chất lượng dịch vụ và tối ưu trải nghiệm khách hàng.",
    ],
    closing: [
      "GreenLaHome cam kết không bán, trao đổi hoặc chia sẻ thông tin cá nhân của khách hàng cho bất kỳ bên thứ ba nào vì mục đích thương mại khi chưa có sự đồng ý của khách hàng, ngoại trừ các trường hợp theo quy định của pháp luật.",
    ],
  },
  {
    icon: FaLock,
    title: "3. Thời gian lưu trữ thông tin",
    paragraphs: [
      "Thông tin khách hàng được lưu trữ trong hệ thống của GreenLaHome trong thời gian cần thiết để phục vụ các mục đích đã nêu hoặc theo quy định của pháp luật hiện hành.",
      "Khi khách hàng có yêu cầu hủy bỏ hoặc thông tin không còn cần thiết cho hoạt động cung cấp dịch vụ, GreenLaHome sẽ thực hiện xóa hoặc ẩn dữ liệu theo quy trình quản lý thông tin nội bộ.",
    ],
  },
  {
    icon: FaUserShield,
    title: "5. Quyền của khách hàng đối với thông tin cá nhân",
    paragraphs: ["Khách hàng có quyền:"],
    items: [
      "Yêu cầu kiểm tra, cập nhật hoặc chỉnh sửa thông tin cá nhân đã cung cấp;",
      "Yêu cầu ngừng sử dụng thông tin cho mục đích tiếp thị;",
      "Yêu cầu xóa dữ liệu cá nhân theo quy định của pháp luật.",
    ],
    closing: [
      "Mọi yêu cầu liên quan đến thông tin cá nhân, khách hàng vui lòng liên hệ qua hotline hoặc email chính thức của GreenLaHome để được hỗ trợ.",
    ],
  },
  {
    icon: FaShieldAlt,
    title: "6. Cam kết bảo mật thông tin",
    paragraphs: [
      "GreenLaHome áp dụng các biện pháp kỹ thuật và quy trình quản lý phù hợp nhằm bảo vệ thông tin khách hàng khỏi các hành vi truy cập trái phép, mất mát, rò rỉ, thay đổi hoặc phá hủy dữ liệu.",
      "Dữ liệu được lưu trữ trên hệ thống có các biện pháp bảo mật nhằm đảm bảo an toàn thông tin trong quá trình thu thập và xử lý.",
      "Khách hàng không được thực hiện các hành vi can thiệp trái phép vào hệ thống, phát tán mã độc, khai thác lỗ hổng hoặc thực hiện bất kỳ hoạt động nào gây ảnh hưởng đến tính bảo mật và ổn định của website. Mọi hành vi vi phạm sẽ bị xử lý theo quy định của pháp luật.",
      "Trong một số trường hợp đặc biệt, GreenLaHome có thể cung cấp thông tin cá nhân cho cơ quan nhà nước có thẩm quyền khi có yêu cầu hợp pháp hoặc khi việc cung cấp thông tin là cần thiết để bảo vệ quyền và lợi ích hợp pháp của khách hàng, doanh nghiệp và cộng đồng.",
      "GreenLaHome cam kết tuân thủ các quy định của pháp luật Việt Nam về bảo vệ dữ liệu cá nhân và bảo mật thông tin khách hàng.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <DefaultLayout>
      <Head>
        <title>CHÍNH SÁCH BẢO MẬT THÔNG TIN - GreenLaHome</title>
        <meta
          name="description"
          content="Chính sách bảo mật thông tin cá nhân của GreenLaHome khi khách hàng truy cập, liên hệ tư vấn và sử dụng dịch vụ thiết kế thi công nội thất."
        />
        <meta
          name="keywords"
          content="chính sách bảo mật, bảo mật thông tin, quyền riêng tư, GreenLaHome, greenlahome.vn"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="CHÍNH SÁCH BẢO MẬT THÔNG TIN - GreenLaHome"
        />
        <meta
          property="og:description"
          content="GreenLaHome cam kết tôn trọng, bảo vệ quyền riêng tư và thông tin cá nhân của khách hàng."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://greenlahome.vn/chinh-sach-bao-mat"
        />
        <meta property="og:site_name" content="GreenLaHome" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="CHÍNH SÁCH BẢO MẬT THÔNG TIN - GreenLaHome"
        />
        <meta
          name="twitter:description"
          content="GreenLaHome cam kết tôn trọng, bảo vệ quyền riêng tư và thông tin cá nhân của khách hàng."
        />
        <link
          rel="canonical"
          href="https://greenlahome.vn/chinh-sach-bao-mat"
        />
      </Head>

      <div className="min-h-screen bg-q8-primary-50">
        <section className="q8-hero-section relative h-[45vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/banner2.jpg"
              alt="Chính sách bảo mật GreenLaHome"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          </div>

          <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-1">
              CHÍNH SÁCH BẢO MẬT THÔNG TIN
            </h1>
            <p className="text-xl text-q8-primary-100 leading-relaxed">
              GreenLaHome cam kết tôn trọng và bảo vệ quyền riêng tư của khách hàng
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                {policySections.slice(0, 3).map((section) => (
                  <PolicySection key={section.title} section={section} />
                ))}

                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-q8-primary-900 mb-4 flex items-center">
                    <FaMapMarkerAlt className="text-[#c4a77d] mr-3" />
                    4. Đơn vị thu thập và quản lý thông tin
                  </h2>

                  <div className="bg-q8-primary-50 rounded-lg p-6 border border-q8-primary-200">
                    <h3 className="text-xl font-bold text-q8-primary-900 mb-4">
                      GREENLAHOME
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-q8-primary-700">
                      <p>
                        <strong>Website:</strong>{" "}
                        <a
                          href="https://greenlahome.vn"
                          className="text-[#c4a77d] hover:text-[#a88963]"
                        >
                          greenlahome.vn
                        </a>
                      </p>
                      <p className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-[#c4a77d] mt-1 flex-shrink-0" />
                        <span>
                          <strong>Địa chỉ:</strong> G10-L03 An Quý Villa, Dương Nội
                        </span>
                      </p>
                      <p className="flex items-center gap-3">
                        <FaPhone className="text-[#c4a77d] flex-shrink-0" />
                        <span>
                          <strong>Hotline:</strong>{" "}
                          <a
                            href="tel:0962922332"
                            className="text-[#c4a77d] hover:text-[#a88963]"
                          >
                            096.292.2332
                          </a>
                        </span>
                      </p>
                      <p className="flex items-center gap-3">
                        <FaEnvelope className="text-[#c4a77d] flex-shrink-0" />
                        <span>
                          <strong>Email:</strong>{" "}
                          <a
                            href="mailto:lienhe@greenlahome.vn"
                            className="text-[#c4a77d] hover:text-[#a88963]"
                          >
                            lienhe@greenlahome.vn
                          </a>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {policySections.slice(3).map((section) => (
                  <PolicySection key={section.title} section={section} />
                ))}

                <div className="border-t border-q8-primary-200 pt-8">
                  <div className="bg-q8-primary-50 border border-q8-primary-200 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-q8-primary-800 mb-3 flex items-center">
                      <FaExclamationTriangle className="text-[#c4a77d] mr-3" />
                      Lưu ý
                    </h3>
                    <p className="text-q8-primary-700 leading-relaxed">
                      Chính sách này được áp dụng cho hoạt động thu thập và xử lý
                      thông tin cá nhân trên website greenlahome.vn và các kênh
                      liên hệ chính thức của GreenLaHome.
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

function PolicySection({ section }) {
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

        {section.intro && (
          <p className="text-q8-primary-800 font-semibold">{section.intro}</p>
        )}

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

        {section.closing?.map((paragraph) => (
          <p key={paragraph} className="text-q8-primary-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
