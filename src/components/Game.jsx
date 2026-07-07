

function Game(props) {

    function Lobby() {

    }

    return(
        <div className="lobbyScreen">
            Welcome, {props.currentUser.username}
        </div>
    )
}


export default Game