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

const loginValidator = ({ login, password }) => {
  let result = {}

  if (isLogin(login)) {
    result.login = isLogin(login);
  }

  if (isPassword(password)) {
    result.password = isPassword(password)
  }

  return result
}

export default loginValidator