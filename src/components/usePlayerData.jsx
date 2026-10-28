import { useState } from "react"
import { useEffect } from "react"

function usePlayerData() {

    /* currency */
    const [currencies, setCurrencies] = useState({
        gold: 0,
        gems: 0,
        energy: 0,
        friendshipPoints: 0
    })

    /* The dragons */
    const [dragons, setDragons] = useState(
        Array(200).fill(null) /* Creates an array of null with size 200 */
    )

    /* players team, references a slot in dragon list */ 
    const [team, setTeam] = useState({
        slot1Id: null,
        slot2Id: null,
        slot3Id: null,
        slot4Id: null,
    })

    async function retrieveData() {


        const response = await fetch("http://localhost:3000/data", 
            {credentials: "include"})

        const data = await response.json()

        if (data.success) {
            setCurrencies(data.currency)
            setDragons(data.dragons)
            setTeam(data.team)
            console.log(currencies)
        }
    }

    
    return ({
        retrieveData,
        currencies,
        setCurrencies,
        dragons,
        setDragons,
        team,
        setTeam,
    })
}

export default usePlayerData