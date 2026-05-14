"use client";
import { useState, useEffect, useRef } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email không hợp lệ";
    if (!formData.message.trim()) newErrors.message = "Vui lòng nhập yêu cầu tư vấn";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const leftSection = leftSectionRef.current;
    const rightSection = rightSectionRef.current;
    
    if (leftSection) observer.observe(leftSection);
    if (rightSection) observer.observe(rightSection);

    return () => {
      if (leftSection) observer.unobserve(leftSection);
      if (rightSection) observer.unobserve(rightSection);
    };
  }, []);

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
        setStatus("Đăng ký tư vấn thành công!");
        setFormData({ name: "", phone: "", email: "", message: "" });
        setTimeout(() => setStatus(""), 3000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Đã xảy ra lỗi khi gửi form"}`);
    }
  };

  return (
    <div className="py-2 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 border border-black rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div ref={leftSectionRef} className="opacity-0 md:block hidden">
              <h2 className="text-xl font-semibold text-red-600 uppercase tracking-wide mb-2">
                Đăng ký tư vấn
              </h2>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Thiết kế nội thất đẳng cấp cùng Greenla Home
              </h3>
              <p className="text-lg text-gray-600">
                Greenla Home mang đến giải pháp nội thất chuyên nghiệp, hiện đại và phù hợp với mọi không gian sống.
              </p>
              <p>Đăng ký ngay để được tư vấn miễn phí!</p>
            </div>

            <div ref={rightSectionRef} className="opacity-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Họ và tên"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Số điện thoại"
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.phone ? "border-black" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email của bạn"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                      errors.email ? "border-black" : "border-gray-300"
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Yêu cầu tư vấn của bạn (ví dụ: thiết kế phòng khách, phòng ngủ...)"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black h-32 resize-none ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={status === "Đang gửi..."}
                  className="w-full bg-black text-white font-semibold py-3 rounded-full hover:bg-red-600 transition-colors disabled:bg-pink-300 flex items-center justify-center gap-2"
                >
                  Đăng ký tư vấn <span>→</span>
                </button>
              </form>
              {status && (
                <p
                  className={`mt-2 text-center ${
                    status.includes("thành công") ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {status}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .opacity-0 {
          opacity: 0;
        }
        .slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}