import React, { useState } from 'react';
import Square from './Square';

const Board = () => {

    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isX, setIsX] = useState(true);

    const handleClick = (i) => {
        // if there is a winner prevent players to make turn
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        // the current square, if isX is true, we have X if not its O
        squares[i] = isX ? 'X' : 'O';
        setSquares(squares);
        // Boolean value for the other letter be used for the next turn
        setIsX(!isX);
    }

    const calculateWinner = (squares) => {
        const winningPatters = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for (let i = 0; i < winningPatters.length; i++) {
            // deconstructing winning patterns
            const [a, b, c] = winningPatters[i];

            // if one of the players reach it one of the winning patters it means that he won
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        // otherwise, none of the players won the game yet
        return null;
    }

    // variable helper function 
    const winner = calculateWinner(squares);
    let status;

    if (winner) {
        status = `Winner ${winner}`;
    } else {
        status = `Next player: ${isX ? 'X' : 'O'}`;
    }

    const handleRestart = () => {
        // reset the X to be the first player 
        setIsX(true);
        setSquares(Array(9).fill(null));
    }

    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() => handleClick(i)} />
    }

    return (
        <>
            <div className='board'>
                <div className='board-row'>
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className='board-row'>
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className='board-row'>
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
                <div className='status'>{status}</div>
                <button className='restart' onClick={handleRestart}>Restart Game</button>
            </div>
        </>
    );
}

export default Board;