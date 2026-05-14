import { FC, useState } from "react";
import { POST_CATEGORIES } from "../../utils/postCategories";

interface Props {
  onCategorySelect: (category: string | null) => void; // Hàm xử lý khi danh mục được chọn
}

const MainCategories: FC<Props> = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
    onCategorySelect(category);
  };

  const categories = [
    { key: null, label: "Tất cả" },
    ...POST_CATEGORIES.map(cat => ({ key: cat, label: cat }))
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-8xl">
        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-2">
          {categories.map((category) => (
            <button
              key={category.key || 'all'}
              onClick={() => handleCategoryClick(category.key)}
              className={`px-3 md:px-5 py-3 rounded-full font-medium transition-all duration-300 border
              ${activeCategory === category.key
                  ? "bg-green-700 text-white border-green-700 hover:bg-transparent hover:text-green-700"
                  : "bg-transparent text-gray-600 border-gray-200 hover:bg-transparent hover:text-green-700 hover:border-green-700"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCategories;