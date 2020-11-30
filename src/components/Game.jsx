import React, { useState } from 'react';
import Board from './Board';

const Game = () => {

    let [history, setHistory] = useState([
        {
            squares: Array(9).fill(null)
        }
    ]);
    let [stepNumber, setStepNumber] = useState(0);
    let [xIsNext, setXIsNext] = useState(true);
    const newHistory = history;
    const currentSquares = newHistory[newHistory.length-1].squares;
    const gameStatus = getGameStatus(currentSquares, xIsNext);

    const handleClick = i => {
        const newHistory = history;
        const currentSquares = newHistory[newHistory.length-1].squares;
        const newSquares = currentSquares.slice();
        if(calculateWinner(newSquares) || newSquares[i]) return;
        newSquares[i] = getNextPlayer(xIsNext);
        setHistory(newHistory.concat([
            {
                squares: newSquares
            }
        ]));
        setXIsNext(!xIsNext);
    }

    return (
        <>
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={currentSquares}
                        onClick={i => handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>
                        {gameStatus}
                    </div>
                    <div>
                        Moves
                    </div>
                </div>
            </div>
        </>
    );

};

const getCurrentPlayer = xIsNext => {
    return xIsNext ? 'O' : 'X';
}

const getNextPlayer = xIsNext => {
    return xIsNext ? 'X' : 'O';
}

const getGameStatus = (squares, xIsNext) => {
    let winner = calculateWinner(squares);

    return winner ? `Winner: ${getCurrentPlayer(xIsNext)}` : `Next player: ${getNextPlayer(xIsNext)}`;
}

const calculateWinner = squares => {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    return lines.find(line => {
        const [a, b, c] = line;
        return (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]);
    });
};

export default Game;