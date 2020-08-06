const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const pushDataEmployee = require('./data/employee')

chai.should()

chai.use(chaiHttp)

let token
let employeeId

describe('Employee methods', () => {

  before((done) => {
    chai.request(server)
      .post('/api/auth/login')
      .send({
        login: 'Danil',
        password: 'secret',
      })
      .end(async (err, response) => {

        token = response.body.token

        employeeId = await pushDataEmployee()

        done()
      })
  })

  describe('GET /api/employee', () => {

    it('It returns a list of all employees.', (done) => {
      chai.request(server)
        .get('/api/employee')
        .set('Authorization', `Bearer ${token}`)
        .end((err, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('items')
          response.body.should.have.property('currentPage')
          response.body.should.have.property('amountPage')
          response.body.should.have.property('prevPage')
          response.body.should.have.property('nextPage')
          done()
        })
    })

    it('It will return an error because the user is not logged in.', (done) => {
      chai.request(server)
        .get('/api/employee')
        .end((err, response) => {
          response.should.have.status(403)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    })

    it('It returns an error page not found.', (done) => {
      chai.request(server)
        .get('/api/employee/10000')
        .set('Authorization', `Bearer ${token}`)
        .end((err, response) => {
          response.should.have.status(404)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    })

  })

  describe('GET /api/employee/:id', () => {

    it('It will return employee data by id.', (done) => {
      chai.request(server)
        .get(`/api/employee/${employeeId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('salary')
          response.body.should.have.property('_id')
          response.body.should.have.property('name')
          response.body.should.have.property('surname')
          response.body.should.have.property('patronymic')
          response.body.should.have.property('gender')
          response.body.should.have.property('contact')
          response.body.should.have.property('birthday')
          response.body.should.have.property('position')
          response.body.should.have.property('created_at')
          response.body.should.have.property('__v')
          done()
        })
    })

    it('It will return an error because the user is not logged in.', (done) => {
      chai.request(server)
        .get(`/api/employee/${employeeId}`)
        .end((err, response) => {
          response.should.have.status(403)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    })

    it('It returns an error page not found.', (done) => {
      chai.request(server)
        .get(`/api/employee/qwerty`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, response) => {
          response.should.have.status(404)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    })

  })

  describe('POST /api/employee', () => {

    it('It creates a new employee.', (done) => {
      chai.request(server)
        .post('/api/employee')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivam",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(201)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    })

    it('It will return an error because the user is not logged in.', (done) => {
      chai.request(server)
        .post('/api/employee')
        .send({
          name: "Ivam",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(403)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    })

    it('It should return an error because the name is not valid.', (done) => {
      chai.request(server)
        .post('/api/employee')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "I",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('name')
          done()
        })
    })

    it('It should return an error because the surname is not valid.', (done) => {
      chai.request(server)
        .post('/api/employee')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivan",
          surname: "",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('surname')
          done()
        })
    })

    it('It should return an error because the patronymic is not valid.', (done) => {
      chai.request(server)
        .post('/api/employee')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivan",
          surname: "Ivanov",
          patronymic: "I",
          gender: "Male",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('patronymic')
          done()
        })
    })

    it('It should return an error because the gender is not valid.', (done) => {
      chai.request(server)
        .post('/api/employee')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivan",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('gender')
          done()
        })
    })

    it('It should return an error because the contact is not valid.', (done) => {
      chai.request(server)
        .post('/api/employee')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivan",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "",
          birthday: "1999-04-05",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('contact')
          done()
        })
    })

    it('It should return an error because the birthday is not valid.', (done) => {
      chai.request(server)
        .post('/api/employee')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivan",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "380961512648",
          birthday: "no data",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('birthday')
          done()
        })
    })

    it('It should return an error because the salary is not valid.', (done) => {
      chai.request(server)
        .post('/api/employee')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivan",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: "text",
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('salary')
          done()
        })
    })

    it('It should return an error because the position is not valid.', (done) => {
      chai.request(server)
        .post('/api/employee')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivan",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: 1000,
          position: ""
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('position')
          done()
        })
    })

  })

  describe('PUT /api/employee/:id', () => {

    it('It update the employee data.', (done) => {
      chai.request(server)
        .put(`/api/employee/${employeeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivam",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    })

    it('It will return an error because the user is not logged in.', (done) => {
      chai.request(server)
        .put(`/api/employee/${employeeId}`)
        .send({
          name: "Ivam",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(403)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    })

    it('It should return an error because the name is not valid.', (done) => {
      chai.request(server)
        .put(`/api/employee/${employeeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "I",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('name')
          done()
        })
    })

    it('It should return an error because the surname is not valid.', (done) => {
      chai.request(server)
        .put(`/api/employee/${employeeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivan",
          surname: "",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('surname')
          done()
        })
    })

    it('It should return an error because the patronymic is not valid.', (done) => {
      chai.request(server)
        .put(`/api/employee/${employeeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivan",
          surname: "Ivanov",
          patronymic: "I",
          gender: "Male",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('patronymic')
          done()
        })
    })

    it('It should return an error because the gender is not valid.', (done) => {
      chai.request(server)
        .put(`/api/employee/${employeeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivan",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('gender')
          done()
        })
    })

    it('It should return an error because the contact is not valid.', (done) => {
      chai.request(server)
        .put(`/api/employee/${employeeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivan",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "",
          birthday: "1999-04-05",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('contact')
          done()
        })
    })

    it('It should return an error because the birthday is not valid.', (done) => {
      chai.request(server)
        .put(`/api/employee/${employeeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivan",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "380961512648",
          birthday: "no data",
          salary: 1000,
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('birthday')
          done()
        })
    })

    it('It should return an error because the salary is not valid.', (done) => {
      chai.request(server)
        .put(`/api/employee/${employeeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivan",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: "text",
          position: "FullStack"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('salary')
          done()
        })
    })

    it('It should return an error because the position is not valid.', (done) => {
      chai.request(server)
        .put(`/api/employee/${employeeId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: "Ivan",
          surname: "Ivanov",
          patronymic: "Ivanovich",
          gender: "Male",
          contact: "380961512648",
          birthday: "1999-04-05",
          salary: 1000,
          position: ""
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('position')
          done()
        })
    })

  })

  describe('DELETE /api/employee/:id', () => {

    it('It removes the employee by id.', (done) => {
      chai.request(server)
        .delete(`/api/employee/${employeeId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    })

    it('It will return an error because the user is not logged in.', (done) => {
      chai.request(server)
        .delete(`/api/employee/${employeeId}`)
        .end((err, response) => {
          response.should.have.status(403)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    })

    it('It should return page not found because there is no employee with the given id.', (done) => {
      chai.request(server)
        .delete(`/api/employee/${employeeId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, response) => {
          response.should.have.status(404)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    })

  })

})