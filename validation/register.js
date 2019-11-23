const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.name, { min: 15, max: 50 })) {
    errors.name = "ПІБ повинно містити від 15 до 50 символів";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "ПІБ повинно бути заповненним";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Невірно введено Email";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email має бути заповненним";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Невірно введено пароль";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Пароль повинен містити від 6 до 30 символів";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
