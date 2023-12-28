import axios from 'axios'

const issueRequest = async () => {
  const request = await axios.get("http://localhost:3000/")
  return request.data
}

export default issueRequest