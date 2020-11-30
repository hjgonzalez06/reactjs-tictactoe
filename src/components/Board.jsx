import React, { useState } from 'react';
import Square from './Square';

const Board = () => {

    let [squares, setSquares] = useState(Array(9).fill(null));
    let [xIsNext, setXIsNext] = useState(true);

    const renderSquare = i => {
        return <Square
                    value={squares[i]}
                    onClick={() => handleClick(i)}
                />
    }

    const handleClick = i => {
        const newSquares = squares.slice();
        if(calculateWinner(squares) || squares[i]) return;
        newSquares[i] = getNextPlayer();
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    }

    const getCurrentPlayer = () => {
        return xIsNext ? 'O' : 'X';
    }

    const getNextPlayer = () => {
        return xIsNext ? 'X' : 'O';
    }
    
    const getGameStatus = () => {
        let winner = calculateWinner(squares);

        return winner ? `Winner: ${getCurrentPlayer()}` : `Next player: ${getNextPlayer()}`;
    }
    
    const calculateWinner = () => {
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

    const gameStatus = getGameStatus();

    return (
        <>
            <div>
                <div className="status">{gameStatus}</div>
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
        </>
    );

}

export default Board;