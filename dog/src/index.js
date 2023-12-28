import cors from 'cors'
import express from 'express'
import router from './routes/router.js'

const app = express()

app.use(cors())

app.use("/", router) //namespacing - prepends api to routes

const server = app.listen(3000, () => {
  console.log('hi mom')
})

export default server