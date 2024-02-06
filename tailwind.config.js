/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ABN AMRO colors
        primary: '#004c4c',
        secondary: '#00716b',
        accent: '#ffd200',

        // SHARP colors
        'sharp-primary': '#009286',
        'sharp-secondary': '#005e5d',
        'sharp-success': '#1fc364',
        'sharp-warning': '#f0b502',
        'sharp-danger': '#ff2219',
        'sharp-body-bg': '#f2f9f9',
        'sharp-navbar-bg': '#004c4c',
        'sharp-navbar-front': '#f3c000',
        'sharp-navbar-inactive': '#bbbec3',
        'sharp-modal-backdrop': '#004c4c',
        'sharp-text-color': '#000000',
        'sharp-text-accent-color': '#000e0d',
        'sharp-heading-color': '#004c4c',
        'sharp-subheading-color': '#f3c000',
        'sharp-button-primary-bg': '#f3c000',
        'sharp-button-primary-bg-focus': '#f1b328',
        'sharp-button-primary-front': '#1d2124',
        'sharp-button-secondary-border-color': '#005e5d',
        'sharp-button-secondary-border-color-focus': '#009286',
        'sharp-button-secondary-text': '#005e5d',
        'sharp-button-secondary-text-focus': '#009286',
        'sharp-button-tertiary-bg': '#009286',
        'sharp-button-tertiary-bg-focus': '#005e5d',
      },
    },
  },
  plugins: [],
};
