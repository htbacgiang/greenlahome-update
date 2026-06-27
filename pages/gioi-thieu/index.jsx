import Image from "next/image";
import Link from "next/link";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { FaCheckCircle } from "react-icons/fa";
import ConsultationForm from "../../components/tantruonggiang/ConsultationForm";
import Testimonials from "../../components/tantruonggiang/Testimonials";

const interiorStyles = [
  "Hiện đại (Modern)",
  "Tối giản (Minimalism)",
  "Scandinavian",
  "Japandi",
  "Indochine",
  "Contemporary",
  "Luxury",
];

const projectTypes = ["Căn hộ chung cư", "Nhà phố", "Biệt thự", "Văn phòng"];

const packageSteps = [
  "Tư vấn ý tưởng",
  "Thiết kế 3D",
  "Sản xuất nội thất",
  "Thi công và hoàn thiện công trình",
];

const qualityCommitments = [
  {
    title: "Vật liệu chất lượng cao",
    description:
      "Lựa chọn các dòng vật liệu đạt tiêu chuẩn về độ bền, tính thẩm mỹ và an toàn cho sức khỏe người sử dụng.",
  },
  {
    title: "Thiết kế tối ưu công năng",
    description:
      "Mỗi giải pháp thiết kế đều được nghiên cứu kỹ lưỡng nhằm cân bằng giữa thẩm mỹ, công năng và chi phí đầu tư.",
  },
  {
    title: "Thi công đúng tiến độ",
    description:
      "Quy trình làm việc minh bạch, kiểm soát chặt chẽ tiến độ và chất lượng ở từng giai đoạn thực hiện.",
  },
  {
    title: "Chi phí hợp lý",
    description:
      "Đưa ra giải pháp phù hợp với ngân sách của khách hàng nhưng vẫn đảm bảo giá trị sử dụng và tính thẩm mỹ lâu dài.",
  },
  {
    title: "Bảo hành và đồng hành lâu dài",
    description:
      "GreenLaHome không chỉ bàn giao công trình mà còn đồng hành cùng khách hàng trong quá trình sử dụng với chính sách bảo hành và hỗ trợ tận tâm.",
  },
];

const missions = [
  "Mang đến những không gian sống chất lượng, tiện nghi và giàu giá trị thẩm mỹ.",
  "Cung cấp giải pháp thiết kế và thi công nội thất tối ưu cho từng khách hàng.",
  "Không ngừng đổi mới, ứng dụng công nghệ hiện đại để nâng cao trải nghiệm dịch vụ.",
  "Xây dựng môi trường làm việc chuyên nghiệp, sáng tạo và phát triển bền vững.",
  "Góp phần nâng cao chất lượng cuộc sống và giá trị cộng đồng.",
];

const coreValues = [
  {
    title: "Chất Lượng",
    description:
      "Lấy chất lượng sản phẩm và dịch vụ làm nền tảng cho sự phát triển bền vững.",
  },
  {
    title: "Uy Tín",
    description:
      "Luôn minh bạch, cam kết và thực hiện đúng những gì đã thỏa thuận với khách hàng.",
  },
  {
    title: "Sáng Tạo",
    description:
      "Không ngừng đổi mới tư duy thiết kế và ứng dụng công nghệ để tạo ra những giải pháp tối ưu.",
  },
  {
    title: "Trách Nhiệm",
    description:
      "Có trách nhiệm với khách hàng, đối tác, nhân sự và cộng đồng.",
  },
  {
    title: "Đồng Hành Phát Triển",
    description:
      "Xây dựng mối quan hệ hợp tác lâu dài dựa trên sự tin tưởng và cùng nhau tạo ra giá trị bền vững.",
  },
];

