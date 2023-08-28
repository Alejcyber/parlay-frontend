import React, {Fragment, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import { transformDate } from "../shared/date";

const List = () => {

    const [parlayList, setParlayList] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        if (localStorage.getItem('parlayList')) {
            const list = localStorage.getItem('parlayList');
            if (JSON.parse(list) === null) {
              // El valor no es un objeto JSON válido
              console.log('El valor de localStorage.getItem("parlayList") no es un objeto JSON válido');
            } else {
              setParlayList(JSON.parse(list));
            }
          }
    },[])

    const remove = (parlay) => {
        const newList = parlayList.filter(a => a.id !== parlay.id)
        setParlayList(newList)
        localStorage.setItem('parlayList', JSON.stringify(newList))
    }

    return ( 
        <Fragment>
            <div className="my-5 d-flex justify-content-between">
                <h1>Mis apuestas</h1>
                <button className="btn btn-success" onClick={() => navigate('/new')}>Crear Apuesta 💰</button>
            </div>

            {parlayList.map( (parlay) => (
                <div className="card my-5" >
                    <ul className="list-group list-group-flush">
                            <div className="list-group-item d-flex justify-content-between" style={{fontSize: 30}}>
                                <span>Monto apostado: 💸 {parlay.amount} 💲</span>
                               <button className="btn btn-danger" onClick={() => remove(parlay)}>Eliminar</button>
                            </div>
                            {parlay.list.map((item, index) => (
                                <li key={index} className="list-group-item col">
                                    <div className="row">
                                        <span> {item.game.type} | {item.game.team_1.name} 🆚 {item.game.team_2.name} |  📆  {transformDate(item.game.date)} </span>
                                    </div>
                                    <div className="row" style={{fontSize: 30}}>
                                        <span>🏅{item.winner.name}</span>
                                    </div>
                                <div className="row">
                                   
                                </div>
                            </li>
                            ))}
                    </ul>
                </div>
            ))}
            
        </Fragment> 
    )
}

export default List