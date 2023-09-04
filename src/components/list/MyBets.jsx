import React, {Fragment} from "react";
import { transformDate } from "../../shared/date";

const MyBets = ({games, parlayList, remove}) => {

    const scoreType = (score) => score > 0 ? "⬆️" : "⬇️"
    const scoreIcon = (score) => score > 0 ? "🏅" : "🛑"

    const validateScores = (game, parlay) => {
        if(parlay.scoreTeam1 && scoreType(parlay.scoreTeam1) === "⬆️"){
            return (game.scoreTeam1 === parlay.scoreTeam1) && (game.scoreTeam1 > game.scoreTeam2)
        }
        if(parlay.scoreTeam1 && scoreType(parlay.scoreTeam1) === "⬇️"){
            return (game.scoreTeam1 === parlay.scoreTeam1) && (game.scoreTeam1 < game.scoreTeam2)
        }
        if(parlay.scoreTeam2 && scoreType(parlay.scoreTeam2) === "⬆️"){
            return (game.scoreTeam2 === parlay.scoreTeam2) && (game.scoreTeam2 > game.scoreTeam1)
        }
        if(parlay.scoreTeam2 && scoreType(parlay.scoreTeam2) === "⬇️"){
            return (game.scoreTeam2 === parlay.scoreTeam2) && (game.scoreTeam2 < game.scoreTeam1)
        }
        return false
    } 

    const validateAssert = (parlay) => {
        const arr = games.filter(game => game.id === parlay.game.id && validateScores(game, parlay))
        return arr.length > 0
    }

    const isTie = (gameParam) => {
        const game = games.filter(game => game.id === gameParam.id)[0]
        return game.scoreTeam1 === game.scoreTeam2
    }

    const myBet = (parlay) => {
        const score =  parlay.scoreTeam1 ? parlay.scoreTeam1 : parlay.scoreTeam2
        const team =  parlay.scoreTeam1 ? parlay.game.team_1.name : parlay.game.team_2.name
        return "Mi apuesta: " + scoreIcon(score) + " " + team + scoreType(score) +  score 
    } 
    
    const winnerName = (gameParam) => {
        const game = games.filter(game => game.id === gameParam.id)[0]
        if(game.scoreTeam1 > game.scoreTeam2) return "Ganador: 🏅"+game.team_1.name+"⬆️"+game.scoreTeam1
        if(game.scoreTeam2 > game.scoreTeam1) return "Ganador: 🏅"+game.team_2.name+"⬆️"+game.scoreTeam2
    }

    const loserName = (gameParam) => {
        const game = games.filter(game => game.id === gameParam.id)[0]
        if(game.scoreTeam1 < game.scoreTeam2) return "Perdedor: 🛑"+game.team_1.name+"⬇️"+game.scoreTeam1
        if(game.scoreTeam2 < game.scoreTeam1) return "Perdedor: 🛑"+game.team_2.name+"⬇️"+game.scoreTeam2
    }

    return ( 
        <Fragment>
            {parlayList.map( (parlay) => (
                <div className="card mb-3" >
                    <ul className="list-group list-group-flush">
                            <div className="list-group-item d-flex justify-content-between" style={{fontSize: 30}}>
                                <span>Monto apostado: 💸 {parlay.amount} 💲</span>
                            <button className="btn btn-danger" onClick={() => remove(parlay)}>Eliminar</button>
                            </div>
                            {parlay.list.map((item, index) => (
                                <li key={index} className={validateAssert(item) ? "list-group-item col bg-warning" : "list-group-item col"}>
                                    <div className="row">
                                        <span> 
                                            {item.game.type} 
                                            | {item.game.team_1.name} 
                                            🆚 {item.game.team_2.name} 
                                            |  📆  {transformDate(item.game.date)} 
                                            | 🌐 <b>{item.game.id}</b>                                         
                                        </span>
                                    </div>
                                    {!isTie(item.game) &&
                                    <div className="row" style={{fontSize: 30}}>
                                        <span>{myBet(item)}</span>
                                        <span>{winnerName(item.game)}</span>
                                        <span>{loserName(item.game)}</span>
                                    </div>}
                                </li>
                            ))}
                    </ul>
                </div>
            ))}
        </Fragment> 
    )
}

export default MyBets