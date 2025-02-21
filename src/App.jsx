import { useContext } from "react"
import GoogleLogin from "./components/GoogleLogin"
import Navbar from "./components/Navbar"
import { AuthContext } from "./AuthContext"
import Loading from "./components/Loading";
import TaskBoard from "./components/TaskBoard";


function App() {

  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loading></Loading>;

  return (
    <>
      <Navbar></Navbar>
      {
        user ?
          <div className="w-11/12 md:w-10/12 mx-auto">
            <TaskBoard></TaskBoard>
          </div> :
          <GoogleLogin></GoogleLogin>
      }
    </>
  )
}

export default App
