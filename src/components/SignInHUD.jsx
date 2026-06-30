import "../App.css"
import { use, useState } from "react"


function SignInHUD(props) {

    const [usernameField, UpdUsernameField] = useState("")
    const [passwordField, UpdPasswordField] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [errorScreen, setErrorScreen] = useState(false)

    function displayError(msg){

        console.log(msg)
        setErrorMsg(msg)
        setErrorScreen(true)
    }
    
    async function login(){
        /*  */
        if ((usernameField.length > 2 && passwordField.length > 7) && (usernameField.length < 21 && passwordField.length < 21) ){
           
            const url = "http://localhost:3000/login"

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: usernameField,
                    password: passwordField
                })
            })
           
            const data = await response.json()

             if (data.success === false) {
                displayError(data.msg)
             }else {
                console.log(data.msg)
             }
             
         }else{
            
            if (usernameField.length < 3 || usernameField.length > 20){
                displayError("Invalid Username Length")
            } else {
                displayError("Invlid Password Length")
            }

         }
    }
    async function createAccount(){
         /*  async means this is allowed to use await */
         if ((usernameField.length > 2 && passwordField.length > 7) && (usernameField.length < 21 && passwordField.length < 21) ){
           
            const url =  "http://localhost:3000/signup"
           
            const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    /*  Body */
                    body: JSON.stringify({
                        username: usernameField, 
                        password: passwordField
                    })
                }
             )


             const data = await response.json()

             if (data.success === false) {
                displayError(data.msg)
             }else {
                console.log(data.msg)
             }
             
         }else{
            
            if (usernameField.length < 3 || usernameField.length > 20){
                displayError("Username must be 3-20 characters")
            } else {
                displayError("Password must be 8-20 characters")
            }

         }
         
    }


    function title(msg) {
        if (msg === "SignUp"){
            return(
                <h1>Create Account</h1>
            )
        }else{
            return(
                <h1>Log In</h1>
            )
        }
    }

    function userinput(msg) {
        if (msg === "SignUp"){
            return ( 
                <input className="loginInputs"
                    placeholder="Create a Username" 
                    onChange={(event) => {UpdUsernameField(event.target.value)}}
                />
            )
                
        } else{
            return ( 
                <input className="loginInputs"
                    placeholder="Enter Username" 
                    onChange={(event) => {UpdUsernameField(event.target.value)}}
                />
            )
        }
    }

    function passwordinput(msg) {
        if (msg === "SignUp"){
            return ( 
                <input className="loginInputs"
                    placeholder="Create a Password"
                    type="password"
                    onChange={(event) => {UpdPasswordField(event.target.value) }}
                />
            )
                
        } else{
            return ( 
                <input className="loginInputs"
                placeholder="Enter Password"
                type="password"
                onChange={(event) => {UpdPasswordField(event.target.value)}}
                />
            )
        }
    }

    return (

        <div className="signIn">
            
            {/* Heading */}
            <div>
               {title(props.layer)}
            </div>
            
            <div>
                <button className="loginButtons" onClick={props.signInClick}>Sign Up</button>
                <button className="loginButtons" onClick={props.logInClick}>Login</button>
            </div>

            <div className = "inputFields">
               {userinput( props.layer )}
               {passwordinput( props.layer )}
            </div>
            
            {errorScreen && 
                <div className="errorMsg">
                    <div> 
                        <p className = "errorTxt">{errorMsg}</p>
                     </div>
                     <div> 
                        <button className="errorConfirmButton" onClick={() => setErrorScreen(false) }>Ok</button>
                     </div>
                    
                </div>
            }

            { (props.layer === "SignUp") && <div>  <button className="loginButtons" onClick={() => {createAccount()}} > Create </button> </div>}
            { (props.layer !== "SignUp") && <div>  <button className="loginButtons" onClick={() => {login()}} > Enter </button> </div>}



        </div>

    )
}

export default SignInHUD