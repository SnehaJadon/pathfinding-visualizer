/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        traversed: {
          "0%": {
            transform: "scale(0.3)",
            backgroundColor: "#b92c28",
            borderRadius: "100%",
          },
          "50%": {
            backgroundColor: "#8c3b51",
          },
          "75%": {
            transform: "scale(1.2)",
            backgroundColor: "#594d81",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "#1d62b8",
          },
        },
        path: {
          "0%": {
            transform: "scale(0.3)",
            backgroundColor: "#e11d48bf",
            borderRadius: "100%",
          },
          "50%": {
            backgroundColor: "#ea580cbf",
          },
          "75%": {
            transform: "scale(1.2)",
            backgroundColor: "#fb923cbf",
          },
          "90%": {
            transform: "scale(0.8)",
            backgroundColor: "#fde68a",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        wall: {
          "0%": {
            backgroundColor: "black",
            transform: "scale(0.7)",
          },
          "30%":{
            backgroundColor: "white",
          },
          "100%": {
            backgroundColor: "white",
            transform: "scale(1)",
          },
        },
        fade: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        traversed: "traversed 0.5s cubic-bezier(0, 0, 0.2, 1)",
        path: "path 1.5s cubic-bezier(0, 0, 0.2, 1)",
        wall: "wall 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        fade: "fade 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
