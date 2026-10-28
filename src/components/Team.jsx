import { useState } from "react"

import dragonModule from "../data/dragons"

import arrowIcon from "../images/Icons/arrow_label.png"
import heartIcon from "../images/Icons/dsquadHp.png"
import swordIcon from "../images/Icons/dsquadAtk.png"
import shieldIcon from "../images/Icons/dsquadDef.png"
import recovIcon from "../images/Icons/dsquadRecov.png"
import skillPHIcon from "../images/Icons/skills/claw.png"
import arrowTeamPick from "../images/Icons/arrows_team_pick.png"

function Team(props){

    const [selectingTeamMember, setSelectingTeamMember] = useState(false);

    const team = props.playerData.team;
    const dragons = props.playerData.dragons;

    function removeSlot(){
        setSelectingTeamMember(false);
    }

    function selectDragon(){

        {/* when a dragon is selected, it can be put in a slot, 

            1. if it's in a slot already show that with a "selected cover"
            2. if remove is pressed cancel selectingTeamMember 
            6. show selected members in the team section at their spot
            3. if remove is pressed and selecteddragon is in a teamSlot, take dragon out of position
            4. make it so that the dragon ui shows element on top left, a element colored border
            5. the dragon's level, number of stars, and boost count (if u added that)
            */}

        setSelectingTeamMember(true);
    }

    
    
    const teamDragons = Object.values(team).map((item, i) => {

        const ownedDragon = dragons.find((dragon) => {
            return dragon !== null && dragon.id === item
        })

        const staticDragon = dragonModule.find((dragon) => {
            return ownedDragon !== undefined && dragon.Id == ownedDragon.dragonId
        })
        

        return {"owned": ownedDragon, "static": staticDragon}
    })



    return(
        <div className = "teamScreen">

            {/* Top Bar */}
            <div className = "lobbyHUD">
                <div className="cHolder">

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

            <button className="returnButton" onClick={() => props.setMenu("Lobby")}>
                <img src={arrowIcon} alt="Back"/>
            </button>


            {/* List ON LEFT */}

            <div className="dragonList">

                <div className="Header">
                    <h1>Dragon List</h1>
                </div>
                
                <div className = "scrollingFrame">

                    <div className="removeSlot" key={0}>
                        <h1>Remove</h1>
                        <button onClick={()=>(removeSlot())}></button>
                    </div> 

                    {props.playerData.dragons.map((i, index) => {

                        if (i !== null) {
                            const dragon = dragonModule.find((dragon) => dragon.Id === i.dragonId)
                    
                            return (
                            
                                <div className={`dragonSlot ${dragon.element}` } key={index}>
                                    <img className="profile" src={ dragon.images.profile }/>
                                    <button onClick={()=>(selectDragon(i))}></button>

                                    {i.id === props.playerData.team.slot1Id &&  <img className="slotCover"/> }
                                </div>          
                            ) 
                        } else {
                            return (
                                <div className="dragonSlot" key = {index} />
                            )
                        }
                        
                    })}
                
                </div>
            </div>

            {/* Team SETUP OF RIGHT SIDE */}
            <div className="team">

                
                <div className="rank">
                    <h2> Rank </h2>
                    <h1> S </h1>
                </div>
                <div className="type">
                    <h2> Type </h2>
                    <h1> Supporter </h1>
                </div>

                <div className="leaderSlot">

                    {teamDragons[0] !== null && <img className = "picSlot" src={teamDragons[0].static.images.profile} />}
                    <p className="title">Leader</p>
                    <button></button>

                    <div className = "skills">
                        <div className="skill1">

                        </div>
                        <div className="skill2">
                            
                        </div>
                        <div className="skill3">
                            
                        </div>
                        <div className="skill4">
                            
                        </div>
                    </div>
                


                    <div className="stats">
                        <div className="hp">
                            <img src={heartIcon}/>
                            <p>8171</p>
                        </div>
                        <div className="atk">
                            <img src={swordIcon}/>
                            <p>2046</p>
                        </div>
                        <div className="def">
                            <img src={shieldIcon}/>
                            <p>362</p>
                        </div>
                        <div className="rec">
                            <img src={recovIcon}/>
                            <p>1945</p>
                        </div>
                    </div>
                
                
                </div>

                <div className="supportSlots">
                    <div className="slot2">
                        
                        <button></button>

                        <div className="stats">
                            <div className="hp">
                                <img src={heartIcon}/>
                                <p>8171</p>
                            </div>
                            <div className="atk">
                                <img src={swordIcon}/>
                                <p>2046</p>
                            </div>
                            <img src={skillPHIcon} className="skill" />
                        </div>
                    </div>
                    <div className="slot3">
                        
                        <button></button>

                        <div className="stats">
                            <div className="hp">
                                <img src={heartIcon}/>
                                <p>8171</p>
                            </div>
                            <div className="atk">
                                <img src={swordIcon}/>
                                <p>2046</p>
                            </div>
                            <img src={skillPHIcon} className="skill" />
                        </div>
                    </div>
                    <div className="slot4">
                        
                        <button></button>

                        <div className="stats">
                            <div className="hp">
                                <img src={heartIcon}/>
                                <p>8171</p>
                            </div>
                            <div className="atk">
                                <img src={swordIcon}/>
                                <p>2046</p>
                            </div>
                            <img src={skillPHIcon} className="skill" />
                        </div>
                    </div>
                </div>
                
                <div className="effectList">
                    <h2>Team Effect</h2>
                    
                </div>
               
                {selectingTeamMember && <img className="arrowTeamPick" src = {arrowTeamPick}/>}

                
            </div>

        </div>
    )
}

export default Team