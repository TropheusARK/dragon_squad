import { useEffect, useState, useRef } from "react";

import dragonModule from "../data/dragons.js"
import teamIcon from "../images/Icons/team_button-icon.png"



function Lobby(props){

    const team = props.playerData.team;
    const dragons = props.playerData.dragons;

    const [leaderDragonCurrentAnim, setLeaderDragonCurrentAnim] = useState("Idle");
    const [leaderDragonCurrentFrame, setLeaderDragonCurrentFrame] = useState(0);
    const leaderAnimId = useRef(null);

    //Create the team
    const teamDragons = Object.values(team).map((index, i) => {

        const ownedDragon = dragons.find((dragon) => {
            return dragon !== null && dragon.id === index;
        })

        const staticDragon = dragonModule.find((dragon) => {
            return ownedDragon !== undefined && dragon.Id === ownedDragon.dragonId;
        })

        return {"owned": ownedDragon, "static": staticDragon};
    })

    //Leader Animations

    useEffect(() => {
        if (teamDragons[0] !== undefined){
            leaderAnimId.current = setInterval(() => {
                setLeaderDragonCurrentFrame(x => (x + 1) % teamDragons[0].static.images.idle.frames.length)
            }, 100)

            return () => {
                clearInterval( leaderAnimId.current);
            }
        }
    }, [leaderDragonCurrentAnim])
  
    

    return (
        <div className="lobbyScreen"> 

            <div className = "lobbyHUD"> 

                <div className = "Profile">

                    <div className = "nameHolder">
                        <h1> {props.currentUser.username} </h1>
                    </div>
                
                </div>

                <div className="cHolder">
                    <div className = "fpimage">
                        <div className="image"></div>
                        <h1> {props.playerData.currencies.friendshipPoints} <span>/2000</span> </h1>
                    </div>
                    
                    <div className = "energyimage">
                        <div className="image"></div>
                        <h1> {props.playerData.currencies.energy} <span>/40</span> </h1>
                    </div>
                   
                    <div className = "goldimage">
                        <div className="image"></div>
                        <h1> {props.playerData.currencies.gold} </h1>
                    </div>
                   
                    <div className = "gemsimage">
                        <div className="image"></div>
                        <h1> {props.playerData.currencies.gems} </h1>
                    </div>
                   
                </div>


            </div>
        
            <div className = "dragonHUD">

                <button className="teamButton" onClick={() => props.setMenu("Team")}>
                    <img src={teamIcon} alt="Team"/>
                    <div>
                        <h1> Team </h1>
                    </div>
                </button>
            </div>

            <div className="dragonDisplay">

                {teamDragons[0].static !== undefined && <img className="dragonLeader" src={teamDragons[0].static.images.idle.frames[leaderDragonCurrentFrame]}/> }
                
     
            </div>
        </div>
    )
}

export default Lobby