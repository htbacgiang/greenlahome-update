"use client";
import { useState } from 'react';

const FurnitureViewer = ({ 
  model3D = "https://www.jegaai.com/720/S5DDIGDJCI", 
  projectTitle = "GreenLa Home" 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Nếu không có model3D thì không hiển thị gì cả
  if (!model3D) {
    return null;
  }
  
  return (
    <div className="w-full max-w-6xl mx-auto my-12 px-4">
      {/* Tiêu đề section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 uppercase">
          Khám Phá Không Gian 3D & VR
        </h2>
        <div className="w-20 h-1 bg-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Trải nghiệm thực tế ảo đỉnh cao, giúp bạn hình dung căn hộ tương lai một cách chân thực và trực quan nhất.
        </p>
      </div>

      {/* Viewer Embed */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 aspect-video md:h-[600px] border-4 border-white">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-green-600 mb-4"></div>
              <p className="text-gray-600 font-medium">Đang tải không gian 3D...</p>
            </div>
          </div>
        )}
        <iframe 
          title={`Mô hình 3D - ${projectTitle}`}
          frameBorder="0" 
          allowFullScreen 
          mozAllowFullScreen={true}
          webkitallowfullscreen={true}
          allow="autoplay; fullscreen; xr-spatial-tracking" 
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
          width="100%" 
          height="100%" 
          src={model3D}
          className="w-full h-full"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Mô tả bổ sung */}
      <div className="mt-8 text-center bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Sử dụng chuột hoặc ngón tay để xoay 360 độ, phóng to/thu nhỏ và nhấn vào các điểm điều hướng để di chuyển giữa các phòng. 
          Công nghệ VR mang đến cái nhìn chi tiết về vật liệu, ánh sáng và bố cục không gian thiết kế của <span className="font-bold text-green-700">GreenLa Home</span>.
        </p>
      </div>
    </div>
  );
}

export default FurnitureViewer;