module.exports = {
  purge: {
    enabled: true,
    content: ["./src/index.html", "./src/main.css"],
    options: {
      keyframes: true,
      fontFace: true,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      skobeloff: "#006466",
      midnightGreenEagleGreen: {
        light: "#065A60",
        DEFAULT: "#0B525B",
        dark: "#144552",
      },
      charcoal: "#1B3A4B",
      prussianBlue: "#212F45",
      spaceCadet: "#272640",
      darkPurle: "#312244",
      russianViolet: {
        DEFAULT: "#3E1F47",
        light: "#4D194D",
        dark: "#311939",
      },
      ghostWhite: "#F4F0F4",
      fluorescentBlue: "#78F2EA",
    },
    extend: {
      backgroundImage: {
        wave: "url(./wave-full-screen.svg)",
        wavesplit: "url(./wave-mobile.svg)",
      },
      backgroundPosition: {
        "bottom-50-right": "bottom 50px right",
      },
      gridRowEnd: {
        full: "-1",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
