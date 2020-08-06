const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

chai.should()

chai.use(chaiHttp)

let token

describe('User methods', () => {

  before((done) => {
    chai.request(server)
      .post('/api/auth/login')
      .send({
        login: 'Danil',
        password: 'secret',
      })
      .end(async (err, response) => {

        token = response.body.token

        done()
      })
  })

  describe('DELETE /api/user', () => {

    it('It should delete the user.', (done) => {
      chai.request(server)
        .delete(`/api/user`)
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
        .delete(`/api/user`)
        .end((err, response) => {
          response.should.have.status(403)
          response.body.should.be.a('object')
          response.body.should.have.property('message')
          done()
        })
    })

  })

})