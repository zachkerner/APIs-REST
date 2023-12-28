import express from 'express'
import issueRequest from './services/issueReq.js'

const app = express()

const start = Date.now()
const trackerObj = {}

function putInTracker() {
  const timeAfterStart = Date.now() - start
  const second = Math.floor(timeAfterStart / 1000)
  trackerObj[second] ? trackerObj[second]++ : trackerObj[second] = 1
}

function determineWindowTotal() {
  const curTime = Date.now() - start
  const pastTime = curTime - 1000
  
  const curWindow = String(Math.floor(curTime / 1000))
  const curWeight = (curTime % 1000) / 1000
  const curTotal = trackerObj[curWindow] * curWeight

  const pastWindow = String(Math.floor(pastTime / 1000))
  const pastWeight = (pastTime % 1000) / 1000
  const pastTotal = trackerObj[pastWindow] ? trackerObj[pastWindow] : 0

  return Math.ceil(curTotal) + Math.ceil(pastTotal)
}

const myLogger = function (req, res, next) {
  putInTracker()
  const windowTotal = determineWindowTotal()
  console.log(windowTotal)
  
  if (windowTotal >= 10) {
    res.status(429)
    console.log('please slow down')
  } else {
    res.status(200)
    console.log('welcome!')
  }

  next()
}

app.use(myLogger)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/fakeRequest', async (req, res) => {
  const makeRequestArr = new Array(11).fill(issueRequest)
  for (const request of makeRequestArr) {
    request.call()
  }
  const trackerObj = {"me": {}}
  res.send('fake request page')
  
})

app.listen(3000)