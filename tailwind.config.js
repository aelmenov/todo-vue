import formsPlugin from '@tailwindcss/forms'

export default {
  content: [
    "./index.html",
    "./src/**/*.vue",
  ],
  theme: {
    fontFamily: {
      'sans': ['"PT Sans"', 'Helvetica', 'Arial', 'sans-serif']
    }
  },
  plugins: [formsPlugin],
}