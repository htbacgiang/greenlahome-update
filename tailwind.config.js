/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blink: "blink 1.5s infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { backgroundColor: "#EAD5B0" }, // màu kem vàng
          "50%": { backgroundColor: "#f97316" }, // màu đỏ cam
        },
      },
      fontFamily: {
        heading: ["var(--ltn__heading-font)", "sans-serif"], // Sử dụng font Rajdhani
      },
      colors: {
        "primary-dark": "#1f1f1f",
        primary: "#ffffff",
        highlight: {
          dark: "#FFFFFF",
          light: "#1f1f1f",
        },
        secondary: {
          dark: "#707070",
          light: "#e6e6e6",
        },
        action: "#EAD5B0",
        // Brand color palette
        brand: {
          50:  "#FBF6ED",
          100: "#F3E8D0",
          200: "#EAD5B0",
          300: "#D4BA95",
          400: "#C4A882",
          500: "#B89468",
          600: "#A0845A",
          700: "#8B6A3A",
          800: "#6E5230",
          900: "#4A3720",
        },
      },
      transitionProperty: {
        width: "width",
      },
      // Thêm textShadow để tạo hiệu ứng phát sáng
      textShadow: {
        glow: "0 0 4px rgba(234, 213, 176, 0.8)", // Hiệu ứng phát sáng màu kem vàng
      },
      colors: {
        'q8-primary': {
          '50': '#F9F9F9',
          '100': '#F9F9F9',
          '200': '#F9F9F9',
          '300': '#F9F9F9',
          '400': '#F9F9F9',
          '500': '#B0B5B8',
          '600': '#878E92',
          '700': '#5E676B',
          '800': '#5E676B',
          '900': '#121212',
        },
      },
    },
    backgroundImage: {
      "png-pattern": "url('/empty-bg.jpg')",
      "gradient-to-b": "linear-gradient(to bottom, #EAD5B0, #C4A882)", // Gradient kem vàng
    },
    
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
    // Thêm plugin để sử dụng text-shadow
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-glow": {
          textShadow: "0 0 4px rgba(234, 213, 176, 0.8)",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