export default function AboutUs() {
  return (
    <DefaultLayout>
      <section className="relative h-[360px] md:h-[460px] bg-gray-900">
        <div className="absolute inset-0">
          <Image
            src="/images/noi-that-1.jpg"
            alt="GreenLaHome thiết kế thi công nội thất trọn gói"
            fill
            priority
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#deb46d]">
            Về GreenLaHome
          </p>
          <h1 className="text-2xl font-bold leading-tight md:text-3xl">
            GreenLaHome - Kiến Tạo Không Gian Sống Đẳng Cấp
          </h1>
          <nav aria-label="Breadcrumb" className="mt-5 text-gray-300">
            <Link href="/">
              <span className="cursor-pointer hover:text-[#deb46d]">
                Trang Chủ
              </span>
            </Link>
            <span className="mx-2">/</span>
            <span>Giới thiệu</span>
          </nav>
        </div>
      </section>

      <section className="bg-white py-16 text-gray-900">
        <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#deb46d]">
              Chúng tôi là
            </p>
            <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl">
              Đơn vị thiết kế và thi công nội thất trọn gói
            </h2>
            <div className="space-y-5 text-base leading-8 text-gray-700 md:text-lg">
              <p>
                GreenLaHome là đơn vị chuyên thiết kế và thi công nội thất trọn
                gói, mang đến những giải pháp không gian sống hiện đại, tiện
                nghi và tối ưu công năng cho căn hộ chung cư, nhà phố, biệt thự
                và văn phòng.
              </p>
              <p>
                Với đội ngũ kiến trúc sư, kỹ sư và chuyên gia nội thất giàu
                kinh nghiệm, chúng tôi không chỉ tạo nên những công trình đẹp về
                thẩm mỹ mà còn đảm bảo giá trị sử dụng bền vững theo thời gian.
              </p>
              <p>
                Chúng tôi tin rằng mỗi ngôi nhà đều mang một câu chuyện riêng
                và nội thất chính là yếu tố giúp thể hiện phong cách sống, cá
                tính cũng như những giá trị mà gia chủ hướng đến.
              </p>
              <p>
                Vì vậy, GreenLaHome luôn đặt khách hàng làm trung tâm trong mọi
                giải pháp thiết kế, mang đến những không gian sống được
                &quot;đo ni đóng giày&quot; theo nhu cầu và mong muốn của từng
                gia đình.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative h-[300px] overflow-hidden rounded-lg md:h-[420px]">
              <Image
                src="/images/noi-that-2.jpg"
                alt="Không gian nội thất hiện đại GreenLaHome"
                fill
                className="object-cover brightness-90"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {projectTypes.map((type) => (
                <div
                  key={type}
                  className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm"
                >
                  <p className="text-sm font-semibold text-gray-800">{type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative h-[320px] overflow-hidden rounded-lg md:h-[520px]">
            <Image
              src="/images/thi-cong-noi-that.webp"
              alt="GreenLaHome thi công nội thất trọn gói"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#deb46d]">
              Giải pháp toàn diện
            </p>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              Giải Pháp Nội Thất Trọn Gói
            </h2>
            <div className="space-y-5 text-base leading-8 text-gray-700 md:text-lg">
              <p>
                GreenLaHome cung cấp dịch vụ thiết kế và thi công nội thất toàn
                diện, từ khâu tư vấn ý tưởng, thiết kế 3D, sản xuất nội thất
                đến thi công và hoàn thiện công trình.
              </p>
              <p>
                Chúng tôi sở hữu hệ thống sản xuất nội thất với vật liệu chất
                lượng cao, đặc biệt là các dòng gỗ công nghiệp cao cấp có độ bền
                vượt trội, khả năng chống ẩm, chống cong vênh và phù hợp với
                điều kiện khí hậu tại Việt Nam.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {packageSteps.map((step) => (
                <div key={step} className="flex items-center text-gray-800">
                  <FaCheckCircle className="mr-3 flex-shrink-0 text-[#deb46d]" />
                  <span>{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Phong cách thiết kế
              </h3>
              <div className="flex flex-wrap gap-3">
                {interiorStyles.map((style) => (
                  <span
                    key={style}
                    className="rounded-lg border border-[#deb46d] bg-[#fbf3e1] px-4 py-2 text-sm font-medium text-gray-800"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-8 rounded-lg border border-[#deb46d] bg-[#fbf3e1] p-5 text-base leading-7 text-gray-800">
              Đặc biệt, GreenLaHome có kinh nghiệm tối ưu không gian cho các căn
              hộ từ 30m² đến 120m², giúp mỗi mét vuông đều được khai thác hiệu
              quả, mang lại sự tiện nghi, thông thoáng và hài hòa trong sinh
              hoạt hàng ngày.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#deb46d]">
              Uy tín từ chất lượng
            </p>
            <h2 className="mb-5 text-3xl font-bold md:text-4xl">
              Cam Kết Chất Lượng
            </h2>
            <p className="text-base leading-8 text-gray-700 md:text-lg">
              Chất lượng là nền tảng tạo nên uy tín của GreenLaHome. Chúng tôi
              cam kết mang đến cho khách hàng những công trình được thực hiện
              bằng sự tận tâm, chuyên nghiệp và trách nhiệm cao nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {qualityCommitments.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="mb-3 text-xl font-semibold text-[#deb46d]">
                  {item.title}
                </h3>
                <p className="leading-7 text-gray-700">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#deb46d]">
              Đổi mới trải nghiệm
            </p>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              Ứng Dụng Công Nghệ Trong Thiết Kế Nội Thất
            </h2>
            <div className="space-y-5 text-base leading-8 text-gray-700 md:text-lg">
              <p>
                Trong thời đại chuyển đổi số, GreenLaHome không ngừng đổi mới
                và ứng dụng các công nghệ hiện đại, bao gồm công nghệ AI và các
                công cụ thiết kế tiên tiến nhằm nâng cao trải nghiệm khách hàng.
              </p>
              <p>
                Khách hàng có thể dễ dàng hình dung không gian sống tương lai
                thông qua các bản thiết kế trực quan, mô phỏng chi tiết và giải
                pháp cá nhân hóa theo nhu cầu thực tế.
              </p>
              <p>
                Điều này giúp tối ưu thời gian triển khai, hạn chế phát sinh và
                nâng cao hiệu quả đầu tư cho mỗi dự án.
              </p>
            </div>
          </div>
          <div className="relative h-[320px] overflow-hidden rounded-lg md:h-[430px]">
            <Image
              src="/images/view-luxurious-hotel-interior-space.jpg"
              alt="Ứng dụng công nghệ trong thiết kế nội thất"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#deb46d]">
              Định hướng phát triển
            </p>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Triết Lý, Tầm Nhìn Và Sứ Mệnh
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <article className="rounded-lg border border-gray-200 p-6">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                Triết Lý Kinh Doanh
              </h3>
              <div className="space-y-4 leading-7 text-gray-700">
                <p>
                  GreenLaHome theo đuổi triết lý kiến tạo những không gian sống
                  không chỉ đẹp mà còn mang lại giá trị bền vững cho con người.
                </p>
                <p>
                  Chúng tôi tin rằng một không gian được thiết kế tốt sẽ góp
                  phần nâng cao chất lượng cuộc sống, tạo cảm hứng làm việc, gắn
                  kết các thành viên trong gia đình và mang lại sự cân bằng
                  trong cuộc sống hiện đại.
                </p>
                <p>
                  Mỗi công trình của GreenLaHome đều được xây dựng trên nền tảng
                  sáng tạo, chất lượng và sự thấu hiểu khách hàng.
                </p>
              </div>
            </article>

            <article id="tam-nhin" className="rounded-lg border border-gray-200 p-6">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                Tầm Nhìn
              </h3>
              <p className="leading-7 text-gray-700">
                Trở thành thương hiệu thiết kế và thi công nội thất uy tín hàng
                đầu tại Việt Nam, tiên phong trong việc ứng dụng công nghệ vào
                lĩnh vực nội thất, mang đến những giải pháp sống hiện đại, thông
                minh và bền vững cho cộng đồng.
              </p>
            </article>

            <article className="rounded-lg border border-gray-200 p-6">
              <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                Sứ Mệnh
              </h3>
              <ul className="space-y-3">
                {missions.map((mission) => (
                  <li key={mission} className="flex items-start text-gray-700">
                    <FaCheckCircle className="mr-3 mt-1 flex-shrink-0 text-[#deb46d]" />
                    <span className="leading-7">{mission}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-gray-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#deb46d]">
              Nền tảng thương hiệu
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">Giá Trị Cốt Lõi</h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((value) => (
              <article
                key={value.title}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
              >
                <h3 className="mb-3 text-xl font-semibold text-[#deb46d]">
                  {value.title}
                </h3>
                <p className="text-sm leading-7 text-gray-700">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <ConsultationForm />
    </DefaultLayout>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Giới Thiệu GreenLaHome - Kiến Tạo Không Gian Sống Đẳng Cấp",
    description:
      "GreenLaHome chuyên thiết kế và thi công nội thất trọn gói cho chung cư, nhà phố, biệt thự và văn phòng, tối ưu công năng và thẩm mỹ bền vững.",
    keywords:
      "GreenLaHome, thiết kế nội thất, thi công nội thất trọn gói, nội thất chung cư, nội thất nhà phố, nội thất biệt thự, nội thất văn phòng",
    robots: "index, follow",
    author: "GreenLaHome",
    canonical: "https://greenlahome.vn/gioi-thieu",
    og: {
      title: "GreenLaHome - Kiến Tạo Không Gian Sống Đẳng Cấp",
      description:
        "Khám phá giải pháp thiết kế và thi công nội thất trọn gói từ GreenLaHome, tối ưu công năng, thẩm mỹ và giá trị sử dụng lâu dài.",
      type: "website",
      image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://greenlahome.vn/gioi-thieu",
    },
    twitter: {
      card: "summary_large_image",
      title: "Giới Thiệu GreenLaHome - Kiến Tạo Không Gian Sống Đẳng Cấp",
      description:
        "GreenLaHome chuyên thiết kế và thi công nội thất trọn gói, mang đến không gian sống hiện đại, tiện nghi và bền vững.",
      image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
    },
  };

  return {
    props: {
      meta,
    },
  };
}
