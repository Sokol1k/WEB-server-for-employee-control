const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

chai.should()

chai.use(chaiHttp)

describe('Authorization methods', () => {

  describe('POST /api/auth/register', () => {

    it('It must register the user.', (done) => {
      chai.request(server)
        .post('/api/auth/register')
        .send({
          login: 'Danil',
          email: 'danil@gmail.com',
          password: 'secret',
          confirmPassword: 'secret'
        })
        .end((err, response) => {
          response.should.have.status(201)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    })

    it('It should return an error that the email is already in use.', (done) => {
      chai.request(server)
        .post('/api/auth/register')
        .send({
          login: 'Danil',
          email: 'danil@gmail.com',
          password: 'secret',
          confirmPassword: 'secret'
        })
        .end((err, response) => {
          response.should.have.status(403)
          response.body.should.be.a('object')
          response.body.should.have.property('email')
          done()
        })
    })

    it('It should return an error that the login is already taken.', (done) => {
      chai.request(server)
        .post('/api/auth/register')
        .send({
          login: 'Danil',
          email: 'danil1@gmail.com',
          password: 'secret',
          confirmPassword: 'secret'
        })
        .end((err, response) => {
          response.should.have.status(403)
          response.body.should.be.a('object')
          response.body.should.have.property('login')
          done()
        })
    })

    it('It should return an error that the login is not valid.', (done) => {
      chai.request(server)
        .post('/api/auth/register')
        .send({
          login: '',
          email: 'danil1@gmail.com',
          password: 'secret',
          confirmPassword: 'secret'
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('login')
          done()
        })
    })

    it('It should return an error that the email is not valid.', (done) => {
      chai.request(server)
        .post('/api/auth/register')
        .send({
          login: 'Danil',
          email: 'danilgmail.com',
          password: 'secret',
          confirmPassword: 'secret'
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('email')
          done()
        })
    })

    it('It should return an error that the password is not valid.', (done) => {
      chai.request(server)
        .post('/api/auth/register')
        .send({
          login: 'Danil',
          email: 'danil@gmail.com',
          password: '',
          confirmPassword: 'secret'
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('password')
          done()
        })
    })

    it('It should return an error that the passwords do not match.', (done) => {
      chai.request(server)
        .post('/api/auth/register')
        .send({
          login: 'Danil',
          email: 'danil@gmail.com',
          password: 'secret',
          confirmPassword: 'secret1'
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('confirmPassword')
          done()
        })
    })

  })

  describe('POST /api/auth/login', () => {

    it('It should authorize the user.', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .send({
          login: 'Danil',
          password: 'secret',
        })
        .end((err, response) => {
          response.should.have.status(200)
          response.body.should.be.a('object')
          response.body.should.have.property('token')
          done()
        })
    })

    it('It should return an error that the login is not valid.', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .send({
          login: '',
          password: 'secret',
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('login')
          done()
        })
    })

    it('It should return an error that the password is not valid.', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .send({
          login: 'Danil',
          password: 'sec',
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.body.should.be.a('object')
          response.body.should.have.property('password')
          done()
        })
    })

    it('It should output an error, invalid login information.', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .send({
          login: 'Danil1',
          password: 'secret',
        })
        .end((err, response) => {
          response.should.have.status(403)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    })

  })

})