import Image from "next/image";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaClock,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "Giới thiệu", href: "/gioi-thieu" },
      { name: "Tầm nhìn & Sứ mệnh", href: "/gioi-thieu#tam-nhin" },
      { name: "Đội ngũ chuyên gia", href: "/gioi-thieu#doi-ngu" },
      { name: "Hồ sơ năng lực", href: "/ho-so-nang-luc" }
    ],
    services: [
      { name: "Thiết kế kiến trúc", href: "/thiet-ke-kien-truc" },
      { name: "Thiết kế nội thất", href: "/thiet-ke-noi-that" },
      { name: "Thi công trọn gói", href: "/thi-cong-tron-goi" },
    ],
    support: [
      { name: "Liên hệ", href: "/lien-he" },
      { name: "Tuyển dụng", href: "/tuyen-dung" },

    ]
  };

  const policyLinks = [
    { name: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
    { name: "Chính sách thanh toán", href: "/chinh-sach-thanh-toan" },
    { name: "Vận chuyển, giao nhận", href: "/chinh-sach-van-chuyen-giao-nhan" },
    { name: "Đổi trả, hoàn tiền", href: "/chinh-sach-doi-tra-hoan-tien" },
    { name: "Hỗ trợ, bảo hành", href: "/chinh-sach-bao-hanh" },
    { name: "Điều khoản sử dụng", href: "/dieu-khoan-su-dung" },
    { name: "Sơ đồ trang web", href: "/api/sitemap.xml" }
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      href: "https://www.facebook.com/greenlahome",
      color: "hover:bg-blue-600"
    },
    {
      name: "TikTok",
      icon: FaTiktok,
      href: "https://www.tiktok.com/@greenlahome",
      color: "hover:bg-gray-700"
    },

    {
      name: "Instagram",
      icon: FaInstagram,
      href: "https://instagram.com/greenlahome",
      color: "hover:bg-pink-600"
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      href: "https://youtube.com/@greenlahome",
      color: "hover:bg-red-600"
    },
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/banner3.jpg"
          alt="Footer background"
          fill
          className="object-cover opacity-10"
          priority={false}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gray-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-500 rounded-full blur-3xl"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-white/35 rounded-full animate-pulse delay-3000"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative z-10">

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Company Info */}
              <div className="lg:col-span-1">
                <div className="mb-6 group">
                  <Link href="/" className="inline-block">
                    <div className="flex items-center group-hover:scale-105 transition-transform duration-300">
                      <div className="w-48 h-20 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <Image
                          src="/logo-greenlahome.png"
                          alt="GreenLaHome Logo"
                          width={400}
                          height={128}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </Link>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  GreenLaHome chuyên tư vấn, thiết kế và thi công nội thất trọn gói.
                  Chúng tôi đồng hành cùng khách hàng để kiến tạo không gian sống hiện đại, bền vững và đúng nhu cầu.
                </p>

              </div>

              {/* Quick Links */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  {/* Company */}
                  <div>
                    <p className="text-lg font-bold mb-6 text-white hover:text-gray-100 transition-colors duration-300">Công ty</p>
                    <ul className="space-y-3">
                      {footerLinks.company.map((link, index) => (
                        <li key={index}>
                          <Link
                            href={link.href}
                            className="text-gray-300 hover:text-gray-100 transition-colors duration-300"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Services */}
                  <div>
                    <p className="text-lg font-bold mb-6 text-white hover:text-gray-100 transition-colors duration-300">Dịch vụ</p>
                    <ul className="space-y-3">
                      {footerLinks.services.map((link, index) => (
                        <li key={index}>
                          <Link
                            href={link.href}
                            className="text-gray-300 hover:text-gray-100 transition-colors duration-300"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>


                  {/* Support */}
                  <div>
                    <p className="text-lg font-bold mb-6 text-white hover:text-gray-100 transition-colors duration-300">Hỗ trợ</p>
                    <ul className="space-y-3">
                      {footerLinks.support.map((link, index) => (
                        <li key={index}>
                          <Link
                            href={link.href}
                            className="text-gray-300 hover:text-gray-100 transition-colors duration-300"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-1">
                <p className="text-lg font-bold mb-6 text-white hover:text-gray-100 transition-colors duration-300">Liên hệ</p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300">
                        G10-L03 An Quý Villa, Dương Nội, Hà Nội
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaPhone className="text-gray-400 flex-shrink-0" />
                    <div>
                      <a
                        href="tel:0962922332"
                        className="text-gray-300 hover:text-gray-100 transition-colors"
                      >
                        096.292.2332
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-gray-400 flex-shrink-0" />
                    <div>
                      <a
                        href="mailto:lienhe@greenlahome.vn"
                        className="text-gray-300 hover:text-gray-100 transition-colors"
                      >
                        lienhe@greenlahome.vn
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <FaClock className="text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300">
                        T2-T7: 8:00 - 18:00<br />
                        CN: 9:00 - 17:00
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <p className="font-bold mb-4 text-white">Kết nối với chúng tôi</p>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:transform hover:scale-110 hover:shadow-lg group`}
                          aria-label={social.name}
                        >
                          <Icon className="text-white group-hover:text-gray-100 transition-colors duration-300" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-gray-400">
                  © {currentYear} GreenLaHome. Tất cả quyền được bảo lưu.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-3">
                {policyLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-gray-100 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Company Brand Statement */}
        <div className="border-t border-gray-800 py-4 bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-gray-500 text-base ">
                GREENLAHOME MỘT THƯƠNG HIỆU CỦA CÔNG TY TNHH TM DV & SX TÂN TRƯỜNG GIANG
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
