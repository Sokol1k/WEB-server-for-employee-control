import validator from 'validator'

const isLogin = (login) => {
  if (login) {

    if (!validator.isLength(login, { min: 2, max: undefined })) {
      return 'Login must be longer than 2 symbols!'
    }

    if (!validator.isLength(login, { min: undefined, max: 255 })) {
      return 'Login must be shorter than 255 symbols!'
    }

  } else {

    return 'Login is not entered!'

  }
}

const isPassword = (password) => {
  if (password) {

    if (!validator.isLength(password, { min: 6, max: undefined })) {
      return "Password must be longer than 6 symbols"
    }

    if (!validator.isLength(password, { min: undefined, max: 255 })) {
      return "Password must be shorter than 255 symbols"
    }

  } else {

    return 'Password is not entered'

  }
}

const isEmail = (email) => {
  if (email) {

    if (!validator.isEmail(email)) {
      return "Email is incorrect"
    }

  } else {

    return 'Email is not entered'

  }
}

const registerValidator = ({ login, email, password, confirmPassword }) => {
  let result = {};

  if (isLogin(login)) {
    result.login = isLogin(login);
  }

  if (isEmail(email)) {
    result.email = isEmail(email);
  }

  if (isPassword(password)) {
    result.password = isPassword(password);
  }

  if (password !== confirmPassword) {
    console.log(password)
    console.log(confirmPassword)
    result.confirmPassword = 'Password does not match';
  }

  return result;
}

export default registerValidator