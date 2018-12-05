//import validator
import equals from "validator/lib/equals";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import isLength from "validator/lib/isLength";

//Helps
import isEmptyHelp from "../helps/is-empty";

const validateRegisterInput = ({
  name,
  password,
  email,
  passwordConfirmation
}) => {
  let errors = {};

  name = !isEmptyHelp(name) ? name : "";
  email = !isEmptyHelp(email) ? email : "";
  password = !isEmptyHelp(password) ? password : "";
  passwordConfirmation = !isEmptyHelp(passwordConfirmation)
    ? passwordConfirmation
    : "";

  if (!isLength(name, { min: 3, max: 50 })) {
    errors.name = "O nome do usuário precisa ter entre 3 a 50 caracters";
  }

  if (isEmpty(email)) {
    errors.email = "O campo email é obrigatório";
  }

  if (!isEmail(email)) {
    errors.email = "email precisa ser válido";
  }

  if (isEmpty(password)) {
    errors.password = "O campo password é obrigatório";
  }

  if (!isLength(password, { min: 6, max: 20 })) {
    errors.password = "O password precisa ter entre 6 a 20 caracters";
  }

  if (equals(password, passwordConfirmation)) {
    errors.password = "O valor da senha esta diferente da confirmação de senha";
  }

  return {
    errors,
    isValid: isEmptyHelp(errors)
  };
};

export default validateRegisterInput;
