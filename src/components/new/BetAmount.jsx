import React,  {useState} from "react"
import {validateNumber} from "../../shared/validations"


const BetAmount = ({saveAll}) => {

    const [amount, setAmount] = useState('1.00');
    const [error, setError] = useState(null);


    const save = (e) => {
        e.preventDefault()

        const msg = validateNumber(Number(amount))
        if(msg){
            setError(msg)
            return
        }
        saveAll(amount)
    }

    return (
        <form className="form-group my-3 p-3 bg-info" onSubmit={(e) => save(e)}>
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
        </form>
    )
}

export default BetAmount
