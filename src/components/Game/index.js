import React, { useState } from 'react';
import Board from '../Board';
import calculateWinner from '../../utils/calculateWinner';
import showGameStatus, { getNextPlayer } from '../../utils/showGameStatus';

const Game = () => {

    const [history, setHistory] = useState([
        {
            squares: Array(9).fill(null)
        }
    ]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const currentSquares = history[stepNumber].squares;
    const winnerLine = calculateWinner(currentSquares);
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
        if(winnerLine || newSquares[i]) return;
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
                        winnerLine={winnerLine}
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

export default Game;