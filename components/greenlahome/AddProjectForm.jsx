import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { X, Plus, Upload, ImageIcon, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const Editor = dynamic(() => import('../editor/Editor'), { ssr: false });

// Upload ảnh trực tiếp từ browser lên Cloudinary (không qua server)
const CLOUD_NAME = 'dcgtt1jza';
const UPLOAD_PRESET = 'greenlahome_unsigned';

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', 'greenlahome');

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Upload thất bại');
  }

  const data = await res.json();
  return data.secure_url;
}

// Helper function to create slug from title
const createSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove Vietnamese diacritics
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

export default function AddProjectForm({ onSuccess, editingProject = null }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const isEditMode = !!editingProject;
  const [isUploadingMain, setIsUploadingMain] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const mainImageInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const uploadQueue = [];
  
  // Images state - with width/height support
  const [images, setImages] = useState([
    {
      src: '',
      color: '#000000',
      aspectRatio: 'landscape', // Fallback for old data
      width: 16, // Default width for landscape
      height: 9, // Default height for landscape
    },
  ]);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: 'villa',
    location: '',
    area: '',
    type: '',
    year: new Date().getFullYear().toString(),
    client: '',
    style: '',
    budget: '',
    duration: '',
    completion: 'Đang thi công',
    description: '',
    tags: '',
    has3D: false,
    model3D: '',
    featured: false,
    overview: '',
    features: ''
  });

  // Load data when editing
  useEffect(() => {
    if (editingProject) {
      // Helper function to get aspect ratio from gallery item
      const getAspectRatio = (item) => {
        if (typeof item === 'object' && item.aspectRatio) {
          return item.aspectRatio;
        }
        return 'landscape'; // Default
      };

      // Helper function to get src from gallery item
      const getSrc = (item) => {
        if (typeof item === 'string') {
          return item;
        }
        if (typeof item === 'object' && item !== null) {
          return item.src || item.url || '';
        }
        return String(item || '');
      };

      // Convert gallery to images array
      const imageArray = [
        {
          src: editingProject.image || '',
          color: '#000000',
          aspectRatio: 'landscape', // Cover image default to landscape
          width: 16,
          height: 9,
        },
        ...(Array.isArray(editingProject.gallery) ? editingProject.gallery.map(img => {
          const src = getSrc(img);
          const aspectRatio = getAspectRatio(img);
          // Get width/height from gallery item if available
          const width = img.width || (aspectRatio === 'square' ? 1 : aspectRatio === 'portrait' ? 3 : aspectRatio === 'landscape-3-4' ? 4 : 16);
          const height = img.height || (aspectRatio === 'square' ? 1 : aspectRatio === 'portrait' ? 4 : aspectRatio === 'landscape-3-4' ? 3 : 9);
          return {
            src: src,
            color: '#000000',
            aspectRatio: aspectRatio,
            width: width,
            height: height,
          };
        }) : [])
      ];

      setImages(imageArray);
      
      setFormData({
        title: editingProject.title || '',
        subtitle: editingProject.subtitle || '',
        category: editingProject.category || 'villa',
        location: editingProject.location || '',
        area: editingProject.area || '',
        type: editingProject.type || '',
        year: editingProject.year || new Date().getFullYear().toString(),
        client: editingProject.client || '',
        style: editingProject.style || '',
        budget: editingProject.budget || '',
        duration: editingProject.duration || '',
        completion: editingProject.completion || 'Đang thi công',
        description: editingProject.description || '',
        tags: editingProject.tags ? (Array.isArray(editingProject.tags) ? editingProject.tags.join(', ') : editingProject.tags) : '',
        has3D: editingProject.has3D || false,
        model3D: editingProject.model3D || '',
        featured: editingProject.featured || false,
        overview: editingProject.overview || '',
        features: editingProject.features ? JSON.stringify(editingProject.features, null, 2) : ''
      });
    }
  }, [editingProject]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle aspect ratio change
  const handleAspectRatioChange = (index, aspectRatio) => {
    setImages(prevImages => {
      const newImages = [...prevImages];
      if (!newImages[index]) {
        newImages[index] = { src: '', color: '#000000', aspectRatio: 'landscape', width: 16, height: 9 };
      }
      let width, height;
      switch (aspectRatio) {
        case 'square':   width = 1; height = 1; break;
        case 'portrait': width = 3; height = 4; break;
        case 'landscape-3-4': width = 4; height = 3; break;
        case 'landscape':
        default:         width = 16; height = 9; break;
      }
      newImages[index] = { ...newImages[index], aspectRatio: aspectRatio || 'landscape', width, height };
      return newImages;
    });
  };

  // Handle width change
  const handleWidthChange = (index, width) => {
    setImages(prevImages => {
      const newImages = [...prevImages];
      if (!newImages[index]) newImages[index] = { src: '', color: '#000000', aspectRatio: 'landscape', width: 16, height: 9 };
      newImages[index] = { ...newImages[index], width: parseInt(width) || 16 };
      return newImages;
    });
  };

  // Handle height change
  const handleHeightChange = (index, height) => {
    setImages(prevImages => {
      const newImages = [...prevImages];
      if (!newImages[index]) newImages[index] = { src: '', color: '#000000', aspectRatio: 'landscape', width: 16, height: 9 };
      newImages[index] = { ...newImages[index], height: parseInt(height) || 9 };
      return newImages;
    });
  };

  // Remove image
  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // Upload ảnh đại diện trực tiếp lên Cloudinary từ browser
  const handleMainImageUpload = async (ev) => {
    const files = ev.target?.files;
    if (!files?.length) return;
    setIsUploadingMain(true);
    try {
      const url = await uploadToCloudinary(files[0]);
      setImages(prev => {
        const newImages = [...prev];
        newImages[0] = { ...newImages[0], src: url };
        return newImages;
      });
      toast.success('Tải ảnh đại diện thành công!');
    } catch (err) {
      toast.error(err.message || 'Lỗi khi tải ảnh!');
    } finally {
      setIsUploadingMain(false);
      if (mainImageInputRef.current) mainImageInputRef.current.value = '';
    }
  };

  // Upload nhiều ảnh gallery trực tiếp lên Cloudinary từ browser
  const handleGalleryUpload = async (ev) => {
    const files = Array.from(ev.target?.files || []);
    if (!files.length) return;
    setIsUploadingGallery(true);
    try {
      const urls = await Promise.all(files.map(f => uploadToCloudinary(f)));
      setImages(prev => [
        ...prev,
        ...urls.map(url => ({ src: url, color: '#000000', aspectRatio: 'square', width: 1, height: 1 }))
      ]);
      toast.success(`Tải ${urls.length} ảnh thành công!`);
    } catch (err) {
      toast.error(err.message || 'Lỗi khi tải ảnh!');
    } finally {
      setIsUploadingGallery(false);
      if (galleryInputRef.current) galleryInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      const requiredFields = ['title', 'location', 'area', 'type', 'year', 'description'];
      const missingFields = requiredFields.filter(field => {
        const value = formData[field];
        return !value || (typeof value === 'string' && value.trim() === '');
      });
      
      if (missingFields.length > 0) {
        throw new Error(`Các trường bắt buộc chưa được điền: ${missingFields.join(', ')}`);
      }

      // Get valid images (first one is main image)
      const validImages = images.filter(img => {
        const src = img.src;
        return src && typeof src === 'string' && src.trim() !== '';
      });
      if (validImages.length === 0) {
        throw new Error('Vui lòng nhập ít nhất một ảnh đại diện');
      }

      const projectData = {
        title: typeof formData.title === 'string' ? formData.title.trim() : formData.title,
        subtitle: typeof formData.subtitle === 'string' ? formData.subtitle.trim() : formData.subtitle,
        category: formData.category,
        location: typeof formData.location === 'string' ? formData.location.trim() : formData.location,
        area: typeof formData.area === 'string' ? formData.area.trim() : formData.area,
        type: typeof formData.type === 'string' ? formData.type.trim() : formData.type,
        year: parseInt(formData.year),
        client: typeof formData.client === 'string' ? formData.client.trim() : formData.client,
        style: typeof formData.style === 'string' ? formData.style.trim() : formData.style,
        budget: typeof formData.budget === 'string' ? formData.budget.trim() : formData.budget,
        duration: typeof formData.duration === 'string' ? formData.duration.trim() : formData.duration,
        completion: formData.completion,
        image: validImages[0].src, // First image is main image
        mainImage: validImages[0].src,
        gallery: validImages.slice(1).map(img => ({
          src: img.src,
          aspectRatio: img.aspectRatio || 'landscape',
          width: img.width || (img.aspectRatio === 'square' ? 1 : img.aspectRatio === 'portrait' ? 3 : img.aspectRatio === 'landscape-3-4' ? 4 : 16),
          height: img.height || (img.aspectRatio === 'square' ? 1 : img.aspectRatio === 'portrait' ? 4 : img.aspectRatio === 'landscape-3-4' ? 3 : 9)
        })), // Rest are gallery with width/height
        description: typeof formData.description === 'string' ? formData.description.trim() : formData.description,
        tags: formData.tags ? formData.tags.split(',').map(s => s.trim()).filter(s => s) : [],
        has3D: formData.has3D,
        model3D: formData.model3D || undefined,
        featured: formData.featured,
        slug: createSlug(formData.title),
        overview: typeof formData.overview === 'string' ? formData.overview.trim() : formData.overview,
        features: formData.features ? JSON.parse(formData.features) : [],
        status: 'active'
      };

      // Prepare data for API
      let url, method, requestBody;
      
      if (isEditMode && editingProject) {
        // Update existing project
        url = '/api/projects/update';
        method = 'PUT';
        // Use _id from MongoDB or id from JSON API
        requestBody = {
          id: editingProject._id || editingProject.id,
          ...projectData,
          // Keep slug from existing project to maintain URL consistency
          slug: editingProject.slug || projectData.slug
        };
      } else {
        // Add new project
        url = '/api/projects/add';
        method = 'POST';
        requestBody = projectData;
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || data.error || 'Có lỗi xảy ra');
      }

      setSuccess(isEditMode ? 'Cập nhật dự án thành công!' : 'Thêm dự án thành công!');
      toast.success(isEditMode ? 'Cập nhật dự án thành công!' : 'Thêm dự án thành công!');
      
      // Reset form only if adding
      if (!isEditMode) {
        setFormData({
          title: '',
          subtitle: '',
          category: 'villa',
          location: '',
          area: '',
          type: '',
          year: new Date().getFullYear().toString(),
          client: '',
          style: '',
          budget: '',
          duration: '',
          completion: 'Đang thi công',
          description: '',
          tags: '',
          has3D: false,
          model3D: '',
          featured: false,
          overview: '',
          features: ''
        });
        setImages([{ src: '', color: '#000000', aspectRatio: 'landscape' }]);
      }

      if (onSuccess) {
        onSuccess(data.data || data.project || projectData);
      }
    } catch (err) {
      const errorMessage = err.message || 'Có lỗi xảy ra khi thêm dự án';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditMode ? '✏️ Chỉnh sửa dự án' : '➕ Thêm dự án mới'}
      </h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Dự án Biệt thự FLC Sầm Sơn"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phụ đề
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Biệt thự nghỉ dưỡng cao cấp"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Danh mục <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="villa">Biệt thự - vila</option>
              <option value="townhouse">Nhà phố</option>
              <option value="apartment">Căn hộ</option>
              <option value="commercial">Văn phòng</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vị trí <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="FLC Sầm Sơn, Thanh Hóa"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diện tích <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="350m²"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại dự án <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Thiết kế và Thi công trọn gói"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Năm <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2024"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Khách hàng
            </label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Gia đình anh H."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phong cách
            </label>
            <input
              type="text"
              name="style"
              value={formData.style}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Hiện đại nghỉ dưỡng"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngân sách
            </label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="3.5 - 4.2 tỷ VNĐ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thời gian thực hiện
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="6 tháng"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tình trạng <span className="text-red-500">*</span>
            </label>
            <select
              name="completion"
              value={formData.completion}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Đang thi công">Đang thi công</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đang thiết kế">Đang thiết kế</option>
            </select>
          </div>
        </div>

        {/* Images Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Hình ảnh</h3>
          
          {/* Main Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ảnh đại diện <span className="text-red-500">*</span>
            </label>
            <div className="flex items-start gap-4">
              {/* Upload button */}
              <label
                htmlFor="mainImageInput"
                className={`flex flex-col items-center justify-center w-36 h-36 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                  isUploadingMain
                    ? 'border-blue-300 bg-blue-50 cursor-not-allowed'
                    : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                {isUploadingMain ? (
                  <>
                    <Loader2 size={24} className="text-blue-500 animate-spin mb-1" />
                    <span className="text-xs text-blue-500">Đang tải...</span>
                  </>
                ) : (
                  <>
                    <Upload size={24} className="text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500 text-center px-2">Tải ảnh đại diện</span>
                    <span className="text-xs text-gray-400">Click để chọn</span>
                  </>
                )}
                <input
                  id="mainImageInput"
                  ref={mainImageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={isUploadingMain}
                  onChange={handleMainImageUpload}
                />
              </label>

              {/* Preview */}
              {images[0]?.src && (
                <div className="relative group w-36 h-36 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src={images[0].src}
                    alt="Ảnh đại diện"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImages(prev => { const n = [...prev]; n[0] = { ...n[0], src: '' }; return n; })}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-400">Ảnh này sẽ là ảnh đại diện của dự án. Khuyến nghị: 16:9, tối thiểu 800x450px.</p>
          </div>

          {/* Gallery Images Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ảnh bổ sung (Gallery)
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Có thể chọn nhiều ảnh cùng lúc. Sau khi tải lên, bạn có thể chỉnh tỷ lệ từng ảnh.
            </p>

            {/* Upload multiple button */}
            <label
              htmlFor="galleryInput"
              className={`inline-flex items-center gap-2 px-4 py-2.5 border-2 border-dashed rounded-xl cursor-pointer transition-colors mb-4 ${
                isUploadingGallery
                  ? 'border-blue-300 bg-blue-50 text-blue-500 cursor-not-allowed'
                  : 'border-gray-300 bg-gray-50 text-gray-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {isUploadingGallery ? (
                <><Loader2 size={18} className="animate-spin" /> Đang tải ảnh...</>
              ) : (
                <><ImageIcon size={18} /> Chọn ảnh gallery (nhiều ảnh)</>
              )}
              <input
                id="galleryInput"
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                disabled={isUploadingGallery}
                onChange={handleGalleryUpload}
              />
            </label>

            {/* Gallery list */}
            {images.slice(1).map((img, index) => (
              <div key={index + 1} className="grid grid-cols-1 xl:grid-cols-12 gap-3 mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100 items-center">
                {/* Preview */}
                <div className="xl:col-span-2 flex justify-center">
                  {img.src ? (
                    <div className={`relative border border-gray-300 rounded-lg overflow-hidden ${
                      img.aspectRatio === 'square' ? 'w-16 h-16' :
                      img.aspectRatio === 'portrait' ? 'w-12 h-16' :
                      img.aspectRatio === 'landscape-3-4' ? 'w-16 h-12' :
                      'w-24 h-14'
                    }`}>
                      <Image src={img.src} alt={`Gallery ${index + 2}`} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <ImageIcon size={20} className="text-gray-400" />
                    </div>
                  )}
                </div>

                {/* URL hiển thị (readonly) */}
                <div className="xl:col-span-4">
                  <input
                    type="text"
                    value={img.src}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 text-sm truncate"
                    placeholder="URL ảnh sau khi upload"
                  />
                </div>

                {/* Width x Height */}
                <div className="xl:col-span-2 flex items-center gap-2">
                  <input
                    type="number"
                    value={img.width || 16}
                    onChange={(e) => handleWidthChange(index + 1, e.target.value)}
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    min="1"
                  />
                  <span className="text-gray-400 text-sm">x</span>
                  <input
                    type="number"
                    value={img.height || 9}
                    onChange={(e) => handleHeightChange(index + 1, e.target.value)}
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    min="1"
                  />
                </div>

                {/* Aspect ratio */}
                <div className="xl:col-span-3">
                  <select
                    value={img.aspectRatio || 'landscape'}
                    onChange={(e) => handleAspectRatioChange(index + 1, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="landscape">Ngang (16:9)</option>
                    <option value="landscape-3-4">Ngang (4:3)</option>
                    <option value="square">Vuông (1:1)</option>
                    <option value="portrait">Dọc (3:4)</option>
                  </select>
                </div>

                {/* Remove */}
                <div className="xl:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index + 1)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description & Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Nội dung</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả ngắn <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Mô tả ngắn gọn về dự án..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tổng quan <span className="text-red-500">*</span>
            </label>
            <Editor
              content={formData.overview}
              onChange={(content) => setFormData(prev => ({ ...prev, overview: content }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (phân cách bằng dấu phẩy)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Hiện đại, Nghỉ dưỡng, View biển"
            />
          </div>
        </div>

        {/* 3D Model */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Mô hình 3D</h3>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="has3D"
                checked={formData.has3D}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Có mô hình 3D</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Dự án nổi bật</span>
            </label>
          </div>

          {formData.has3D && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link mô hình 3D
              </label>
              <input
                type="text"
                name="model3D"
                value={formData.model3D}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://sketchfab.com/models/..."
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang xử lý...' : (isEditMode ? 'Cập nhật dự án' : 'Thêm dự án')}
          </button>
        </div>
      </form>
    </div>
  );
}
