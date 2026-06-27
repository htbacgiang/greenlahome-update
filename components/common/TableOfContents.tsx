import React, { useState } from "react";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!headings || headings.length === 0) return null;

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset for sticky navbar if needed
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

      // Update hash in URL
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-gray-200/60 dark:border-gray-700/60 p-5 my-6 transition-all duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-gray-200/60 dark:border-gray-700/60">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-700 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="font-bold text-gray-800 dark:text-gray-200 text-base">
            Mục lục bài viết
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-semibold text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition focus:outline-none px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {isOpen ? "[ Ẩn ]" : "[ Hiện ]"}
        </button>
      </div>

      {isOpen && (
        <nav className="mt-4 space-y-2">
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 1.25}rem` }}
                className="transition-all duration-200"
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleScroll(e, heading.id)}
                  className={`inline-block hover:text-green-700 dark:hover:text-green-400 transition-colors text-sm ${heading.level === 2
                      ? "font-semibold text-gray-800 dark:text-gray-200"
                      : "text-gray-600 dark:text-gray-400 pl-2 border-l border-gray-300 dark:border-gray-600"
                    }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default TableOfContents;
