import { useContext } from "react"
import GoogleLogin from "./components/GoogleLogin"
import Navbar from "./components/Navbar"
import { AuthContext } from "./AuthContext"


function App() {

  const {user, loading} = useContext(AuthContext);

  return (
    <>
      <Navbar></Navbar>
      <GoogleLogin></GoogleLogin>
    </>
  )
}

export default App
