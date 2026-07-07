import "./App.css"
import { useState } from "react"
import { useEffect } from "react"
import Game from "./components/Game"
import StartUp from "./components/StartUp"

function App() {

  const [inGame, setInGame] = useState(false)
  const [inBattle, setInBattle] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  
  useEffect(() => {checkLogin() }, []) /* empty [] means run when component first appears */

  async function checkLogin() { /* async means the function will take time to respond */
    const response = await fetch("http://localhost:3000/me", {
      credentials: "include"
    })

    const data = await response.json()

    if (data.success) {
      setCurrentUser({
        id: data.userId,
        username: data.username
      })
      return true
    } else {
      setCurrentUser(null)
      return false
    }
  }

  async function finishLogin() {

    setTimeout(async () => {

      const isLoggedin = await checkLogin()

      if (isLoggedin) {
        setInGame(true)
      }
    }, 3000)
  }

  return (

    /* If ingame show game component, if not show login/sign up screen */
     inGame ? 

     <Game 
      currentUser={currentUser} 
     /> : 

     <StartUp 
     finishLogin={finishLogin}
     />
  )
  

}

export default App