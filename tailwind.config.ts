import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-instrument-sans)", "sans-serif"],
      },
      colors: {
        ink: "rgb(26, 26, 26)",
        grey: "rgb(153, 153, 153)",
        "dark-grey": "rgb(102, 102, 102)",
        "light-grey": "rgb(204, 204, 204)",
        "warm-white": "rgb(245, 244, 240)",
        accent: "#2987d9",
      },
      borderRadius: {
        card: "16px",
        inner: "12px",
      },
      spacing: {
        section: "96px",
      },
    },
  },
  plugins: [],
}

export default config
