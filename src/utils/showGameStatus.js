import calculateWinner from './calculateWinner';

const showGameStatus = (squares, xIsNext) => {
    let winner = calculateWinner(squares);
    let full = isNotEmpty(squares);

    if (winner) return `Winner: ${getCurrentPlayer(xIsNext)}`;
    if (!winner && full) return `There's a DRAW`;
    
    return `Next player: ${getNextPlayer(xIsNext)}`;
};

export default showGameStatus;

const getCurrentPlayer = xIsNext => {
    return xIsNext ? 'O' : 'X';
}

export const getNextPlayer = xIsNext => {
    return xIsNext ? 'X' : 'O';
}

const isNotEmpty = squares => {
    return squares.every(square => square != null);
}
