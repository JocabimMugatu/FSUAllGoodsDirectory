import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        fsu: {
          garnet: "#782F40",
          gold: "#CEB888",
          charcoal: "#212121",
          sand: "#F7F3E3",
          sky: "#6DAEDB",
        },
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["Source Sans 3", "sans-serif"],
      },
      boxShadow: {
        "fsu-card": "0 10px 25px -15px rgba(33, 33, 33, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
