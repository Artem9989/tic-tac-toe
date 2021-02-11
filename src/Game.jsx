import React, {useState, memo} from 'react'
import Board from './board.jsx'
import calculateWinner from './helpers/calculateWinner.js'

const Game = () => {

// const state = {
//     xIsNext: true,
//     stepNumber: 0,
//     history: [{
//         squares: Array(9).fill(null)
//     }]
// };
const [xIsNext, setxIsNext] = useState(true);
const [history, sethistory] = useState([{squares: Array(9).fill(null)}]);
const [stepNumber, setstepNumber] = useState(0);

const handleClick = (i) =>{
    const current = history[history.length -1];
    const squares = current.squares.slice();
    
    if (calculateWinner(squares) || squares[i]){
        return;
    }
    squares [i] = xIsNext? 'X': 'O';
    setxIsNext(!xIsNext);
    sethistory(history.concat([{squares}]));
    setstepNumber(stepNumber+1)
}
const paintMoves = () => {
    return history.map((step,move)=> {
        const desc = move? ('Move№ ' + move) : 'game start';
        return (
            <li key={move}> <a href="#" onClick={() => jumpTo(move)}>{desc}</a>
             </li>
        )
    })
}
const jumpTo = (step) => {
    setstepNumber(step);
    setxIsNext ((step%2)? false:true)
}
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    
    let status;
    if(winner){
        status = 'Winner is:' + winner;
        
    } 
    else {
        status='Next player is: ' + (xIsNext? 'X': '0')
    }
    return (
        <div>
            <h1>
                Hello gamer
            </h1>
            <div className='game'>
                <div className='game-board'>
                    <Board
                        squares={current.squares}
                        onClick={(i)=> handleClick(i)}
                    />
                </div>
                <div className='game-info'>
                    <div>
                        {status}
                    </div>
                    <ul>
                        {paintMoves()}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default memo(Game);