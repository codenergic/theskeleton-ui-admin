module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/recommended",
    // "plugin:prettier/recommended"
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  rules: {
    "no-console": "off",
    // "prettier/prettier": ["error", { "semi": false, "singleQuote": true }],
    "quotes": ["error", "single"],
    "semi": [2, "never"],
    "space-before-function-paren": ["error", "always"],
    "vue/component-name-in-template-casing": ["warn", "kebab-case"],
    "vue/html-indent": "off",
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "off",
    "vue/order-in-components": "off",
    "vue/require-default-prop": "off",
    "vue/require-prop-types": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/use-v-on-exact": "off",
  }
}
