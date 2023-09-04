import { useState } from "react"

const ScoreButton = ({score, changeScore}) => {

    const scoreClass = () => {
        if(score > 0) {
            return "bg-success row"
        } else if(score < 0) {
            return "bg-danger row"
        }else{
            return "row"
        }
    }

    return (
        <div className={scoreClass()}>
            <button onClick={() => changeScore(score + 1)}>➕</button>
            <span>{score}</span>
            <button onClick={() => changeScore(score - 1)}>➖</button>
        </div>
    )
}

export default ScoreButton