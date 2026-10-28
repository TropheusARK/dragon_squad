import { useState } from "react"

import Team from "../components/Team"
import Lobby from "../components/Lobby"



function Game(props) {

    /*  setCurrentUser({
        id,
        username
      })
        */

    const [menu, setMenu] = useState("Lobby")


    function selectDragonTeam(type, slot) {

    }

    function Scene() {
        if (menu === "Lobby"){
           
            return <Lobby {...props} setMenu={setMenu} />

        } else if (menu === "Team") {

            return <Team {...props} setMenu = {setMenu} />
           
        }
    }

    return(
        Scene()
    )
}


export default Game