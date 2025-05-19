module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "strength-weak": "#ff4d4f",
        "strength-fair": "#faad14",
        "strength-good": "#52c41a",
        "strength-strong": "#1890ff",
        "strength-empty": "#d9d9d9",
      },
    },
  },
  plugins: [],
  // This makes TailwindCSS's classes available for the component library
  corePlugins: {
    preflight: false,
  },
  // Prefix all classes to avoid conflicts when users integrate the component
  prefix: "pw-",
  // This allows users to opt-out of our styles
  important: true,
};
