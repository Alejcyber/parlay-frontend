import { transformDate } from "../../shared/date"

const SelectedGames = ({selectedGames, removeGame}) => {


    return (
        <div className="card" >
        <div className="card-header" >
            Seleccionados
        </div>
        <ul className="list-group list-group-flush">
            {selectedGames.map((item, index) => (
            <li key={index} className="list-group-item col">
                <div className="row">
                    <span> {item.game.type} | {item.game.team_1.name} 🆚 {item.game.team_2.name} |  📆  {transformDate(item.game.date)} </span>
                </div>
                <div className="row" >
                    <span>🏅{item.winner.name}</span>
                </div>
                <div className="row">
                    <button className="btn btn-danger" onClick={() => removeGame(item)}>Quitar</button>
                </div>
            </li>
            ))}
        </ul>
    </div>
    )
}

export default SelectedGames
