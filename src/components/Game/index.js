import React, { useState } from 'react';
import './styles.css';
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
    const [ascSort,setAscSort] = useState(true);

    const getMovesHistory = history.map((step, move) => {
        const col = 1 + step.location % 3;
        const row = 1 + Math.floor(step.location / 3);
        const moveText = move ?
            `Go to move #${move} (${col},${row})` :
            'Go to game start';
        const isSelected = (move === stepNumber);

        return (
                <li key={move}>
                    <button
                        className={isSelected ? 'selected-move' : ''}
                        onClick={() => jumpTo(move)}>
                        {moveText}
                    </button>
                </li>
        );
    });

    const sortMovesHistory = ascSort ? getMovesHistory : getMovesHistory.reverse();

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
                squares: newSquares,
                location: i
            }
        ]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    }

    return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={currentSquares}
                        onClick={i => handleClick(i)}
                        winnerLine={winnerLine}
                    />
                </div>
                <div className="game-info">
                    <div className="status">
                        {gameStatus}
                    </div>
                    <div>
                        <button
                            onClick={() => setAscSort(!ascSort)}
                        >
                            {ascSort ? 'Sort DESC' : 'Sort ASC'}
                        </button>
                        <ol>
                            {sortMovesHistory}
                        </ol>
                    </div>
                </div>
            </div>
    );
};

export default Game;
