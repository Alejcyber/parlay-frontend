import { transformDate } from "../../shared/date"
import ScoreButtonGroup from "./ScoreButtonGroup"


const GameList = ({league, games, enableButton, add, removebyGame}) => {

    return (
        <div className="card" >
            <div className="card-header" >
                Juegos {league && ( <span>: {league.name}</span>)}
            </div>
            <ul className="list-group list-group-flush">
                {games.map(game => (
                <li key={game.id} className="list-group-item">
                    <div className="row">
                        <span>
                            {game.type}
                            | {game.league.name} 
                            | 📆 {transformDate(game.date)}
                        </span>
                        <hr />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>{game.team_1.name}</span>
                        <span >🆚</span>
                        <span>{game.team_2.name}</span>
                    </div>
                  
                    {enableButton(game) && 
                        <ScoreButtonGroup game={game} add={add} removebyGame={removebyGame} />
                    }
                </li>
                ))}
            </ul>
        </div>
    )
}

export default GameList
