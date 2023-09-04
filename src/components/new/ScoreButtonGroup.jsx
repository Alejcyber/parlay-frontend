import { useState } from "react"
import ScoreButton from "./ScoreButton"

const ScoreButtonGroup = ({game, add, removebyGame}) => {

    const [score1, setScore1] = useState(0)
    const [score2, setScore2] = useState(0)

    const changeScore1 = (score) => {
        if(score !== 0 ){
            setScore2(0)
        }
        setScore1(score)
        add(game,score, null)

    }

    const changeScore2 = (score) => {
        if(score !== 0 ){
            setScore1(0)
        }
        setScore2(score)
        add(game, null, score)
    }

    const reset = () => {
        setScore1(0)
        setScore2(0)
    }

    return (
        <div className="col">
            <div className="d-flex justify-content-between">
                <ScoreButton score={score1} changeScore={changeScore1}  />
                <ScoreButton score={score2} changeScore={changeScore2}  />
            </div>
            {(score1 !== 0 || score2 !== 0) &&
            <div className="row mt-1">
                <button className="btn btn-danger" onClick={() => {removebyGame(game);reset()}}>Quitar</button>
            </div>}
        </div>
    )
}

export default ScoreButtonGroup