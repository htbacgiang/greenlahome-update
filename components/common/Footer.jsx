'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

// Constants for footer links, social media, and contact info
const FOOTER_LINKS = {
  about: [
    { href: '/gioi-thieu', label: 'Về Tân Trường Giang' },
    { href: '/lien-he', label: 'Liên hệ' },
    { href: '/tuyen-dung', label: 'Tuyển dụng' },
    { href: '/du-an', label: 'Dự án' },
    { href: '/bai-viet', label: 'Tin tức' },
  ],
  services: [
    { href: '/thiet-ke-noi-that-chung-cu', label: 'Thiết kế nội thất chung cư' },
    { href: '/thiet-ke-noi-that-nha-pho', label: 'Thiết kế nội thất nhà phố' },
    { href: '/thi-cong-noi-that-chung-cu', label: 'Thi công nội thất chung cư' },
    { href: '/thi-cong-noi-that-nha-pho', label: 'Thi công nội thất nhà phố' },
  ],
  products: [
    { href: '#', label: 'Giường gỗ đặc chọn' },
    { href: '#', label: 'Bàn ghế gỗ đặc chọn' },
    { href: '#', label: 'Sofa gỗ đặc chọn' },
    { href: '#', label: 'Tủ bếp gỗ đặc chọn' },
    { href: '#', label: 'Bàn trang điểm gỗ đặc chọn' },
    { href: '#', label: 'Tủ quần áo gỗ đặc chọn' },
    { href: '#', label: 'Kệ tivi gỗ đặc chọn' },
  ],
  support: [
    { href: '#', label: 'Chính sách bảo mật' },
    { href: '#', label: 'Chính sách sử dụng dịch vụ' },
    { href: '#', label: 'Điều khoản sử dụng website' },
    { href: '#', label: 'Chính sách sử dụng Cookie' },
  ],
};

const SOCIAL_LINKS = [
  { Icon: FaFacebook, href: 'https://www.facebook.com/NoiThatTanTruongGiang', label: 'Facebook' },
  { Icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
  { Icon: FaTiktok, href: 'https://tiktok.com', label: 'TikTok' },
];

const CONTACT_INFO = [
  {
    Icon: FaPhone,
    label: '096.292.2332',
    href: 'tel:0962922332',
  },
  {
    Icon: FaEnvelope,
    label: 'lienhe@greenlahome.vn',
    href: 'mailto:lienhe@greenlahome.vn',
  },
  {
    Icon: FaClock,
    label: (
      <>
        <p>Thời gian mở cửa: 08:00 - 18:00</p>
        <span className="text-sm">(Làm việc cả thứ 7 & CN nghỉ)</span>
      </>
    ),
  },
  {
    Icon: FaMapMarkerAlt,
    label: 'Số 10 lô C5, KDT Geleximco Lê Trọng Tấn, Hà Đông',
    href: 'https://maps.app.goo.gl/eco-baogiang',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
];

export default function Footer() {
  const renderFooterColumn = (title, links) => (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2 text-gray-300">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-orange-500 transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Contact Section */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start mb-8 gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-tan-truong-giang.png"
              alt="Tân Trường Giang Logo"
              width={120}
              height={50}
              className="filter brightness-0 invert"
              priority={false}
              loading="lazy"
            />
          </Link>

          <ul className="flex flex-col md:flex-row flex-wrap justify-start md:justify-center gap-4 text-gray-300 w-full md:w-auto">
            {CONTACT_INFO.map(({ Icon, label, href, target, rel }, index) => (
              <li key={index} className="flex items-start gap-2">
                <Icon className="text-orange-500 mt-1" aria-hidden="true" />
                {href ? (
                  <a
                    href={href}
                    target={target || '_self'}
                    rel={rel || undefined}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {label}
                  </a>
                ) : (
                  <div>{label}</div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8 border-t border-gray-700 pt-6">
          {renderFooterColumn('Giới Thiệu', FOOTER_LINKS.about)}
          {renderFooterColumn('Dịch Vụ', FOOTER_LINKS.services)}
          {renderFooterColumn('Sản Phẩm Gỗ Đặc Chọn', FOOTER_LINKS.products)}
          {renderFooterColumn('Hỗ Trợ Khách Hàng', FOOTER_LINKS.support)}

          {/* Map Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Bản Đồ</h3>
            <div className="relative h-40 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1184373866467!2d105.73904119999999!3d20.987889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453a4f6f43337%3A0xa04e3e09379d28d7!2zTuG7mWkgdGjhuqV0IFTDom4gVHLGsOG7nW5nIEdpYW5g!5e0!3m2!1svi!2s!4v1743999538581!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vị trí công ty Tân Trường Giang"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <a
                  href="https://maps.app.goo.gl/eco-baogiang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-orange-500 transition-colors"
                >
                  Xem bản đồ lớn hơn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-lg mb-4">
          CÔNG TY TNHH TM DV & SX TÂN TRƯỜNG GIANG
          </p>
          <div className="flex justify-center gap-6 mb-4">
            {SOCIAL_LINKS.map(({ Icon, href, label }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${label} page`}
                className="hover:text-orange-500 transition-colors"
              >
                <Icon className="text-white text-xl" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Tân Trường Giang. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}