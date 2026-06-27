import { useState } from "react";
import Image from "next/image";
import DefaultLayout2 from "../../components/layout/DefaultLayout2";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPaperPlane,
  FaUser,
  FaRuler,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { SiZalo } from "react-icons/si";

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  area: "",
  budget: "",
  location: "",
  message: "",
  consultationDate: "",
  consultationTime: "",
  consultationType: "office",
};

const contactInfo = {
  address: "Số 10 lô C5, KDT Geleximco Lê Trọng Tấn, Hà Đông, Hà Nội",
  email: "lienhe@greenlahome.vn",
  phone: "096.292.2332",
  phoneHref: "0962922332",
  workingHours: {
    weekdays: "Thứ 2 - Thứ 7: 8:00 - 18:00",
    weekend: "Chủ nhật: 9:00 - 17:00",
  },
};

const socialLinks = [
  { name: "Facebook", icon: FaFacebookF, url: "https://facebook.com/greenlahome", color: "bg-blue-600" },
  { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/greenlahome", color: "bg-pink-600" },
  { name: "YouTube", icon: FaYoutube, url: "https://youtube.com/@greenlahome", color: "bg-red-600" },
  { name: "Zalo", icon: SiZalo, url: "https://zalo.me/0962922332", color: "bg-blue-500" },
];

const projectTypes = [
  "Thiết kế nội thất chung cư",
  "Thiết kế nội thất nhà phố",
  "Thiết kế nội thất biệt thự",
  "Thi công nội thất trọn gói",
  "Cải tạo không gian",
  "Tủ bếp / đồ gỗ nội thất",
  "Khác",
];

const budgetRanges = [
  "Dưới 200 triệu",
  "200 - 500 triệu",
  "500 triệu - 1 tỷ",
  "1 - 2 tỷ",
  "Trên 2 tỷ",
  "Chưa xác định",
];

const timeSlots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
];

