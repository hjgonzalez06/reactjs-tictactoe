import React from 'react';
import './styles.css';

const Square = ({ value, onClick, winnerSquare }) => {

    return (
        <button
            className={winnerSquare ? "winner-square" : "square"}
            onClick={onClick}
        >
            {value}
        </button>
    );

};

export default Square;