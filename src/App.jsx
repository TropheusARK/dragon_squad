import "./App.css"
import { useState } from "react"
import { useEffect } from "react"
import "./components/SignInHUD"
import SignInHUD from "./components/SignInHUD"

function App() {

  const [isLoading, setIsLoading] = useState(true)
  const [loginState, setLoginState] = useState("Null")

  useEffect(() => {setTimeout(() => {setIsLoading(false); setLoginState("SignUp")}, 5000)}, [])

  function loading() {
    return isLoading && <div className="loadingWheel"></div>
  }

  function loginUI() {
    if (loginState === "Null"){
      return false;
    } 
    else {
      return <SignInHUD 
        layer={loginState}
        signInClick={() => {setLoginState("SignUp")}}
        logInClick={() => {setLoginState("Login")}}
       />
    }
  }


  return (
    <div className="blackScreen">

      <h1 className="gameTitleTxt"> Dragon Squad</h1>

      {loading()} {/** Load Data */}
      {loginUI()} {/** Login Pop Up */}

    </div>
  )
  

}

export default App