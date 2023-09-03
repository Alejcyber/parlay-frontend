import React, {Fragment} from "react";
import { transformDate } from "../../shared/date";

const MyBets = ({games, parlayList, remove}) => {

    const validateWinner = (parlay) => {
        const arr = games.filter(game => game.id === parlay.game.id && game.winner.id === parlay.winner.id)
        return arr.length > 0
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
                                <li key={index} className={validateWinner(item) ? "list-group-item col bg-warning" : "list-group-item col"}>
                                    <div className="row">
                                        <span> 
                                            {item.game.type} 
                                            | {item.game.team_1.name} 
                                            🆚 {item.game.team_2.name} 
                                            |  📆  {transformDate(item.game.date)} 
                                            | 🌐 <b>{item.game.id}</b>                                         
                                        </span>
                                    </div>
                                    <div className="row" style={{fontSize: 30}}>
                                        <span>🏅{item.winner.name}</span>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            ))}
        </Fragment> 
    )
}

export default MyBets