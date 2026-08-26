import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.jsx",
  ],

  theme: {
    extend: {
      colors: {
        "on-secondary": "#ffffff",
        "on-secondary-fixed-variant": "#1d5129",
        "on-primary": "#ffffff",

        "tertiary-container": "#a36700",
        "on-primary-fixed-variant": "#7e2b16",
        "on-surface": "#1d1928",

        "surface-container-low": "#f8f1ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#ede5f9",
        "surface-container-highest": "#e7dff3",
        "surface-container": "#f3eaff",

        tertiary: "#825100",
        "secondary-fixed-dim": "#9cd4a0",
        "on-tertiary-fixed": "#2a1700",
        "tertiary-fixed-dim": "#ffb95f",

        "outline-variant": "#dcc0ba",
        outline: "#89726c",

        "inverse-surface": "#322e3d",
        "inverse-on-surface": "#f5eeff",

        "on-error": "#ffffff",
        "tertiary-fixed": "#ffddb8",
        "surface-variant": "#e7dff3",

        primary: "#9a4028",
        surface: "#fdf7ff",
        "surface-bright": "#fdf7ff",
        "primary-container": "#b9573e",

        "on-secondary-fixed": "#002109",
        "inverse-primary": "#ffb4a2",

        "error-container": "#ffdad6",

        secondary: "#36693e",

        "on-tertiary-fixed-variant": "#653e00",
        "surface-tint": "#9d422b",
        "on-error-container": "#93000a",

        "on-tertiary": "#ffffff",
        "on-background": "#1d1928",
        "on-primary-container": "#fffbff",

        "primary-fixed-dim": "#ffb4a2",
        "on-surface-variant": "#56423d",
        error: "#ba1a1a",

        background: "#fdf7ff",

        "on-secondary-container": "#3c6f44",
        "on-primary-fixed": "#3c0800",

        "secondary-fixed": "#b7f1ba",
        "surface-dim": "#ded7eb",
        "primary-fixed": "#ffdbd2",
        "on-tertiary-container": "#fffbff",
        "secondary-container": "#b7f1ba",
      },

      spacing: {
        base: "8px",
        gutter: "16px",
        xs: "4px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "margin-mobile": "20px",
        "margin-tablet": "40px",
      },

      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],

        "label-lg": ["Montserrat"],
        "label-sm": ["Montserrat"],
        "body-lg": ["Montserrat"],
        "body-md": ["Montserrat"],

        "headline-lg-mobile": ["Bricolage Grotesque"],
        "headline-lg": ["Bricolage Grotesque"],
        "headline-md": ["Bricolage Grotesque"],
        "display-lg": ["Bricolage Grotesque"],
      },

      fontSize: {
        "label-lg": [
          "14px",
          {
            lineHeight: "20px",
            letterSpacing: "0.05em",
            fontWeight: "600",
          },
        ],

        "label-sm": [
          "12px",
          {
            lineHeight: "16px",
            fontWeight: "500",
          },
        ],

        "body-lg": [
          "18px",
          {
            lineHeight: "28px",
            fontWeight: "400",
          },
        ],

        "body-md": [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "400",
          },
        ],

        "headline-lg-mobile": [
          "28px",
          {
            lineHeight: "36px",
            fontWeight: "700",
          },
        ],

        "headline-lg": [
          "32px",
          {
            lineHeight: "40px",
            fontWeight: "700",
          },
        ],

        "headline-md": [
          "24px",
          {
            lineHeight: "32px",
            fontWeight: "600",
          },
        ],

        "display-lg": [
          "40px",
          {
            lineHeight: "48px",
            letterSpacing: "-0.02em",
            fontWeight: "800",
          },
        ],
      },
    },
  },

  plugins: [forms],
};