export default function ContactPage({ meta }) {
  const [activeTab, setActiveTab] = useState("contact");
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9+\-\s().]+$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (activeTab === "booking") {
      if (!formData.projectType) newErrors.projectType = "Vui lòng chọn loại công trình";
      if (!formData.consultationDate) {
        newErrors.consultationDate = "Vui lòng chọn ngày tư vấn";
      } else {
        const selectedDate = new Date(formData.consultationDate);
        const today = new Date();
        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
          newErrors.consultationDate = "Ngày tư vấn phải là hôm nay hoặc ngày trong tương lai";
        }
      }
      if (!formData.consultationTime) newErrors.consultationTime = "Vui lòng chọn khung giờ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrors({});
    setSubmitStatus(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const buildMessage = () => {
    const lines = [
      `Hình thức: ${activeTab === "booking" ? "Đặt lịch tư vấn" : "Gửi yêu cầu tư vấn"}`,
      formData.projectType && `Loại dự án: ${formData.projectType}`,
      formData.area && `Diện tích: ${formData.area}`,
      formData.budget && `Ngân sách: ${formData.budget}`,
      formData.location && `Vị trí dự án: ${formData.location}`,
      activeTab === "booking" && `Hình thức tư vấn: ${formData.consultationType === "office" ? "Tại văn phòng" : "Trực tuyến"}`,
      activeTab === "booking" && formData.consultationDate && `Ngày mong muốn: ${formData.consultationDate}`,
      activeTab === "booking" && formData.consultationTime && `Khung giờ: ${formData.consultationTime}`,
      formData.message && `Nội dung: ${formData.message}`,
    ];

    return lines.filter(Boolean).join("\n");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: buildMessage(),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setErrors({});
        setFormData(initialFormData);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DefaultLayout2
      title={meta?.title}
      desc={meta?.description}
      thumbnail={meta?.og?.image}
      meta={meta}
    >
      <div className="min-h-screen bg-white">
        <div className='h-[70px]'> </div>
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="rounded-3xl bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:p-8">
                <h2 className="mb-8 text-3xl font-bold text-gray-950 md:text-4xl">
                  Thông tin liên hệ
                </h2>

                <div className="mb-8 space-y-6">
                  <ContactInfoItem icon={<FaMapMarkerAlt />} title="Địa chỉ văn phòng">
                    <p className="leading-relaxed text-gray-600">{contactInfo.address}</p>
                  </ContactInfoItem>

                  <ContactInfoItem icon={<FaPhone />} title="Hotline">
                    <a
                      href={`tel:${contactInfo.phoneHref}`}
                      className="text-lg font-semibold text-gray-950 transition-colors hover:text-green-700"
                    >
                      {contactInfo.phone}
                    </a>
                  </ContactInfoItem>

                  <ContactInfoItem icon={<FaEnvelope />} title="Email">
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="font-semibold text-gray-950 transition-colors hover:text-green-700"
                    >
                      {contactInfo.email}
                    </a>
                  </ContactInfoItem>

                  <ContactInfoItem icon={<FaClock />} title="Giờ làm việc">
                    <p className="text-gray-600">{contactInfo.workingHours.weekdays}</p>
                    <p className="text-gray-600">{contactInfo.workingHours.weekend}</p>
                  </ContactInfoItem>
                </div>

                <p className="mb-4 text-lg font-bold text-gray-950">Kết nối với chúng tôi</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className={`flex h-12 w-12 items-center justify-center rounded-xl text-white transition duration-300 hover:-translate-y-1 ${social.color}`}
                      >
                        <Icon className="text-xl" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="min-h-[420px] overflow-hidden rounded-3xl bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                <iframe
                  title="Bản đồ Greenlahome"
                  src="https://www.google.com/maps?q=20.9879366,105.7391281&z=17&output=embed"
                  width="100%"
                  height="100%"
                  className="h-full min-h-[420px] w-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto container">
              <div className="mb-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
                  Tư vấn miễn phí
                </p>
                <h2 className="mt-3 text-3xl font-bold text-gray-950 md:text-4xl">
                  Gửi thông tin để Greenlahome hỗ trợ bạn
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-gray-600 md:text-lg">
                  Chọn hình thức phù hợp, để lại thông tin dự án và đội ngũ Greenlahome sẽ phản hồi trong vòng 24 giờ.
                </p>
              </div>

              <div className="mb-8 grid grid-cols-1 gap-3 rounded-2xl bg-[#f7f8f4] p-2 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleTabChange("contact")}
                  className={`flex items-center justify-center gap-3 rounded-xl px-5 py-4 text-sm font-bold transition md:text-base ${activeTab === "contact"
                    ? "bg-white text-gray-950 shadow-sm"
                    : "text-gray-600 hover:bg-white/70"
                    }`}
                >
                  <FaPaperPlane />
                  Gửi yêu cầu tư vấn
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange("booking")}
                  className={`flex items-center justify-center gap-3 rounded-xl px-5 py-4 text-sm font-bold transition md:text-base ${activeTab === "booking"
                    ? "bg-white text-gray-950 shadow-sm"
                    : "text-gray-600 hover:bg-white/70"
                    }`}
                >
                  <FaCalendarAlt />
                  Đặt lịch tư vấn
                </button>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_18px_70px_rgba(15,23,42,0.08)] md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <TextInput
                      label="Họ và tên *"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={errors.name}
                      placeholder="Nhập họ và tên của bạn"
                      icon={<FaUser />}
                      required
                    />
                    <TextInput
                      label="Số điện thoại *"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                      placeholder="Nhập số điện thoại"
                      icon={<FaPhone />}
                      required
                    />
                  </div>

                  <TextInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder="Nhập địa chỉ email"
                    icon={<FaEnvelope />}
                  />

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <SelectInput
                      label={activeTab === "booking" ? "Loại công trình *" : "Loại dự án"}
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      error={errors.projectType}
                      options={projectTypes}
                      placeholder={activeTab === "booking" ? "Chọn loại công trình" : "Chọn loại dự án"}
                      required={activeTab === "booking"}
                    />
                    <TextInput
                      label="Diện tích (m²)"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      placeholder="VD: 80m², 120m²"
                      icon={<FaRuler />}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <SelectInput
                      label="Ngân sách dự kiến"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      options={budgetRanges}
                      placeholder="Chọn mức ngân sách"
                    />
                    <TextInput
                      label="Vị trí dự án"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="VD: Hà Nội, TP.HCM"
                      icon={<FaMapMarkerAlt />}
                    />
                  </div>

                  {activeTab === "booking" && (
                    <>
                      <div>
                        <label className="mb-3 block text-sm font-semibold text-gray-700">
                          Hình thức tư vấn
                        </label>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <RadioCard
                            title="Tại văn phòng"
                            description="Gặp mặt trực tiếp tại văn phòng Greenlahome"
                            name="consultationType"
                            value="office"
                            checked={formData.consultationType === "office"}
                            onChange={handleInputChange}
                          />
                          <RadioCard
                            title="Trực tuyến"
                            description="Tư vấn qua video call hoặc điện thoại"
                            name="consultationType"
                            value="online"
                            checked={formData.consultationType === "online"}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <TextInput
                          label="Ngày mong muốn *"
                          name="consultationDate"
                          type="date"
                          value={formData.consultationDate}
                          onChange={handleInputChange}
                          error={errors.consultationDate}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                        <SelectInput
                          label="Khung giờ mong muốn *"
                          name="consultationTime"
                          value={formData.consultationTime}
                          onChange={handleInputChange}
                          error={errors.consultationTime}
                          options={timeSlots}
                          placeholder="Chọn khung giờ"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      {activeTab === "booking" ? "Ghi chú thêm" : "Mô tả chi tiết"}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none transition focus:border-transparent focus:ring-2 focus:ring-green-600"
                      placeholder="Mô tả chi tiết về dự án, yêu cầu đặc biệt hoặc câu hỏi của bạn..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center rounded-xl bg-green-700 px-6 py-4 font-bold text-white transition duration-300 hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-green-300"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Đang gửi...
                      </span>
                    ) : activeTab === "booking" ? (
                      <>
                        <FaCalendarAlt className="mr-3" />
                        Gửi yêu cầu đặt lịch
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-3" />
                        Gửi yêu cầu tư vấn
                      </>
                    )}
                  </button>
                </form>

                {submitStatus === "success" && (
                  <StatusMessage
                    type="success"
                    title="Gửi thành công!"
                    message="Cảm ơn bạn đã liên hệ với Greenlahome. Chúng tôi sẽ phản hồi trong vòng 24 giờ."
                  />
                )}

                {submitStatus === "error" && (
                  <StatusMessage
                    type="error"
                    title="Có lỗi xảy ra"
                    message={`Vui lòng thử lại hoặc liên hệ trực tiếp qua hotline: ${contactInfo.phone}`}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </DefaultLayout2>
  );
}

