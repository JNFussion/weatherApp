module.exports = {
  purge: {
    enabled: true,
    content: ["./src/index.html", "./src/main.css"],
    safelist: [
      "bg-clear",
      "bg-few-clouds",
      "bg-scattered-clouds",
      "bg-clouds",
      "bg-shower",
      "bg-rain",
      "bg-thunderstorm",
      "bg-snow",
      "bg-mist",
    ],
    options: {
      keyframes: true,
      fontFace: true,
      variables: true,
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
      ghostWhite: {
        dark: "#D7C9D7",
        DEFAULT: "#F4F0F4",
      },
      fluorescentBlue: "#78F2EA",
      gainsboro: "#D8D9DF",
    },
    extend: {
      backgroundImage: {
        wave: "url(../images/wave-full-screen.svg)",
        wavesplit: "url(../images/wave-mobile.svg)",
        clear: "url(../images/Shiny Overlay.svg)",
        "few-clouds": "url(../images/fewClouds.svg)",
        "scattered-clouds": "url(../images/scatteredClouds.svg)",
        clouds: "url(../images/Cloudy.svg)",
        shower: "url(../images/Meteor.svg)",
        rain: "url(../images/Sprinkle.svg)",
        thunderstorm: "url(../images/thunderstorm.svg)",
        snow: "url(../images/Snow.svg)",
        mist: "url(../images/mist-haikei.svg)",
      },
      backgroundPosition: {
        "bottom-50-right": "bottom 50px right",
      },
      gridRowEnd: {
        full: "-1",
      },
      gridTemplateColumns: {
        results: "repeat(auto-fill, minmax(300px, 1fr))",
      },
      gridTemplateRows: {
        "1fr-2fr-1fr-1fr": "1fr 2fr 1fr 1fr",
      },
      gridAutoRows: {
        results: "minmax(250px, auto)",
      },
      fontFamily: {
        poppins: [
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      fontSize: {
        "stacked-icons": "3.5em",
        "8xl-1/2": "6.5em",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
