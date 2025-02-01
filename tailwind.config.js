/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A192F",      // Deep space blue
        secondary: "#64FFDA",    // Cyan accent
        tertiary: "#8892B0",     // Muted blue
        textPrimary: "#CCD6F6",  // Light blue text
        textSecondary: "#8892B0", // Muted blue text
        darkGray: "#112240",     // Darker blue
        lightGray: "#233554",    // Lighter blue
        lightNavy: "#112240",    // Card background
        lightestNavy: "#1E3A8A"  // Border color
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    }
  },
  plugins: [],
}