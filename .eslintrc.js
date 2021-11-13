module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    //https://stackoverflow.com/questions/53516594/why-do-i-keep-getting-delete-cr-prettier-prettier
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      },
    ],
  },
};
