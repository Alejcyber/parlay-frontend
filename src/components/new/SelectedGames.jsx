import { transformDate } from "../../shared/date"

const SelectedGames = ({selectedGames}) => {

    const selectScoreType = (item) => {
        if(item.scoreTeam1 && item.scoreTeam1 > 0) return "Alta ⬆️ "
        if(item.scoreTeam1 && item.scoreTeam1 < 0) return "Baja ⬇️ "
        if(item.scoreTeam2 && item.scoreTeam2 > 0) return "Alta ⬆️ "
        if(item.scoreTeam2 && item.scoreTeam2 < 0) return "Baja ⬇️ "

    }

    const selectBg = (item) => { 
        return selectScoreType(item) === "Alta ⬆️ " ? "d-flex bg-success" : "d-flex bg-danger"
    }

    const selectScoreText = (item) => {
        const score = item.scoreTeam1 ? item.scoreTeam1 : item.scoreTeam2
        return selectScoreType(item) + score
    }

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
                <div className={selectBg(item)} >
                    {selectScoreText(item)}
                </div>
            </li>
            ))}
        </ul>
    </div>
    )
}

export default SelectedGames