function ContactInfoItem({ icon, title, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-green-50 text-xl text-green-700">
        {icon}
      </div>
      <div>
        <h3 className="mb-2 text-lg font-bold text-gray-950">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function TextInput({ label, icon, error, className = "", ...props }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          className={`w-full rounded-xl border py-3 pr-4 text-gray-950 outline-none transition focus:border-transparent focus:ring-2 focus:ring-green-600 ${icon ? "pl-12" : "pl-4"
            } ${error ? "border-red-500" : "border-gray-300"}`}
        />
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function SelectInput({ label, options, placeholder, error, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <select
        {...props}
        className={`w-full rounded-xl border px-4 py-3 text-gray-950 outline-none transition focus:border-transparent focus:ring-2 focus:ring-green-600 ${error ? "border-red-500" : "border-gray-300"
          }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function RadioCard({ title, description, ...props }) {
  return (
    <label className="flex cursor-pointer items-start rounded-xl border border-gray-300 p-4 transition hover:bg-green-50">
      <input
        type="radio"
        className="mt-1 text-green-700 focus:ring-green-600"
        {...props}
      />
      <span className="ml-3">
        <span className="block font-semibold text-gray-950">{title}</span>
        <span className="mt-1 block text-sm leading-5 text-gray-600">{description}</span>
      </span>
    </label>
  );
}

function StatusMessage({ type, title, message }) {
  const isSuccess = type === "success";

  return (
    <div className={`mt-8 rounded-xl border p-6 ${isSuccess ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
      <div className="flex items-start gap-4">
        {isSuccess ? (
          <FaCheckCircle className="mt-1 text-2xl text-green-500" />
        ) : (
          <span className="mt-1 text-2xl font-bold text-red-500">!</span>
        )}
        <div>
          <h3 className={`mb-2 text-lg font-bold ${isSuccess ? "text-green-800" : "text-red-800"}`}>
            {title}
          </h3>
          <p className={isSuccess ? "text-green-700" : "text-red-700"}>{message}</p>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const meta = {
    title: "Liên Hệ - Greenlahome",
    description:
      "Liên hệ với Greenlahome để được tư vấn thiết kế và thi công nội thất chung cư, nhà phố, nội thất gỗ công nghiệp. Hotline: 096.292.2332.",
    keywords:
      "liên hệ Greenlahome, tư vấn thiết kế nội thất, thi công nội thất, nội thất chung cư, nội thất nhà phố",
    author: "Greenlahome",
    robots: "index, follow",
    canonical: "https://greenlahome.vn/lien-he",
    og: {
      title: "Liên Hệ - Greenlahome",
      description:
        "Liên hệ với Greenlahome để được tư vấn thiết kế và thi công nội thất trọn gói.",
      type: "website",
      image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://greenlahome.vn/lien-he",
      siteName: "Greenlahome",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: "Liên Hệ - Greenlahome",
      description:
        "Liên hệ với Greenlahome để được tư vấn thiết kế và thi công nội thất cao cấp.",
      image: "https://greenlahome.vn/images/noi-that-tan-truong-giang.jpg",
      site: "@GreenLaHome",
    },
  };

  return {
    props: {
      meta,
    },
  };
}
