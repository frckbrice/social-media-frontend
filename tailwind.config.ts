import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        greenMessage: "#8EFD8E",
        themecolor: "#00a884",
        darkgreen: "#008069",
        primaryText: "#54656F",
        secondry: "#005c4b",
        // bgGray: "#dedfdd",
        bgGray: "#f0f2f5",
        chatGray: "#f0f2f5",
        yellow: "#ffeecd",
        myG: "#717d82",
        greenMgs: "#d9fdd3",

        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
      screens: {
        mobile: "0px",
        bigScreen: "1700px",
      },
    },
  },
  plugins: [],
};
export default config;
