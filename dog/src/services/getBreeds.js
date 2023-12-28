import axios from 'axios'


const getBreeds = async () => {
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/list/all")
    return response.data
  } catch(error) {
    return {error}
  }
}

export default getBreeds