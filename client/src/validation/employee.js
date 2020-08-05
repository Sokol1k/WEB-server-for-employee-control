import validator from 'validator'
import moment from 'moment'

const isName = (name) => {
  if (name) {

    if (!validator.isLength(name, { min: 2, max: undefined })) {
      return 'Name must be longer than 2 symbols!'
    }

    if (!validator.isLength(name, { min: undefined, max: 255 })) {
      return 'Name must be shorter than 255 symbols!'
    }

  } else {

    return 'Name is not entered!'

  }
}

const isSurname = (surname) => {
  if (surname) {

    if (!validator.isLength(surname, { min: 2, max: undefined })) {
      return 'Surname must be longer than 2 symbols!'
    }

    if (!validator.isLength(surname, { min: undefined, max: 255 })) {
      return 'Surname must be shorter than 255 symbols!'
    }

  } else {

    return 'Surname is not entered!'

  }
}

const isPatronymic = (patronymic) => {
  if (patronymic) {

    if (!validator.isLength(patronymic, { min: 2, max: undefined })) {
      return 'Patronymic must be longer than 2 symbols!'
    }

    if (!validator.isLength(patronymic, { min: undefined, max: 255 })) {
      return 'Patronymic must be shorter than 255 symbols!'
    }

  } else {

    return 'Patronymic is not entered!'

  }
}

const isGender = (gender) => {
  if (!gender) {

    return 'Gender is not entered!'

  }
}

const isContact = (contact) => {
  if (contact) {

    if (!validator.isMobilePhone(contact)) {
      return 'Contact is not a phone number!'
    }

  } else {

    return 'Contact is not entered!'

  }
}

const isBirthday = (birthday) => {
  if (birthday) {

    if (!validator.isDate(birthday)) {
      return 'Birthday is not a date!'
    }

    if (moment(birthday).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')) {
      return 'The date should not be greater than the current date!'
    }

  } else {

    return 'Birthday is not entered!'

  }
}

const isPosition = (position) => {
  if (position) {

    if (!validator.isLength(position, { min: 2, max: undefined })) {
      return 'Position must be longer than 2 symbols!'
    }

    if (!validator.isLength(position, { min: undefined, max: 255 })) {
      return 'Position must be shorter than 255 symbols!'
    }

  } else {

    return 'Position is not entered!'

  }
}

const isSalary = (salary) => {
  if (!salary) {

    return 'Salary is not entered!'

  } 
}

const employeeValidator = ({
  name,
  surname,
  patronymic,
  gender,
  contact,
  birthday,
  position,
  salary }) => {

  const result = {}

  if (isName(name)) {
    result.name = isName(name)
  }

  if (isSurname(surname)) {
    result.surname = isSurname(surname)
  }

  if (isPatronymic(patronymic)) {
    result.patronymic = isPatronymic(patronymic)
  }

  if (isGender(gender)) {
    result.gender = isGender(gender)
  }

  if (isContact(contact)) {
    result.contact = isContact(contact)
  }

  if (isBirthday(birthday)) {
    result.birthday = isBirthday(birthday)
  }

  if (isPosition(position)) {
    result.position = isPosition(position)
  }

  if (isSalary(salary)) {
    result.salary = isSalary(salary)
  } 

  return result

}

export default employeeValidator