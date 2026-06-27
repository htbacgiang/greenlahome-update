export default function BlogHero() {
  return (
    <header className="pt-10" role="banner">
      <div className="container mx-auto px-4 text-left">

        <div className="flex items-center justify-start gap-2 text-[#C4A882] text-sm font-bold uppercase mb-2">
          <h2 className="inline-flex items-center gap-1">
            Tin tức & Kiến thức
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </h2>
        </div>

        <p className="text-xl font-bold text-gray-900 leading-tight tracking-tight">
          Tin tức công ty &amp;
          <span className="text-[#EAD5B0]"> Cảm hứng thiết kế</span>
        </p>

      </div>
    </header>
  );
}