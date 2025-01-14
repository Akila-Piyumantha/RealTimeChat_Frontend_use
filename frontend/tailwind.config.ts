import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F1B4B4",
        secondary: "#FFDCDC",
        accent: "#1F417F",
        background: "#E2E7EF",
        text: "#132043",
        brown: "#271300",
        orange: "#FC7B54",
        lightYellow: "#FFF8F3",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        body: ["var(--font-montserrat)", "sans-serif"],
        merriweather: ["var(--font-merriweather)", "serif"],
        montez: ["var(--font-montez)", "cursive"],
        title: ["var(--font-outfit)", "cursive"],
        marck: ["var(--font-marck-script)", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
