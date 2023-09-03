import React,  {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom'
import uniqid from 'uniqid'
import LeagueSearch from "./LeagueSearch"
import BetAmount from "./BetAmount"
import SelectedGames from "./SelectedGames"
import GameList from "./GameList"
import jsPDF from "jspdf";

const New = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([]);
    const [selectedGames, setSelectedGames] = useState([]);
    const [league,setLeague] = useState(null);

    const parlayList = localStorage.getItem('parlayList') ? JSON.parse(localStorage.getItem('parlayList')) : []

    useEffect(() => {
        setGames(JSON.parse(localStorage.getItem('games')))
    },[])

    const selectLeague = (league) => {
        setLeague(league)
        const filteredGames = games.filter(item => item.league.id === league.id)
        setGames(filteredGames)
    }

    const clearLeague = () => {
        setGames(JSON.parse(localStorage.getItem('games')))
        setLeague(null)
    }

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

    const removeGame = (item) => {
        setSelectedGames(selectedGames.filter(a => a.id !== item.id))
    }

    const gameAlreadyWinner = (game) => {
        let winner = null;
        parlayList.forEach((parlay) => {
            parlay.list.forEach((parlayGame)=>{
                if(game.id === parlayGame.game.id){
                    winner = parlayGame.winner.name 
                } 
            })
        })
        return winner;
    }

    const createHeaders = (keys) => {
        var result = [];
        for (var i = 0; i < keys.length; i += 1) {
          result.push({
            id: keys[i],
            name: keys[i],
            prompt: keys[i],
            width: 65,
            align: "center",
            padding: 0
          });
        }
        return result;
    }

    const saveAll = (amount) => {    
        const parlay = {
            id: uniqid(),
            amount,
            list: selectedGames
        }
        const newArray = [...parlayList, parlay]
        localStorage.setItem('parlayList',JSON.stringify(newArray));

        const doc = new jsPDF({putOnlyUsedFonts: true});
        doc.setFontSize(30);
        doc.text("Mi apuesta", 20, 20);
    
        doc.setFontSize(22);
        doc.text("Codigo de la jugada: " + parlay.id, 20, 40);

        const data = parlay.list.map((row) =>  ({
            "Codigo del Juego": String(row.game.id), 
            "Equipo 1": row.game.team_1.name , 
            "Equipo 2": row.game.team_2.name , 
            "Ganador": row.winner.name,
        }))

        const headers = createHeaders([
            "Codigo del Juego",
            "Equipo 1",
            "Equipo 2",
            "Ganador",
        ]);  
        
        doc.table(20,60,data,headers ,{ autoSize: true });

        doc.setFontSize(22);
        doc.text("Monto apostado:", 20, 120);
        doc.text("$" + parlay.amount, 20, 130);
    
        doc.save(`apuesta-${parlay.id}.pdf`);

        navigate('/list');
    }


    return ( 
        <div className="container-fluid">
            <div className="my-5 d-flex justify-content-between">
                <h1>Crear</h1>
                <button className="btn btn-success" onClick={() => navigate('/list')}>Mis apuestas 💸</button>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <LeagueSearch 
                        league={league}
                        selectLeague={selectLeague} 
                        clearLeague={clearLeague} 
                    />
                </div>
                <div className="col-md-4">
                 <GameList
                    league={league}
                    games={games}
                    gameAlreadyWinner={gameAlreadyWinner}
                    add={add} 
                 />
                </div>
                <div className="col-md-4">
                    {selectedGames.length > 0 && 
                        <SelectedGames selectedGames={selectedGames} removeGame={removeGame} />
                    }
                    {selectedGames.length === 3 && 
                        <BetAmount saveAll={saveAll} />
                    }
                </div>
            </div>
        </div> 
    )
}

export default New