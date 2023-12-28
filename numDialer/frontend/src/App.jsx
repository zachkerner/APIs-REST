import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import io from 'socket.io-client';


const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const Number = ({ number }) => {
  const status = "idle"
  return (
    <p>{number} - {status}</p>
  )
}

const List = () => {
  const [message, setMessage] = useState("")

  useEffect(() => {
    const socket = io('http://localhost:5173')
    socket.on('message', (data) => {
      setMessage("message")
    })

    return () => {
      socket.disconnect()
    }
    }, [])
    const numbers = [13018040009, 19842068287, 15512459377,
      19362072765, 18582210308,13018040009,
      19842068287,15512459377,19362072765]
  
    const list = numbers.map(n => {
      return (
        <div key={uuidv4()}>
          <p>{message}</p>
          <Number number={n}/>
        </div>
      
      )
    })
    return (
      <div id="numbers">
        {list}
      </div>
    )
}

const CallButton = () => {
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.get("http://localhost:3000/calls")
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div id="call">
      <button onClick={handleClick}>Call</button>
    </div>
  )
}

function App() {

  return (
    <>
    <Header text={"Phonebook"} />
    <List />
    <CallButton />
    </>
  )
}

export default App
