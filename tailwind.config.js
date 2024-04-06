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
        'app-primary': '#009286',
        'app-secondary': '#005e5d',
        'app-success': '#1fc364',
        'app-warning': '#f0b502',
        'app-danger': '#ff2219',
        'app-body-bg': '#f2f9f9',
        'app-navbar-bg': '#004c4c',
        'app-navbar-front': '#f3c000',
        'app-navbar-inactive': '#bbbec3',
        'app-modal-backdrop': '#004c4c',
        'app-text-color': '#000000',
        'app-text-accent-color': '#000e0d',
        'app-heading-color': '#004c4c',
        'app-subheading-color': '#f3c000',
        'app-button-primary-bg': '#f3c000',
        'app-button-primary-focus': '#f1b328',
        'app-button-primary-front': '#1d2124',
        'app-button-secondary-border-color': '#005e5d',
        'app-button-secondary-border-color-focus': '#009286',
        'app-button-secondary-text': '#005e5d',
        'app-button-secondary-text-focus': '#009286',
        'app-button-danger-bg': '#fc6142',
        'app-button-danger-bg-focus': '#c24229',
        'app-button-tertiary-bg': '#009286',
        'app-button-tertiary-bg-focus': '#005e5d',
        'app-button-disabled-bg': '#d0d0d0',
        'app-button-disabled-text': '#ffffff',
      },
    },
  },
  plugins: [
  
],
};
