const supertest = require('supertest')
const routes = require('../router/routes.js')
const axios = require('axios')

const api = supertest(routes)

test('breed returned as json', async() => {
  await api
    .get('/breeds')
    .expect(200)
})
