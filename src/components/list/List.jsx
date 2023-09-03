import React, {Fragment, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import { transformDate } from "../../shared/date";
import Results from "./Results";
import MyBets from "./MyBets";

const List = () => {

    const [parlayList, setParlayList] = useState([]);
    const navigate = useNavigate()
    const [games, setGames] = useState([]);

    useEffect(() => {
        setGames(JSON.parse(localStorage.getItem('games')))

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

            <div className="row">
                <div className="col-md-6">
                    <Results games={games} />
                </div>
                <div className="col-md-6">
                    <MyBets games={games} parlayList={parlayList} remove={remove} />
                </div>
            </div>
        </Fragment> 
    )
}

export default List