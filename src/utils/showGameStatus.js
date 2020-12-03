import calculateWinner from './calculateWinner';

const showGameStatus = (squares, xIsNext) => {
    let winner = calculateWinner(squares);
    let full = isNotEmpty(squares);

    return winner ? `Winner: ${getCurrentPlayer(xIsNext)}` :
           full ? `There's a DRAW` : `Next player: ${getNextPlayer(xIsNext)}`;
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