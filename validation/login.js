const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Невірно введено Email";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email має бути заповненним";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Невірно введено пароль";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
