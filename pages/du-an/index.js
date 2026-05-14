import React from "react";
import Head from "next/head";
import DefaultLayout from "../../components/layout/DefaultLayout";
import ProjectsPage from "../../components/greenlahome/ProjectsPage";

export default function DuAn({ meta }) {
  // JSON-LD Schema.org cho trang dự án
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Dự án Greenla Home - Portfolio thiết kế kiến trúc và nội thất",
    "description": "Khám phá bộ sưu tập hơn 500 dự án thiết kế kiến trúc và nội thất đẳng cấp của Greenla Home. Từ biệt thự hiện đại, căn hộ cao cấp đến văn phòng sang trọng - mỗi dự án đều mang dấu ấn độc đáo.",
    "url": "https://greenlahome.vn/du-an",
    "image": "https://greenlahome.vn/images/q8-design-projects.jpg",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Trang chủ",
          "item": "https://greenlahome.vn/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Dự án",
          "item": "https://greenlahome.vn/du-an"
        }
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Danh sách dự án Greenla Home",
      "description": "Bộ sưu tập các dự án thiết kế và thi công của Greenla Home",
      "numberOfItems": "500+",
      "itemListElement": [
        {
          "@type": "CreativeWork",
          "name": "Biệt thự hiện đại Thảo Điền",
          "description": "Thiết kế biệt thự hiện đại với phong cách tối giản, tối ưu không gian sống",
          "url": "https://greenlahome.vn/du-an/biet-thu-hien-dai-thao-dien",
          "image": "https://greenlahome.vn/images/projects/biet-thu-thao-dien.jpg",
          "creator": {
            "@type": "Organization",
            "name": "Greenla Home"
          },
          "dateCreated": "2023",
          "genre": "Architectural Design"
        },
        {
          "@type": "CreativeWork", 
          "name": "Căn hộ penthouse The Manor",
          "description": "Thiết kế nội thất căn hộ penthouse sang trọng với view toàn thành phố",
          "url": "https://greenlahome.vn/du-an/can-ho-penthouse-the-manor",
          "image": "https://greenlahome.vn/images/og-image.jpg",
          "creator": {
            "@type": "Organization",
            "name": "Greenla Home"
          },
          "dateCreated": "2023",
          "genre": "Interior Design"
        },
        {
          "@type": "CreativeWork",
          "name": "Văn phòng công ty ABC",
          "description": "Thiết kế văn phòng hiện đại, thân thiện môi trường với không gian làm việc linh hoạt",
          "url": "https://greenlahome.vn/du-an/van-phong-cong-ty-abc",
          "image": "https://greenlahome.vn/images/og-image.jpg",
          "creator": {
            "@type": "Organization",
            "name": "Greenla Home"
          },
          "dateCreated": "2023",
          "genre": "Commercial Design"
        }
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Greenla Home",
      "url": "https://greenlahome.vn",
      "logo": {
        "@type": "ImageObject",
        "url": "https://greenlahome.vn/logo.png",
        "width": "200",
        "height": "60"
      },
      "description": "Công ty thiết kế kiến trúc và nội thất hàng đầu Việt Nam"
    },
    "about": {
      "@type": "Thing",
      "name": "Thiết kế kiến trúc và nội thất",
      "description": "Dịch vụ thiết kế kiến trúc, nội thất, thi công trọn gói và cải tạo không gian"
    },
    "keywords": "dự án Greenla Home, thiết kế biệt thự, thiết kế căn hộ, thiết kế văn phòng, portfolio Q8, dự án kiến trúc, dự án nội thất, nhà đẹp, thiết kế hiện đại",
    "inLanguage": "vi-VN",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Greenla Home",
      "url": "https://greenlahome.vn"
    }
  };

  return (
    <DefaultLayout 
      title={meta?.title}
      desc={meta?.description}
      thumbnail={meta?.og?.image}
      meta={meta}
    >
      <Head>
        {/* JSON-LD Schema.org cho trang Dự án */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <h1 className="visually-hidden">
        Dự án thiết kế kiến trúc và nội thất Greenla Home
      </h1>
      <ProjectsPage />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  // Projects are now fetched client-side via API
  const meta = {
    title: "Dự án Greenla Home - Bộ sưu tập thiết kế kiến trúc và nội thất đẳng cấp",
    description:
      "Khám phá bộ sưu tập hơn 500 dự án thiết kế kiến trúc và nội thất đẳng cấp của Greenla Home. Từ biệt thự hiện đại, căn hộ cao cấp đến văn phòng sang trọng - mỗi dự án đều mang dấu ấn độc đáo.",
    keywords:
      "dự án Greenla Home, thiết kế biệt thự, thiết kế căn hộ, thiết kế văn phòng, portfolio Q8, dự án kiến trúc, dự án nội thất, nhà đẹp, thiết kế hiện đại",
    robots: "index, follow",
    author: "Greenla Home",
    canonical: "https://greenlahome.vn/du-an",
    og: {
      title: "Dự án Greenla Home - Bộ sưu tập thiết kế kiến trúc và nội thất đẳng cấp",
      description:
        "Khám phá bộ sưu tập hơn 500 dự án thiết kế kiến trúc và nội thất đẳng cấp của Greenla Home. Từ biệt thự hiện đại, căn hộ cao cấp đến văn phòng sang trọng - mỗi dự án đều mang dấu ấn độc đáo.",
      type: "website",
      image: "https://greenlahome.vn/images/og-image.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://greenlahome.vn/du-an",
    },
    twitter: {
      card: "summary_large_image",
      title: "Dự án Greenla Home - Bộ sưu tập thiết kế kiến trúc và nội thất đẳng cấp",
      description:
        "Khám phá bộ sưu tập hơn 500 dự án thiết kế kiến trúc và nội thất đẳng cấp của Greenla Home. Từ biệt thự hiện đại, căn hộ cao cấp đến văn phòng sang trọng - mỗi dự án đều mang dấu ấn độc đáo.",
      image: "https://greenlahome.vn/images/og-image.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}
