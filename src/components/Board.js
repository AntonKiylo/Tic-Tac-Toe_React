import React, { useState } from 'react';
import Square from './Square';

function Board() {
    const [state, setState] = useState({
        squares: Array(9).fill(null),
        xIsNext: true,
    });

    const winner = calculateWinner(state.squares);
    
    let status;
    
    if (winner) {
        status = `WINNER IS: ${winner}`;
    } else {
        status = `PLAYER: ${state.xIsNext ? 'X' : 'O'}`;
    };

    function handleClick(i) {
        const squares = state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        };

        squares[i] = state.xIsNext ? 'X' : 'O';
        setState({
            squares: squares,
            xIsNext: !state.xIsNext,
        });
    };

    function renderSquare(i) {
        return (
            <Square
                value={state.squares[i]}
                onClick={() => handleClick(i)}
            />
        )
    };

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            };
        };
    };

    return (
        <div className='game-field'>
            <h1>{status}</h1>
            <div className='board-wrapper'>
                <div>
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div>
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div>
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
        </div>
    );
}

export default Board;