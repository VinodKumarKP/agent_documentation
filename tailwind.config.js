/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // Important: Keep this false so Docusaurus doesn't break!
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./docs/**/*.{md,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
