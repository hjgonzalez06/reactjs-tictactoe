import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

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

Square.propTypes = {
    value: PropTypes.number,
    onClick: PropTypes.func,
    winnerSquare: PropTypes.func
};

export default Square;