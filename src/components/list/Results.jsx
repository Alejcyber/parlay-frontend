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
                        <span 
                        style={{fontSize: 30}}
                        className={ game.team_1.id === game.winner.id ? "bg-warning": "bg-light" }>
                            {game.team_1.id === game.winner.id && <span>🏅</span> }
                            {game.team_1.name}
                        </span>
                        <span 
                        style={{fontSize: 30}}
                        className={ game.winner.id === 0 ? "bg-warning": "bg-light" }>
                            {game.winner.id === 0 && <span>🏅</span> }
                            Empate
                        </span>
                        <span 
                        style={{fontSize: 30}}
                        className={ game.team_2.id === game.winner.id ? "bg-warning": "bg-light" }>
                            {game.team_2.id === game.winner.id && <span>🏅</span> }
                            {game.team_2.name}
                        </span>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default Results