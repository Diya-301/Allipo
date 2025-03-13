/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/**/*.{html,js,jsx,ts,tsx}',
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    extend: {
      colors: {
        russian_violet: "#100D39",
        baby_powder: "#F4F5EE",
        true_blue: "#3164C4",
        timber_wolf: "#E6E0D8",
        fuscous_gray : "#474743",
        gray_nickel : "#BFC0BB",
        primary: "#FFFFFF",
        secondary: "#000000",
      },
      fontFamily: {
        poppins: ['Poppins'],
      },
      boxShadow: {
        'custom': '10px 10px 20px rgba(0, 0, 0, 0.5)', // shadow-custom
      },
  },
},
variants: {
  extend: {
    transform: ['hover'],
    scale: ['hover'],
  },
},
  plugins: [],
}
