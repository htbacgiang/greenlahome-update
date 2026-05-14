// pages/index.js
import Head from "next/head";
import Link from "next/link";
import DefaultLayout from "../components/layout/DefaultLayout";
import BannerTTG from "../components/tantruonggiang/BannerTTG";
import ServicesSection from "../components/tantruonggiang/ServicesSection";
import StrengthsSection from "../components/tantruonggiang/StrengthsSection";
import FAQSection from "../components/tantruonggiang/FAQSection";
import BlogHero from "../components/profiles/BlogHero";
import PostCard from "../components/common/PostCard";
import ContactForm from "../components/header/ContactForm"; // Thêm ContactForm
import { readPostsFromDb, formatPosts } from "../lib/utils";
import { useState, useEffect, useRef } from "react";
import ProjectsPage from "../components/greenlahome/ProjectsPage";
import WorkProcessSection from "../components/tantruonggiang/WorkProcessSection";

export default function Home({ posts, meta }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleForm = () => {
    setIsFormOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isFormOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") toggleForm();
    };

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    firstElement?.focus();
    modal.addEventListener("keydown", handleTab);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      modal.removeEventListener("keydown", handleTab);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFormOpen]);

  // Định nghĩa safeMeta
  const defaultMeta = {
    title:
      "GreenLa Home - Thiết Kế & Thi Công Nội Thất Chung Cư, Nhà Phố, Nội Thất Gỗ Công Nghiệp",
    description:
      "Greenla Home – chuyên gia thiết kế và thi công nội thất chung cư, nhà phố, biệt thự. Chúng tôi mang đến không gian sống hiện đại, tối ưu, hợp phong thủy với chi phí hợp lý. Liên hệ ngay để biến ý tưởng thành hiện thực! Hotline: 0962922332.",
    keywords:
      "thiết kế nội thất, thi công nội thất, nội thất chung cư, nội thất nhà phố, nội thất gỗ công nghiệp, GreenLa Home",
    robots: "index, follow",
    author: "GreenLa Home",
    canonical: "https://greenlahome.vn",
    og: {
      title:
        "GreenLa Home - Giải Pháp Nội Thất Chung Cư, Nhà Phố & Nội Thất Gỗ Công Nghiệp",
      description:
        "Greenla Home – chuyên gia thiết kế và thi công nội thất chung cư, nhà phố, biệt thự. Chúng tôi mang đến không gian sống hiện đại, tối ưu, hợp phong thủy với chi phí hợp lý. Liên hệ ngay để biến ý tưởng thành hiện thực! Hotline: 0962922332.",
      type: "website",
      image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://greenlahome.vn",
      siteName: "GreenLa Home",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: "GreenLa Home - Nội Thất Chung Cư, Nhà Phố Chuyên Nghiệp",
      description:
        "Greenla Home – chuyên gia thiết kế và thi công nội thất chung cư, nhà phố, biệt thự. Chúng tôi mang đến không gian sống hiện đại, tối ưu, hợp phong thủy với chi phí hợp lý. Liên hệ ngay để biến ý tưởng thành hiện thực! Hotline: 0962922332.",
      image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
      site: "@GreenLaHome",
    },
  };

  const safeMeta = { ...defaultMeta, ...meta };

  // JSON-LD Structured Data cho GreenLa Home
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GreenLa Home",
    url: "https://greenlahome.vn",
    logo: "https://greenlahome.vn/greenlahomelogo.png",
    sameAs: ["https://www.facebook.com/greenlahome"],
    description:
      "GreenLa Home chuyên thiết kế và thi công nội thất chung cư, nhà phố, nội thất chọn gói gỗ công nghiệp chất lượng cao, tối ưu chi phí và thẩm mỹ.",
  };

  // Schema Markup cho WebSite
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: safeMeta.title,
    url: safeMeta.canonical,
    description: safeMeta.description,
    publisher: {
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
        email: "lienhe@greenlahome.vn",
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://greenlahome.vn/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  // Schema Markup cho Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Thiết kế và thi công nội thất",
    provider: {
      "@type": "Organization",
      name: "GreenLa Home",
      url: "https://greenlahome.vn",
      logo: "https://greenlahome.vn/greenlahomelogo.png",
    },
    description:
      "GreenLa Home cung cấp dịch vụ thiết kế và thi công nội thất cao cấp cho biệt thự, nhà phố, chung cư với phong cách hiện đại, sang trọng, tối ưu không gian và chi phí.",
    areaServed: "Việt Nam",
  };

  return (
    <DefaultLayout>
      {/* Tiêu đề chính không nên ẩn, nhưng nếu thiết kế không phù hợp, có thể tích hợp vào BannerTTG */}
      <h1 className="sr-only">
        GreenLa Home - Thiết Kế & Thi Công Nội Thất Chung Cư, Nhà Phố Chuyên Nghiệp
      </h1>

      <BannerTTG onConsultClick={toggleForm} /> {/* Thêm nút tư vấn vào Banner */}
      <ServicesSection />
      <ProjectsPage showHero={false} />
      <StrengthsSection />
      <FAQSection />
      <div className="bg-q8-primary-50 pb-10">
        <BlogHero />
        <div className="container mx-auto p-3 pb-10 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 ">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/bai-viet"
              className="inline-flex items-center justify-center rounded-full bg-green-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition duration-300 hover:bg-green-800 hover:shadow-md"
            >
              Xem thêm bài viết
            </Link>
          </div>
        </div>
      </div>
      {/* Form Tư Vấn (Modal) */}
      {isFormOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Form đặt lịch tư vấn"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) toggleForm();
          }}
        >
          <div
            ref={modalRef}
            className="rounded-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-5xl relative bg-white"
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={toggleForm}
              aria-label="Đóng form"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ContactForm />
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  try {
    const posts = await readPostsFromDb(6, 0, undefined, false, true);
    const formattedPosts = formatPosts(posts);

    // Meta data tối ưu cho GreenLa Home
    const meta = {
      title:
        "GreenLa Home - Thiết Kế & Thi Công Nội Thất Chung Cư, Nhà Phố, Nội Thất Gỗ Công Nghiệp",
      description:
        "Greenla Home – chuyên gia thiết kế và thi công nội thất chung cư, nhà phố, biệt thự. Chúng tôi mang đến không gian sống hiện đại, tối ưu, hợp phong thủy với chi phí hợp lý. Liên hệ ngay để biến ý tưởng thành hiện thực! Hotline: 0962922332.",
      keywords:
        "thiết kế nội thất, thi công nội thất, nội thất chung cư, nội thất nhà phố, nội thất gỗ công nghiệp, GreenLa Home",
      robots: "index, follow",
      author: "GreenLa Home",
      canonical: "https://greenlahome.vn",
      og: {
        title:
          "GreenLa Home - Giải Pháp Nội Thất Chung Cư, Nhà Phố & Nội Thất Gỗ Công Nghiệp",
        description:
          "Greenla Home – chuyên gia thiết kế và thi công nội thất chung cư, nhà phố, biệt thự. Chúng tôi mang đến không gian sống hiện đại, tối ưu, hợp phong thủy với chi phí hợp lý. Liên hệ ngay để biến ý tưởng thành hiện thực! Hotline: 0962922332.",
        type: "website",
        image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://greenlahome.vn",
        siteName: "GreenLa Home",
        locale: "vi_VN",
      },
      twitter: {
        card: "summary_large_image",
        title: "GreenLa Home - Nội Thất Chung Cư, Nhà Phố Chuyên Nghiệp",
        description:
          "Greenla Home – chuyên gia thiết kế và thi công nội thất chung cư, nhà phố, biệt thự. Chúng tôi mang đến không gian sống hiện đại, tối ưu, hợp phong thủy với chi phí hợp lý. Liên hệ ngay để biến ý tưởng thành hiện thực! Hotline: 0962922332.",
        image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
        site: "@GreenLaHome",
      },
    };

    return {
      props: {
        posts: formattedPosts,
        meta,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        posts: [],
        meta: {
          title:
            "GreenLa Home - Thiết Kế & Thi Công Nội Thất Chung Cư, Nhà Phố Chuyên Nghiệp",
          description:
            "Greenla Home – chuyên gia thiết kế và thi công nội thất chung cư, nhà phố, biệt thự. Chúng tôi mang đến không gian sống hiện đại, tối ưu, hợp phong thủy với chi phí hợp lý.",
          canonical: "https://greenlahome.vn",
        },
      },
    };
  }
}
