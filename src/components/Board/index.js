import React from 'react';
import './styles.css';
import Square from '../Square';

const Board = ({ squares, onClick, winnerLine}) => {

    const isWinnerSquare = (i, winnerLine) => {
        if(!winnerLine) return;
        const [a, b, c] = winnerLine;
        return i === a || i === b || i === c;
    };

    const renderSquare = squareIndex => {
        return (
            <Square
                value={squares[squareIndex]}
                onClick={() => onClick(squareIndex)}
                winnerSquare={isWinnerSquare(squareIndex,winnerLine)}
            />
        )
    }
    
    const renderRows = rowIndex => {
        const row = [rowIndex,rowIndex+1,rowIndex+2].map(i => renderSquare(i));
        return (
            <div
                key={rowIndex}
                className="board-row">
                {row}    
            </div>
        );
    };

    const board = [0,3,6].map(i => renderRows(i));

    return (
        <div>
            {board}
        </div>
    );

}

export default Board;
