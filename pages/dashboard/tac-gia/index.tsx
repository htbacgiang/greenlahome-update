import { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminLayout from "../../../components/layout/AdminLayout";
import Heading from "../../../components/backend/Heading";
import Image from "next/image";
import slugify from "slugify";

interface Author {
  _id: string;
  name: string;
  role: string;
  biography: string;
  slug: string;
  avatar?: {
    url: string;
    public_id?: string;
  };
  createdAt: string;
}

const AuthorManagement: NextPage = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [biography, setBiography] = useState("");
  const [slug, setSlug] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/authors");
      setAuthors(data.authors || []);
    } catch (err: any) {
      toast.error("Không thể tải danh sách tác giả");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Sync slug with name if not editing an existing slug manually
  useEffect(() => {
    if (!editingAuthor && name) {
      setSlug(slugify(name.toLowerCase(), { strict: true }));
    }
  }, [name, editingAuthor]);

  const handleOpenCreate = () => {
    setEditingAuthor(null);
    setName("");
    setRole("");
    setBiography("");
    setSlug("");
    setAvatarUrl("");
    setShowFormModal(true);
  };

  const handleOpenEdit = (author: Author) => {
    setEditingAuthor(author);
    setName(author.name);
    setRole(author.role || "");
    setBiography(author.biography || "");
    setSlug(author.slug || "");
    setAvatarUrl(author.avatar?.url || "");
    setShowFormModal(true);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post("/api/image", formData);
      setAvatarUrl(data.src);
      toast.success("Tải ảnh lên thành công!");
    } catch (error: any) {
      toast.error("Lỗi tải ảnh lên: " + (error.response?.data?.error || error.message));
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Tên tác giả không được để trống");
      return;
    }

    const payload = {
      name: name.trim(),
      role: role.trim(),
      biography: biography.trim(),
      slug: slug.trim(),
      avatar: { url: avatarUrl },
    };

    try {
      if (editingAuthor) {
        // Update
        const { data } = await axios.put(`/api/authors/${editingAuthor._id}`, payload);
        toast.success(data.message || "Cập nhật tác giả thành công!");
      } else {
        // Create
        const { data } = await axios.post("/api/authors", payload);
        toast.success(data.message || "Tạo tác giả thành công!");
      }
      setShowFormModal(false);
      fetchAuthors();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Có lỗi xảy ra");
    }
  };

  const handleDelete = async (authorId: string, authorName: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa tác giả "${authorName}" không?`)) {
      return;
    }

    try {
      await axios.delete(`/api/authors/${authorId}`);
      toast.success("Xóa tác giả thành công!");
      fetchAuthors();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Không thể xóa tác giả");
    }
  };

  return (
    <AdminLayout title="Quản lý Tác giả - GreenlaHome">
      <div className="p-6 min-h-screen bg-gray-50 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý Tác giả</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Quản lý danh sách tác giả cho các bài viết chuẩn SEO của GreenlaHome
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition duration-150 text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Thêm tác giả
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400 font-medium">Đang tải danh sách tác giả...</span>
          </div>
        ) : authors.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Chưa có tác giả nào</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
              Bắt đầu tạo hồ sơ tác giả để gán bản quyền cho các bài viết chia sẻ kiến thức của bạn.
            </p>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm shadow transition"
            >
              Thêm tác giả đầu tiên
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
              <div
                key={author._id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition duration-200 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700 bg-gray-50 shrink-0">
                      {author.avatar?.url ? (
                        <Image
                          src={author.avatar.url}
                          alt={author.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-green-600 flex items-center justify-center text-white text-xl font-bold">
                          {author.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                        {author.name}
                      </h3>
                      <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider truncate">
                        {author.role || "Tác giả"}
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono truncate">
                        slug: {author.slug}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 italic">
                    {author.biography || "Chưa có tiểu sử tóm tắt."}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-gray-50 dark:border-gray-700 pt-3">
                  <button
                    onClick={() => handleOpenEdit(author)}
                    className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => handleDelete(author._id, author.name)}
                    className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal Form */}
        {showFormModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-lg w-full overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {editingAuthor ? "Cập nhật tác giả" : "Thêm tác giả mới"}
                </h3>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Avatar Upload */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
                    {avatarUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Ảnh đại diện
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        id="avatar-upload"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                      <label
                        htmlFor="avatar-upload"
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-xs font-medium cursor-pointer transition"
                      >
                        {uploadingAvatar ? "Đang tải lên..." : "Chọn ảnh"}
                      </label>
                      {avatarUrl && (
                        <button
                          type="button"
                          onClick={() => setAvatarUrl("")}
                          className="text-xs text-red-500 hover:underline font-medium"
                        >
                          Xóa ảnh
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Vai trò / Chức danh
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ví dụ: KTS Trưởng, Chuyên gia Phong thủy"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="nguyen-van-a"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>

                {/* Biography */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Tiểu sử tóm tắt
                  </label>
                  <textarea
                    rows={4}
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                    placeholder="Mô tả tóm tắt về kinh nghiệm, chuyên môn hoặc học vấn của tác giả..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  ></textarea>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium transition"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    disabled={uploadingAvatar}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium shadow-sm transition disabled:opacity-55"
                  >
                    {editingAuthor ? "Cập nhật" : "Lưu lại"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AuthorManagement;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session || !session.user || (session.user as { role?: string }).role !== "admin") {
    return {
      redirect: { destination: "/dang-nhap", permanent: false },
    };
  }

  return { props: {} };
}
