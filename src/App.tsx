import { useState } from 'react'
import './App.css'

function App() {
  const [value, setValue] = useState(0)

  return (
    <>
    <h2>FUCKING IOS TEXTAREA TEST</h2>
      <textarea style={{height: '100px', width: '400px'}} maxLength={100} onChange={e => {
        setValue(e.target.value.length)
      }}/>
        <p>current typing count : {value}</p>
      <p>maxLength: 100</p>
    </>
  )
}

export default App
