// pages/thi-cong-noi-that-go-cong-nghiep.js
import Head from 'next/head';
import DefaultLayout from '../../components/layout/DefaultLayout';
import Image from 'next/image';
import Link from 'next/link';
import { formatPosts, readPostsFromDb } from '../../lib/utils';
import { useState, useRef, useEffect } from "react";
import ThicongPage from '../../components/tantruonggiang/ThicongPage';

export default function ThiCongNoiThatGoCongNghiep({ relatedPosts, meta }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("Đang gửi...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Gửi thông tin thành công!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
        setTimeout(() => setStatus(""), 3000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Đã xảy ra lỗi khi gửi form"}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setErrors({});
        setStatus("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Định nghĩa safeMeta
  const defaultMeta = {
    title: "Thi Công Nội Thất Gỗ Công Nghiệp Trọn Gói – GreenLa Home",
    description:
      "GreenLa Home cung cấp dịch vụ thi công nội thất trọn gói cho chung cư, nhà phố với giải pháp gỗ công nghiệp hiện đại, tối ưu chi phí và thẩm mỹ.",
    keywords:
      "thi công nội thất trọn gói, nội thất chung cư, nội thất nhà phố, nội thất gỗ công nghiệp, GreenLa Home, thiết kế nội thất",
    robots: "index, follow",
    author: "GreenLa Home",
    canonical: "https://greenlahome.vn/thi-cong-noi-that-go-cong-nghiep",
    og: {
      title: "Thi Công Nội Thất Gỗ Công Nghiệp Trọn Gói – GreenLa Home",
      description:
        "Khám phá dịch vụ thi công nội thất trọn gói từ GreenLa Home: chung cư, nhà phố, gỗ công nghiệp chất lượng cao, tối ưu chi phí.",
      type: "website",
      image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://greenlahome.vn/thi-cong-noi-that-go-cong-nghiep",
      siteName: "GreenLa Home",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Thi Công Nội Thất Gỗ Công Nghiệp Trọn Gói – GreenLa Home",
      description:
        "Dịch vụ thi công nội thất trọn gói chuyên nghiệp cho chung cư, nhà phố từ GreenLa Home, tối ưu chi phí và thẩm mỹ.",
      image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
      site: "@GreenLaHome",
    },
  };

  const safeMeta = { ...defaultMeta, ...meta };

  // Breadcrumb Schema đã được sửa
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://greenlahome.vn/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Thi Công Nội Thất Gỗ Công Nghiệp",
        item: "https://greenlahome.vn/thi-cong-noi-that-go-cong-nghiep",
      },
    ],
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Thi công nội thất trọn gói",
    provider: {
      "@type": "Organization",
      name: "GreenLa Home",
      url: "https://greenlahome.vn",
      logo: "https://greenlahome.vn/greenlahomelogo.png",
      description:
        "GreenLa Home chuyên thiết kế và thi công nội thất chung cư, nhà phố, nội thất chọn gói gỗ công nghiệp chất lượng cao, tối ưu chi phí và thẩm mỹ.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Số 10 lô C5, KDT Geleximco Lê Trọng Tấn, Hà Đông",
        addressLocality: "Hà Nội",
        addressCountry: "VN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+84962922332",
        contactType: "Customer Service",
        email: "contact@greenlahome.vn",
      },
    },
    description:
      "GreenLa Home cung cấp dịch vụ thi công nội thất trọn gói cho chung cư, nhà phố với giải pháp gỗ công nghiệp hiện đại, tối ưu chi phí và thẩm mỹ.",
    areaServed: "Việt Nam",
  };
  <Head>
    <title>{safeMeta.title}</title>
    <meta name="description" content={safeMeta.description} />
    <meta name="keywords" content={safeMeta.keywords} />
    <meta name="robots" content={safeMeta.robots} />
    <meta name="author" content={safeMeta.author} />
    <link rel="canonical" href={safeMeta.canonical} />
    <meta property="og:title" content={safeMeta.og.title} />
    <meta property="og:description" content={safeMeta.og.description} />
    <meta property="og:type" content={safeMeta.og.type} />
    <meta property="og:image" content={safeMeta.og.image} />
    <meta property="og:image:width" content={safeMeta.og.imageWidth} />
    <meta property="og:image:height" content={safeMeta.og.imageHeight} />
    <meta property="og:url" content={safeMeta.og.url} />
    <meta property="og:site_name" content={safeMeta.og.siteName} />
    <meta property="og:locale" content={safeMeta.og.locale} />
    <meta name="twitter:card" content={safeMeta.twitter.card} />
    <meta name="twitter:title" content={safeMeta.twitter.title} />
    <meta name="twitter:description" content={safeMeta.twitter.description} />
    <meta name="twitter:image" content={safeMeta.twitter.image} />
    <meta name="twitter:site" content={safeMeta.twitter.site} />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
  </Head>

  return (
    <DefaultLayout>
      <Head>
        <title>{safeMeta.title}</title>
        <meta name="description" content={safeMeta.description} />
        <meta name="keywords" content={safeMeta.keywords} />
        <meta name="robots" content={safeMeta.robots} />
        <meta name="author" content={safeMeta.author} />
        <link rel="canonical" href={safeMeta.canonical} />
        <meta property="og:title" content={safeMeta.og.title} />
        <meta property="og:description" content={safeMeta.og.description} />
        <meta property="og:type" content={safeMeta.og.type} />
        <meta property="og:image" content={safeMeta.og.image} />
        <meta property="og:image:width" content={safeMeta.og.imageWidth} />
        <meta property="og:image:height" content={safeMeta.og.imageHeight} />
        <meta property="og:url" content={safeMeta.og.url} />
        <meta property="og:site_name" content={safeMeta.og.siteName} />
        <meta property="og:locale" content={safeMeta.og.locale} />
        <meta name="twitter:card" content={safeMeta.twitter.card} />
        <meta name="twitter:title" content={safeMeta.twitter.title} />
        <meta name="twitter:description" content={safeMeta.twitter.description} />
        <meta name="twitter:image" content={safeMeta.twitter.image} />
        <meta name="twitter:site" content={safeMeta.twitter.site} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </Head>
      <div className="relative w-full h-[30vh] md:h-[40vh]">
        <Image
          src="/images/noi-that-1.jpg"
          alt="Thi công nội thất trọn gói - GreenLa Home"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-6 left-0 md:bottom-8 md:left-8 right-0 flex flex-col justify-end items-start text-white px-6 md:px-10 lg:px-16 pb-3">
          <nav aria-label="Breadcrumb">
            <p className="text-sm uppercase text-gray-300 mb-2">
              <Link href="/" className="hover:underline">
                Trang chủ
              </Link>
              <span className="mx-2">/</span>
              <Link href="/du-an" className="hover:underline">
                Dự án
              </Link>
            </p>
          </nav>
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Thi công nội thất trọn gói – GreenLa Home
          </h1>
          <p className="text-sm md:text-lg mt-2 max-w-5xl text-gray-200">
            GreenLa Home mang đến giải pháp thi công nội thất trọn gói hiện đại, tối ưu hóa không gian sống với sự kết hợp hoàn hảo giữa thẩm mỹ và công năng.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/4">
            <ThicongPage />
          </div>
          <aside className="w-full md:w-1/4">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Bài viết liên quan</h2>
              {relatedPosts.map((post, index) => (
                <div key={index} className="flex flex-col">
                  {post.thumbnail && (
                    <div className="w-full h-32 relative">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded hover:scale-105 transition-all ease duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="mt-2">
                    <Link href={`/bai-viet/${post.slug}`} className="text-blue-600 hover:underline">
                      {post.title}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 sticky top-[calc(60vh-50%)] bg-gray-800 p-6 rounded-lg" ref={formRef}>
              <h2 className="text-xl font-bold text-yellow-500 mb-2">ĐẶT LỊCH TƯ VẤN</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="sr-only">Họ và tên *</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Họ và tên *"
                    className={`w-full p-3 bg-gray-700 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3C31] ${errors.name ? "border-red-500" : "border-none"
                      }`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">Số điện thoại *</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Số điện thoại *"
                    className={`w-full p-3 bg-gray-700 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3C31] ${errors.phone ? "border-red-500" : "border-none"
                      }`}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email (tùy chọn)</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email (tùy chọn)"
                    className={`w-full p-3 bg-gray-700 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3C31] ${errors.email ? "border-red-500" : "border-none"
                      }`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Yêu cầu của bạn (tùy chọn)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Yêu cầu của bạn (tùy chọn)"
                    className={`w-full p-3 bg-gray-700 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A3C31] ${errors.message ? "border-red-500" : "border-none"
                      }`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === "Đang gửi..."}
                  className="w-full bg-yellow-500 text-black p-3 rounded-lg font-bold"
                >
                  GỬI THÔNG TIN <span>→</span>
                </button>
              </form>
              {status && (
                <p
                  className={`mt-2 text-center ${status.includes("thành công") ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {status}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </DefaultLayout>
  );
}

export const getServerSideProps = async () => {
  try {
    const posts = await readPostsFromDb(3, 0);
    const formattedPosts = formatPosts(posts);

    const meta = {
      title: "Thi công nội thất trọn gói – GreenLa Home",
      description:
        "GreenLa Home cung cấp dịch vụ thi công nội thất trọn gói cho chung cư, nhà phố với giải pháp gỗ công nghiệp hiện đại, tối ưu chi phí và thẩm mỹ.",
      keywords:
        "thi công nội thất trọn gói, nội thất chung cư, nội thất nhà phố, nội thất gỗ công nghiệp, GreenLa Home, thiết kế nội thất",
      robots: "index, follow",
      author: "GreenLa Home",
      canonical: "https://greenlahome.vn/thi-cong-noi-that-tron-goi",
      og: {
        title: "Thi công nội thất trọn gói – GreenLa Home",
        description:
          "Khám phá dịch vụ thi công nội thất trọn gói từ GreenLa Home: chung cư, nhà phố, gỗ công nghiệp chất lượng cao, tối ưu chi phí.",
        type: "website",
        image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://greenlahome.vn/thi-cong-noi-that-tron-goi",
      },
      twitter: {
        card: "summary_large_image",
        title: "Thi công nội thất trọn gói – GreenLa Home",
        description:
          "Dịch vụ thi công nội thất trọn gói chuyên nghiệp cho chung cư, nhà phố từ GreenLa Home, tối ưu chi phí và thẩm mỹ.",
        image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
      },
    };

    return {
      props: {
        relatedPosts: formattedPosts,
        meta,
      },
    };
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return {
      props: {
        relatedPosts: [],
        meta: {
          title: "Thi công nội thất trọn gói – GreenLa Home",
          description: "Dịch vụ thi công nội thất trọn gói chuyên nghiệp từ GreenLa Home.",
          canonical: "https://greenlahome.vn/thi-cong-noi-that-tron-goi",
        },
      },
    };
  }
};