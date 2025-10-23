/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme colors from globals.css
        background: "#2f2e41",
        foreground: "#ffffff",
        primary: "#009edd",
        "primary-hover": "#0073A1",
        success: "#039b00",
        "success-hover": "#028500",
        dark: "#2f2e41",
        "text-primary": "#333333",
        "text-secondary": "#999999",
        white: "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-open-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "4px",
        sm: "4px",
        md: "4px",
        lg: "4px",
      },
    },
  },
  plugins: [],
};
