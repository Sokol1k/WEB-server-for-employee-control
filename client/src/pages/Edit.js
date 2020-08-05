import React, { useCallback, useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import employeeValidator from '../validation/employee'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { showAlert } from '../store/alert/actions'
import { loader } from '../store/loader/actions'
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import 'react-phone-input-2/lib/style.css'

function Edit(props) {

  const history = useHistory()

  const [update, setUpdate] = useState({
    name: '',
    surname: '',
    patronymic: '',
    gender: '',
    birthday: '',
    position: '',
    salary: ''
  })

  const [contact, setContact] = useState('')

  const employeeId = useParams().id

  const getEmpoyee = useCallback(async () => {

    try {

      const response = await axios({
        url: `/api/employee/${employeeId}`,
        method: "GET",
        headers: { 'Authorization': `Bearer ${props.token}` },
      })

      setUpdate({
        name: response.data.name,
        surname: response.data.surname,
        patronymic: response.data.patronymic,
        gender: response.data.gender,
        birthday: response.data.birthday,
        position: response.data.position,
        salary: response.data.salary
      })

      setContact(response.data.contact)

    } catch (err) {

      props.showAlert({
        type: 'danger',
        message: 'Something went wrong, please try again!',
        isShow: true,
      })

    }

  }, [setUpdate, setContact, props, employeeId])

  const [validation, setValidation] = useState({
    classNameInput: '',
    nameErrorMessage: null,

    classSurnameInput: '',
    surnameErrorMessage: null,

    classPatronymicInput: '',
    patronymicErrorMessage: null,

    classGenderInput: '',
    genderErrorMessage: null,

    classContactInput: '',
    contactErrorMessage: null,

    classBirthdayInput: '',
    birthdayErrorMessage: null,

    classPositionInput: '',
    positionErrorMessage: null,

    classSalaryInput: '',
    salaryErrorMessage: null,
  })

  const clearValid = () => {
    setValidation({
      classNameInput: '',
      nameErrorMessage: null,

      classSurnameInput: '',
      surnameErrorMessage: null,

      classPatronymicInput: '',
      patronymicErrorMessage: null,

      classGenderInput: '',
      genderErrorMessage: null,

      classContactInput: '',
      contactErrorMessage: null,

      classBirthdayInput: '',
      birthdayErrorMessage: null,

      classPositionInput: '',
      positionErrorMessage: null,

      classSalaryInput: '',
      salaryErrorMessage: null,
    })
  }

  const showNotValidData = (data) => {

    if (data.name) {

      setValidation((state) => ({
        ...state,
        classNameInput: 'is-invalid',
        nameErrorMessage: data.name,
      }))

    }

    if (data.surname) {

      setValidation((state) => ({
        ...state,
        classSurnameInput: 'is-invalid',
        surnameErrorMessage: data.surname,
      }))

    }

    if (data.patronymic) {

      setValidation((state) => ({
        ...state,
        classPatronymicInput: 'is-invalid',
        patronymicErrorMessage: data.patronymic,
      }))

    }

    if (data.gender) {

      setValidation((state) => ({
        ...state,
        classGenderInput: 'is-invalid',
        genderErrorMessage: data.gender,
      }))

    }

    if (data.contact) {

      setValidation((state) => ({
        ...state,
        classContactInput: 'is-invalid',
        contactErrorMessage: data.contact,
      }))

    }

    if (data.birthday) {

      setValidation((state) => ({
        ...state,
        classBirthdayInput: 'is-invalid',
        birthdayErrorMessage: data.birthday,
      }))

    }

    if (data.position) {

      setValidation((state) => ({
        ...state,
        classPositionInput: 'is-invalid',
        positionErrorMessage: data.position,
      }))

    }

    if (data.salary) {

      setValidation((state) => ({
        ...state,
        classSalaryInput: 'is-invalid',
        salaryErrorMessage: data.salary,
      }))

    }

  }

  const changeHandler = event => {
    setUpdate({
      ...update,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {

    event.preventDefault()

    props.loader(true)

    clearValid()

    const data = {
      ...update,
      contact
    }

    const isValid = employeeValidator(data)

    if (!Object.keys(isValid).length) {

      try {

        try {

          const response = await axios({
            url: `/api/employee/${employeeId}`,
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${props.token}` },
            data: data
          })

          props.showAlert({
            type: 'success',
            message: response.data.message,
            isShow: true,
          })

          history.push("/")

        } catch (err) {

          props.showAlert({
            type: 'danger',
            message: 'Something went wrong, please try again!',
            isShow: true,
          })

        }

      } catch (err) {

        props.showAlert({
          type: 'danger',
          message: 'Something went wrong, please try again!',
          isShow: true,
        })

      }

    } else {

      showNotValidData(isValid)

    }

    props.loader(false)

  }

  useEffect(() => {
    getEmpoyee()
  }, [getEmpoyee])

  return (
    <div className="row my-5">
      <div className="col col-lg-6 mx-auto">
        <div className="mb-3">
          <Link to="/">
            <button className="btn btn-primary">
              Back
          </button>
          </Link>
        </div>
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">Edit</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={update.name}
                  className={`form-control ${validation.classNameInput}`}
                  placeholder="Name"
                  onChange={changeHandler}
                />
                <div className="invalid-feedback">
                  {validation.nameErrorMessage}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input
                  id="surname"
                  name="surname"
                  type="text"
                  value={update.surname}
                  className={`form-control ${validation.classSurnameInput}`}
                  placeholder="Surname"
                  onChange={changeHandler}
                />
                <div className="invalid-feedback">
                  {validation.surnameErrorMessage}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="patronymic">Patronymic</label>
                <input
                  id="patronymic"
                  name="patronymic"
                  type="text"
                  value={update.patronymic}
                  className={`form-control ${validation.classPatronymicInput}`}
                  placeholder="Patronymic"
                  onChange={changeHandler}
                />
                <div className="invalid-feedback">
                  {validation.patronymicErrorMessage}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={update.gender}
                  className={`custom-select ${validation.classGenderInput}`}
                  onChange={changeHandler}
                >
                  <option value=''>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div className="invalid-feedback">
                  {validation.genderErrorMessage}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contact">Contact</label>
                <PhoneInput
                  placeholder="Contact"
                  value={contact}
                  onChange={setContact}
                  inputClass={`change-width ${validation.classContactInput}`}
                />
                <div className="invalid-feedback">
                  {validation.contactErrorMessage}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="birthday">Birthday</label>
                <input
                  id="birthday"
                  name="birthday"
                  type="date"
                  value={moment(update.birthday).format('YYYY-MM-DD')}
                  className={`form-control ${validation.classBirthdayInput}`}
                  placeholder="Birthday"
                  onChange={changeHandler}
                />
                <div className="invalid-feedback">
                  {validation.birthdayErrorMessage}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  id="position"
                  name="position"
                  type="text"
                  value={update.position}
                  className={`form-control ${validation.classPositionInput}`}
                  placeholder="Position"
                  onChange={changeHandler}
                />
                <div className="invalid-feedback">
                  {validation.positionErrorMessage}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="salary">Salary</label>
                <input
                  id="salary"
                  name="salary"
                  type="number"
                  value={update.salary}
                  className={`form-control ${validation.classSalaryInput}`}
                  placeholder="Salary"
                  onChange={changeHandler}
                />
                <div className="invalid-feedback">
                  {validation.salaryErrorMessage}
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Edit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = {
  showAlert,
  loader
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)