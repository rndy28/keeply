/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      "2md": "850px",
      "3md": "950px",
      lg: "1024px",
      "2lg": "1200px",
      "3lg": "1300px",
      xl: "1400px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        // eslint-disable-next-line quotes
        quicksand: ['"Quicksand"', "sans-seriff"],
      },
      height: {
        inherit: "inherit",
      },
      width: {
        inherit: "inherit",
      },
      colors: {
        // references: https://www.nordtheme.com/docs/colors-and-palettes
        polarNight0: {
          100: "#eaebec",
          200: "#d5d6d9",
          300: "#c0c2c6",
          400: "#abaeb3",
          500: "#979aa0",
          600: "#82858c",
          700: "#6d7179",
          800: "#585d66",
          900: "#434853",
          DEFAULT: "#2E3440",
        },
        polarNight1: {
          100: "#ebecee",
          200: "#d8d9dc",
          300: "#c4c6cb",
          400: "#b1b3ba",
          500: "#9da1a9",
          600: "#898e97",
          700: "#767b86",
          800: "#626875",
          900: "#4f5563",
          DEFAULT: "#3B4252",
        },
        polarNight2: {
          100: "#ecedef",
          200: "#d9dbdf",
          300: "#c7c9cf",
          400: "#b4b7bf",
          500: "#a1a6af",
          600: "#8e949e",
          700: "#7b828e",
          800: "#69707e",
          900: "#565e6e",
          DEFAULT: "#434C5E",
        },
        polarNight3: {
          100: "#edeef0",
          200: "#dbdde1",
          300: "#c9ccd2",
          400: "#b7bbc3",
          500: "#a6abb5",
          600: "#949aa6",
          700: "#828997",
          800: "#707888",
          900: "#5e6779",
          DEFAULT: "#4C566A",
        },
        snowStorm0: {
          100: "#fbfcfd",
          200: "#f7f8fb",
          300: "#f3f5f8",
          400: "#eff2f6",
          500: "#eceff4",
          600: "#e8ebf2",
          700: "#e4e8f0",
          800: "#e0e5ed",
          900: "#dce1eb",
          DEFAULT: "#D8DEE9",
        },
        snowStorm1: {
          100: "#fcfdfe",
          200: "#fafbfc",
          300: "#f7f8fb",
          400: "#f5f6f9",
          500: "#f2f4f8",
          600: "#eff2f6",
          700: "#edf0f5",
          800: "#eaedf3",
          900: "#e8ebf2",
          DEFAULT: "#E5E9F0",
        },
        snowStorm2: {
          100: "#fdfdfe",
          200: "#fbfcfd",
          300: "#f9fafc",
          400: "#f7f9fb",
          500: "#f6f7fa",
          600: "#f4f5f8",
          700: "#f2f4f7",
          800: "#f0f2f6",
          900: "#eef1f5",
          DEFAULT: "#ECEFF4",
        },
        frost0: {
          100: "#f4f8f8",
          200: "#e9f2f1",
          300: "#ddebeb",
          400: "#d2e4e4",
          500: "#c7dedd",
          600: "#bcd7d6",
          700: "#b1d0cf",
          800: "#a5c9c9",
          900: "#9ac3c2",
          DEFAULT: "#8FBCBB",
        },
        frost1: {
          100: "#f3f9fa",
          200: "#e7f2f6",
          300: "#dbecf1",
          400: "#cfe6ec",
          500: "#c4e0e8",
          600: "#b8d9e3",
          700: "#acd3de",
          800: "#a0cdd9",
          900: "#94c6d5",
          DEFAULT: "#88C0D0",
        },
        frost2: {
          100: "#f2f6f9",
          200: "#e6ecf3",
          300: "#d9e3ec",
          400: "#cdd9e6",
          500: "#c0d0e0",
          600: "#b3c7da",
          700: "#a7bdd4",
          800: "#9ab4cd",
          900: "#8eaac7",
          DEFAULT: "#81A1C1",
        },
        frost3: {
          100: "#eff2f7",
          200: "#dfe6ee",
          300: "#cfd9e6",
          400: "#bfcdde",
          500: "#afc0d6",
          600: "#9eb3cd",
          700: "#8ea7c5",
          800: "#7e9abd",
          900: "#6e8eb4",
          DEFAULT: "#5E81AC",
        },
        aurora0: {
          100: "#f9eff0",
          200: "#f2dfe1",
          300: "#ecd0d2",
          400: "#e5c0c3",
          500: "#dfb0b5",
          600: "#d9a0a6",
          700: "#d29097",
          800: "#cc8188",
          900: "#c57179",
          DEFAULT: "#BF616A",
        },
        aurora1: {
          100: "#faf3f1",
          200: "#f6e7e2",
          300: "#f1dbd4",
          400: "#eccfc6",
          500: "#e8c3b8",
          600: "#e3b7a9",
          700: "#deab9b",
          800: "#d99f8d",
          900: "#d5937e",
          DEFAULT: "#D08770",
        },
        aurora2: {
          100: "#fdfaf3",
          200: "#fbf5e8",
          300: "#f9efdc",
          400: "#f7ead1",
          500: "#f5e5c5",
          600: "#f3e0b9",
          700: "#f1dbae",
          800: "#efd5a2",
          900: "#edd097",
          DEFAULT: "#EBCB8B",
        },
        aurora3: {
          100: "#f6f9f4",
          200: "#edf2e8",
          300: "#e3ecdd",
          400: "#dae5d1",
          500: "#d1dfc6",
          600: "#c8d8ba",
          700: "#bfd2af",
          800: "#b5cba3",
          900: "#acc598",
          DEFAULT: "#A3BE8C",
        },
        aurora4: {
          100: "#f8f4f7",
          200: "#f0e8ef",
          300: "#e9dde6",
          400: "#e1d2de",
          500: "#dac7d6",
          600: "#d2bbce",
          700: "#cbb0c6",
          800: "#c3a5bd",
          900: "#bc99b5",
          DEFAULT: "#B48EAD",
        },
      },
    },
  },
  plugins: [],
};
