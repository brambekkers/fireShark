module.exports = {
  rules: {

    'vue/no-deprecated-slot-attribute': ['off'],
    'linebreak-style': 'off',
    'import/extensions': [
      'error',
      {
        js: 'always',
        vue: 'always',
        scss: 'always',
        json: 'always',
      },
    ],
    'import/no-unresolved': 'off',
    'comma-dangle': 'off',
    'no-undef': 'off',
    'vue/html-self-closing': 'off',
    'vue/multi-word-component-names': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
  },
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-recommended',  '@vue/airbnb',],
};
