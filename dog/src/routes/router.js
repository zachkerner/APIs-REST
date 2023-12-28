import express from 'express'
import getBreeds from "../services/getBreeds.js"
import flattenBreeds from "../utils/breedProcessing.js"

const router = express.Router()

router.get("/", (req, res) => {
  res.send("hello world")
})


router.get("/breeds", async (req, res) => { //use async/await instead
  const data = await getBreeds()
  if (data.error) {
    res.status(504).send({"error": data.error})
  } else {
    const flattenedBreeds = flattenBreeds(data)
    res.status(200).send(flattenedBreeds)
  }
})

export default router