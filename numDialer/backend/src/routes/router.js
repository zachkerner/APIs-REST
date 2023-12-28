import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'

const router = express.Router()

router.use(bodyParser.json())




router.get("/", (req, res) => {
  res.send('hello world')
})
//{id: "", number: "", status: ""}

const numberTracker = []

router.get("/calls", async (req, res) => {
  const numbers = [13018040009, 19842068287, 15512459377,
    19362072765, 18582210308,13018040009,
    19842068287,15512459377,19362072765].map(async (n) => {
      try {
        const dataSent = {"phone": String(n), "webhookURL": "http://localhost:3000/calls" }
        await axios.post("http://localhost:4830/call", dataSent)
        .then(response => {
          console.log("response from axios",response.data)
          const numObj = {"id": response.data.id, "number": String(n), "status": "idle"}
          numberTracker.push(numObj)
        })
        .catch(e => console.log("api error",e))
      } catch (e) {
        console.log("axios error", e)
      }
    })
    
})

const changeStatus = (arr, id, status) => {
  const numberObj = arr.find(obj => obj["id"] === id)
  numberObj ? numberObj["status"] = status : ""
}

router.post("/calls", async (req, res) => {
  const {id, status} = req.body
  changeStatus(numberTracker, id, status)
  console.log("updated numberTracker", numberTracker)
  //send a request to the frontend
  await axios.get("http://localhost:5173")

})

export default router