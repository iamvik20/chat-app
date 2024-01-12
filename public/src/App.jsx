import { useState } from "react"
import { Outlet } from "react-router-dom"

function App() {

  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    OTP: '',
  })

  return (
    <>
      <Outlet context={{credentials, setCredentials}} />
    </>
  )
}

export default App
