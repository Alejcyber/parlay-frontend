import { transformDate } from "../../shared/date";

const Results = ({games}) => {

    return ( 
        <div className="card" >
            <div className="card-header" style={{fontSize: 30}}>
                Resultados 🎖️
            </div>
            <ul className="list-group list-group-flush">
                {games.map(game => (
                <li key={game.id} className="list-group-item">
                    <div className="row mb-2">
                        <span>
                            {game.type}
                            | {game.league.name} 
                            | 📆 {transformDate(game.date)}
                            | 🌐 <b>{game.id}</b> 
                        </span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <div className={ game.scoreTeam1 > game.scoreTeam2 ? "col p-2 bg-warning": "col p-2 bg-light" }>
                            <div style={{fontSize: 20}}>
                                {game.scoreTeam1 > game.scoreTeam2 ? <div>🏅</div> : <div>🤨</div> }
                                {game.team_1.name}
                            </div>
                            <div style={{fontSize: 25}}>{game.scoreTeam1}</div>
                        </div>
                        <div className={ game.scoreTeam1 === game.scoreTeam2 ? "col p-2 bg-warning": "col p-2 bg-light" }>
                            <span style={{fontSize: 20}}>
                                {game.scoreTeam1 === game.scoreTeam2 && <span>🏅</span> }
                                Empate
                            </span>
                        </div>
                        <div className={ game.scoreTeam1 < game.scoreTeam2 ? "col p-2 bg-warning": "col p-2 bg-light" }>
                            <span style={{fontSize: 20}}>
                                {game.scoreTeam2 > game.scoreTeam1 ? <div>🏅</div> : <div>🤨</div> }
                                {game.team_2.name}
                            </span>
                            <div style={{fontSize: 25}}>{game.scoreTeam2}</div>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default Results