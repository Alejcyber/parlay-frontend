import { transformDate } from "../../shared/date"


const GameList = ({league, games, gameAlreadyWinner, add}) => {

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
                    
                    {!gameAlreadyWinner(game) && (
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-info" onClick={() => add(game, game.team_1)}>Ganador</button>
                        <button className="btn btn-warning" onClick={() => add(game, {id: 0, name: "Empate"})}>Empate</button>
                        <button className="btn btn-info" onClick={() => add(game, game.team_1)}>Ganador</button>
                    </div>)}

                    {gameAlreadyWinner(game) && <span> <b>Apostado a: {gameAlreadyWinner(game)} 🏅</b></span> }
                </li>
                ))}
            </ul>
        </div>
    )
}

export default GameList
