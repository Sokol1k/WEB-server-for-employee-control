import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Pagination from '../components/Pagination'
import { showAlert } from '../store/alert/actions'
import { loader } from '../store/loader/actions'
import { showModal } from '../store/modal/actions'
import axios from 'axios'
import moment from 'moment'
import '../styles/home.scss'

function Home(props) {

  const [employee, setEmployee] = useState({
    items: [],
    currentPage: '',
    amountPage: '',
    prevPage: null,
    nextPage: null
  })

  const [params, setParams] = useState({
    name: '',
    surname: '',
    patronymic: '',
    birthday: '',
    position: '',
    salary: ''
  })

  const [page, setPage] = useState(1)

  const changeHandler = event => {
    setParams({ ...params, [event.target.name]: event.target.value })
  }

  const getEmpoyees = useCallback(async () => {
    try {

      const response = await axios({
        url: `/api/employee/${page}`,
        method: "GET",
        headers: { 'Authorization': `Bearer ${props.token}` },
        params: params
      })

      setEmployee({
        items: response.data.items,
        currentPage: response.data.currentPage,
        amountPage: response.data.amountPage,
        prevPage: response.data.prevPage,
        nextPage: response.data.nextPage
      })

    } catch (error) {

      props.showAlert({
        type: 'danger',
        message: 'Something went wrong, please try again!',
        isShow: true,
      })

    }
  }, [params, page, props, setEmployee])

  const destroyEmployee = async (id) => {

    try {

      const response = await axios({
        url: `/api/employee/${id}`,
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${props.token}` },
      })

      props.showAlert({
        type: 'success',
        message: response.data.message,
        isShow: true,
      })

    } catch (err) {

      props.showAlert({
        type: 'danger',
        message: 'Something went wrong, please try again!',
        isShow: true,
      })

    }

    getEmpoyees()

  }

  const openModal = (id, name, surname) => {
    props.showModal({
      isShow: true,
      activationFunction: async () => await destroyEmployee(id),
      message: `Are you sure you want to delete the user ${name} ${surname}?`
    })
  }

  useEffect(() => {

    getEmpoyees()

  }, [getEmpoyees, params, page])

  return (
    <div>
      <div className="my-2 text-right">
        <Link to="/create">
          <button className="btn btn-success">
            + Add
          </button>
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Patronymic</th>
              <th scope="col">Birthday</th>
              <th scope="col">Position</th>
              <th scope="col">Salary</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  className='input-width'
                  name="name"
                  onChange={changeHandler}
                />
              </td>
              <td>
                <input
                  className='input-width'
                  name="surname"
                  onChange={changeHandler}
                />
              </td>
              <td>
                <input
                  className='input-width'
                  name="patronymic"
                  onChange={changeHandler}
                />
              </td>
              <td>
                <input
                  className='input-width'
                  name="birthday"
                  onChange={changeHandler}
                />
              </td>
              <td>
                <input
                  className='input-width'
                  name="position"
                  onChange={changeHandler}
                />
              </td>
              <td>
                <input
                  className='input-width'
                  name="salary"
                  type="number"
                  min="1"
                  onChange={changeHandler}
                />
              </td>
              <td></td>
            </tr>
            {
              employee.items.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.patronymic}</td>
                    <td>{moment(item.birthday).format('YYYY-MM-DD')}</td>
                    <td>{item.position}</td>
                    <td>{item.salary}</td>
                    <td className="d-flex">
                      <Link to={`/edit/${item._id}`}>
                        <button type="button" className="btn btn-warning mr-2">
                          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                          </svg>
                        </button>
                      </Link>
                      <button type="button" className="btn btn-danger" onClick={() => openModal(item._id, item.name, item.surname)}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <Pagination
        setPage={setPage}
        currentPage={employee.currentPage}
        amountPage={employee.amountPage}
        prevPage={employee.prevPage}
        nextPage={employee.nextPage}
      />
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
  loader,
  showModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)