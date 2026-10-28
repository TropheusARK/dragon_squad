import { useState } from "react"
import { useEffect } from "react"
import SignInHUD from "./SignInHUD"

function StartUp(props) {


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
            finishLogin={clientLogin}
           />
        }
      }

      function clientLogin() {
        setIsLoading(true)
        setLoginState("Null")
        props.finishLogin()
      }

    return (
        <div className="blackScreen">
  
        <h1 className="gameTitleTxt"> Dragon Squad</h1>
  
        {loading()} {/** Load Data */}
        {loginUI()} {/** Login Pop Up */}
  
      </div>
    )
}

export default StartUp