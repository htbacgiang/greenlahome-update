// pages/index.js
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
import { FaArrowRight } from "react-icons/fa";

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
      "Greenlahome - Thiết Kế & Thi Công Nội Thất Chung Cư, Nhà Phố, Nội Thất Gỗ Công Nghiệp",
    description:
      "Greenlahome – chuyên gia thiết kế và thi công nội thất chung cư, nhà phố, biệt thự. Chúng tôi mang đến không gian sống hiện đại, tối ưu, hợp phong thủy với chi phí hợp lý. Liên hệ ngay để biến ý tưởng thành hiện thực! Hotline: 0962922332.",
    keywords:
      "thiết kế nội thất, thi công nội thất, nội thất chung cư, nội thất nhà phố, nội thất gỗ công nghiệp, Greenlahome",
    robots: "index, follow",
    author: "Greenlahome",
    canonical: "https://greenlahome.vn",
    og: {
      title:
        "Greenlahome - Giải Pháp Nội Thất Chung Cư, Nhà Phố & Nội Thất Gỗ Công Nghiệp",
      description:
        "Greenlahome – chuyên gia thiết kế và thi công nội thất chung cư, nhà phố, biệt thự. Chúng tôi mang đến không gian sống hiện đại, tối ưu, hợp phong thủy với chi phí hợp lý. Liên hệ ngay để biến ý tưởng thành hiện thực! Hotline: 0962922332.",
      type: "website",
      image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://greenlahome.vn",
      siteName: "Greenlahome",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Greenlahome - Nội Thất Chung Cư, Nhà Phố Chuyên Nghiệp",
      description:
        "Greenlahome – chuyên gia thiết kế và thi công nội thất chung cư, nhà phố, biệt thự. Chúng tôi mang đến không gian sống hiện đại, tối ưu, hợp phong thủy với chi phí hợp lý. Liên hệ ngay để biến ý tưởng thành hiện thực! Hotline: 0962922332.",
      image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
      site: "@GreenLaHome",
    },
  };

  const safeMeta = { ...defaultMeta, ...meta };

  // JSON-LD Structured Data cho Greenlahome
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Greenlahome",
    url: "https://greenlahome.vn",
    logo: "https://greenlahome.vn/greenlahomelogo.png",
    sameAs: ["https://www.facebook.com/greenlahome"],
    description:
      "Greenlahome chuyên thiết kế và thi công nội thất chung cư, nhà phố, nội thất chọn gói gỗ công nghiệp chất lượng cao, tối ưu chi phí và thẩm mỹ.",
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
      name: "Greenlahome",
      url: "https://greenlahome.vn",
      logo: "https://greenlahome.vn/greenlahomelogo.png",
      description:
        "Greenlahome chuyên thiết kế và thi công nội thất chung cư, nhà phố, nội thất chọn gói gỗ công nghiệp chất lượng cao, tối ưu chi phí và thẩm mỹ.",
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
      name: "Greenlahome",
      url: "https://greenlahome.vn",
      logo: "https://greenlahome.vn/greenlahomelogo.png",
    },
    description:
      "Greenlahome cung cấp dịch vụ thiết kế và thi công nội thất cao cấp cho biệt thự, nhà phố, chung cư với phong cách hiện đại, sang trọng, tối ưu không gian và chi phí.",
    areaServed: "Việt Nam",
  };

  return (
    <DefaultLayout>
      <BannerTTG onConsultClick={toggleForm} /> {/* Thêm nút tư vấn vào Banner */}
      <ServicesSection />
      <ProjectsPage showHero={false} />
      <StrengthsSection />
      <FAQSection />
      <div className="pb-10">
        <BlogHero />
        <div className="container mx-auto p-3 pb-10 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 ">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          {/* Bottom CTA */}
          <div className="text-center mt-6">
            <Link
              href="/bai-viet"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              style={{ background: 'linear-gradient(to right, #c4a77d, #a88963)' }}
            >
              Xem tất cả bài viết
              <FaArrowRight className="ml-2 transition-transform" />
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

    // Meta data tối ưu cho Greenlahome
    const meta = {
      title:
        "Greenlahome - Thiết Kế & Thi Công Nội Thất Chung Cư, Nhà Phố, Nội Thất Gỗ Công Nghiệp",
      description:
        "Greenlahome – chuyên gia thiết kế và thi công nội thất chung cư, nhà phố, biệt thự. Chúng tôi mang đến không gian sống hiện đại, tối ưu, hợp phong thủy với chi phí hợp lý. Liên hệ ngay để biến ý tưởng thành hiện thực! Hotline: 0962922332.",
      keywords:
        "thiết kế nội thất, thi công nội thất, nội thất chung cư, nội thất nhà phố, nội thất gỗ công nghiệp, Greenlahome",
      robots: "index, follow",
      author: "Greenlahome",
      canonical: "https://greenlahome.vn",
      og: {
        title:
          "Greenlahome - Giải Pháp Nội Thất Chung Cư, Nhà Phố & Nội Thất Gỗ Công Nghiệp",
        description:
          "Greenlahome – chuyên gia thiết kế và thi công nội thất chung cư, nhà phố, biệt thự. Chúng tôi mang đến không gian sống hiện đại, tối ưu, hợp phong thủy với chi phí hợp lý. Liên hệ ngay để biến ý tưởng thành hiện thực! Hotline: 0962922332.",
        type: "website",
        image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://greenlahome.vn",
        siteName: "Greenlahome",
        locale: "vi_VN",
      },
      twitter: {
        card: "summary_large_image",
        title: "Greenlahome - Nội Thất Chung Cư, Nhà Phố Chuyên Nghiệp",
        description:
          "Greenlahome – chuyên gia thiết kế và thi công nội thất chung cư, nhà phố, biệt thự. Chúng tôi mang đến không gian sống hiện đại, tối ưu, hợp phong thủy với chi phí hợp lý. Liên hệ ngay để biến ý tưởng thành hiện thực! Hotline: 0962922332.",
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
            "Greenlahome - Thiết Kế & Thi Công Nội Thất Chung Cư, Nhà Phố Chuyên Nghiệp",
          description:
            "Greenlahome – chuyên gia thiết kế và thi công nội thất chung cư, nhà phố, biệt thự. Chúng tôi mang đến không gian sống hiện đại, tối ưu, hợp phong thủy với chi phí hợp lý.",
          canonical: "https://greenlahome.vn",
        },
      },
    };
  }
}
