import React, {useEffect, useState} from "react"
import { transformDate } from "../shared/date"
import {validateNumber} from "../shared/validations"
import {useNavigate} from 'react-router-dom'
import uniqid from 'uniqid'

const New = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([]);
    const [selectedGames, setSelectedGames] = useState([]);
    const [amount, setAmount] = useState('1.00');

    const [error, setError] = useState(null);

    const parlayList = localStorage.getItem('parlayList') ? JSON.parse(localStorage.getItem('parlayList')) : []

    useEffect(() => {
        setGames(JSON.parse(localStorage.getItem('games')))
    },[])

    const add = (game, winner) => {
        if(selectedGames.length === 3){
            alert('Limite superado, solo puede seleccionar 3')
            return
        }
        if(selectedGames.filter((item) => item.game.id === game.id).length > 0){
            alert("Este partido ya esta seleccionado")
            return
        }
        let newArray = [...selectedGames, {id: selectedGames.length, game, winner} ]
        setSelectedGames(newArray)
    }

    const remove = (item) => {
        setSelectedGames(selectedGames.filter(a => a.id !== item.id))
    }

    const gameAlready = (game) => {
        let already = false;
        parlayList.forEach((parlay) => {
            parlay.list.forEach((parlayGame)=>{
                if(game.id === parlayGame.game.id){
                    already = true 
                } 
            })
        })
        return already;
    }

    const save = (e) => {
        e.preventDefault()

        const msg = validateNumber(Number(amount))
        if(msg){
            setError(msg)
            return
        }

        const parlay = {
            id: uniqid(),
            amount,
            list: selectedGames
        }
  
        const newArray = [...parlayList, parlay]
        localStorage.setItem('parlayList',JSON.stringify(newArray));
        
        navigate('/list');
    }


    return ( 
        <div className="container">
            <div className="my-5 d-flex justify-content-between">
                <h1>Crear</h1>
                <button className="btn btn-success" onClick={() => navigate('/list')}>Mis apuestas 💸</button>
            </div>

            <div className="card my-5" >
                <div className="card-header" style={{fontSize: 30}}>
                    Juegos
                </div>
                <ul className="list-group list-group-flush">
                    {games.map(game => (
                    <li key={game.id} className="list-group-item">
                        <div className="row" style={{fontSize: 40}}>
                            <span>{game.type}{gameAlready(game) === true ? <span className="mr-4">☑️</span> : '' }</span>
                        </div>
                        <div className="row">
                            <div className="col-md-5" style={{fontSize: 30}}>
                                <span>{game.team_1.name}</span>
                                {gameAlready(game) === false ? 
                                <div>
                                    <button className="btn btn-info" onClick={() => add(game, game.team_1)}>Ganador</button>
                                </div> : ''}
                            </div>
                            <div className="col-md-3" style={{fontSize: 50}}>
                            🆚
                            </div>
                            <div className="col-md-4" style={{fontSize: 30}}>
                                 <span>{game.team_2.name}</span> 
                                 {gameAlready(game) === false ?
                                 <div>
                                    <button className="btn btn-info" onClick={() => add(game, game.team_2)}>Ganador</button>
                                </div> : ''}
                            </div>
                        </div>
                        <div className="row mt-3">
                            
                           <span> 📆 {transformDate(game.date)}</span>
                        </div>
                    
                    </li>
                    ))}
                </ul>
            </div>

            {selectedGames.length > 0 && 
            <div className="card my-5" >
                <div className="card-header" style={{fontSize: 30}}>
                    Seleccionados
                </div>
                <ul className="list-group list-group-flush">
                    {selectedGames.map((item, index) => (
                    <li key={index} className="list-group-item col">
                        <div className="row">
                            <span> {item.game.type} | {item.game.team_1.name} 🆚 {item.game.team_2.name} |  📆  {transformDate(item.game.date)} </span>
                            
                        </div>
                        <div className="row" style={{fontSize: 30}}>
                            <span>🏅{item.winner.name}</span>
                        </div>
                       <div className="row">
                            <button className="btn btn-danger" onClick={() => remove(item)}>Quitar</button>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>}

            {selectedGames.length === 3 && 
            <form className="form-group my-5" onSubmit={(e) => save(e)}>
                <label style={{fontSize: 30}}>💸 Monto de apuesta</label>
                <input 
                    value={amount}
                    className='form-control' 
                    min="1"
                    step="0.01"
                    placeholder='Introduce el numero' 
                    onChange={(e)=>{setAmount(e.target.value)}}
                    type="number" />
            
                {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}

                <input 
                    type='submit' 
                    value="Guardar" 
                    className='btn btn-success btn-lg mt-3'/> 
            </form>}


        </div> 
    )
}

export default New