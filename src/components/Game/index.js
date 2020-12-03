import React, { useState } from 'react';
import Board from '../Board';

const Game = () => {

    const [history, setHistory] = useState([
        {
            squares: Array(9).fill(null)
        }
    ]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const currentSquares = history[stepNumber].squares;
    const gameStatus = showGameStatus(currentSquares, xIsNext);

    const getMovesHistory = history.map((step, move) => {
        const desc = move ?
            `Go to move #${move}` :
            'Go to game start';

        return (
            <>
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{desc}</button>
                </li>
            </>
        );
    });

    const jumpTo = step => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }
    
    const handleClick = i => {
        const newHistory = history.slice(0, stepNumber+1);
        const currentSquares = newHistory[newHistory.length-1].squares;
        const newSquares = currentSquares.slice();
        if(calculateWinner(newSquares) || newSquares[i]) return;
        newSquares[i] = getNextPlayer(xIsNext);
        setHistory(newHistory.concat([
            {
                squares: newSquares
            }
        ]));
        setStepNumber(newHistory.length);
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
                    <ol>
                        {getMovesHistory}
                    </ol>
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

const showGameStatus = (squares, xIsNext) => {
    let winner = calculateWinner(squares);
    let full = isNotEmpty(squares);

    return winner ? `Winner: ${getCurrentPlayer(xIsNext)}` :
           full ? `There's a DRAW` : `Next player: ${getNextPlayer(xIsNext)}`;
}

const isNotEmpty = squares => {
    return squares.every(square => square != null);
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