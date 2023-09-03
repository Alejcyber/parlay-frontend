
import {useState, useEffect} from 'react'
import {leagues as leaguesArray} from '../../shared/data'

export const LeagueSearch = ({league, selectLeague, clearLeague}) => {

    const [leagues,setLeagues] = useState([]);
    const [search,setSearch] = useState('');

    useEffect(() => {
        setLeagues(leaguesArray)
    }, [])

    const findLeague = (search) => {
        if(search){
            const newArray =  leagues.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
            setLeagues(newArray)
        }else{
            setLeagues(leaguesArray)
        }
    }

    const clear = () => {
        setSearch('')
        setLeagues(leaguesArray)
        clearLeague()
    }

    return (
        <div className="bg-info p-3">

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">🧭</span>
                <input
                    onChange={(e) => { findLeague(e.target.value); setSearch(e.target.value)} } 
                    type="text" 
                    className="form-control" 
                    placeholder="Buscar Liga" 
                    aria-label="Buscar" 
                    aria-describedby="basic-addon1"
                    value={search}
                    />
                <button 
                    onClick={() => clear()}
                    className="input-group-text btn btn-light">
                    Limpiar 🖌️
                </button>
            </div>

            <div className="card my-5" >
                <div className="card-header" style={{fontSize: 30}}>
                    Mis ligas
                </div>
                <ul className="list-group list-group-flush">
                    {leagues.map((item, index) => (
                    <li key={index} 
                        className={league && league.id === item.id ? "list-group-item col bg-info" : "list-group-item col"} 
                        onClick={() => {selectLeague(item)}}>
                        
                        <div className="row">
                            <span> {item.type} | {item.name} </span>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>

        </div>
    )

}

export default LeagueSearch