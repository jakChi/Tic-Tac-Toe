import React from 'react';
import ReactDOM from 'react-dom/client';
import "./Game.css";

// class Square extends React.Component {
//     render() {
//         return(
//             <button 
//             className='square' 
//             onClick={() => this.props.onClick()} // ყოველ დაკლიკვაზე რენდერდება
//             >
//                 {this.props.value}
//             </button>
//         )
//     }
// }

function Square (props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {

    renderSquare(i) {
        return <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}        
        />
    }

    render() {
        // const randomizer = Math.random() >= 0.5;
        // const player = this.state.nextX ? "X" : "O";
        // const status = `Next is ${player}`;
        
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // let player;
        // if (winner) {
        //     status = `Winner is ${winner}`;
        // } else {
        //     status = `Next is ${this.state.nextX ? player = "X" : player = "O"}`
        // }

        return(
            <div>
                {/* <div 
                className='status' 
                style={player === "X" || winner === "X" ? {color: "red"} : {color: "blue"}}
                >
                    {status}
                </div> */}
                <div className='board-row'>
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className='board-row'> 
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                </div>
            </div>
            
        )
    }
}

class Game extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            nextX: true,
            stepNum: 0
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNum + 1);
        const current = history[history.length - 1]
        const newSquares = current.squares.slice();

        if(calculateWinner(newSquares) || newSquares[i]) {
            return null;
        }

        newSquares[i] = this.state.nextX ? "X" : "O";
        this.setState({ 
            nextX: !this.state.nextX,
            stepNum: history.length,
            history: history.concat([
                { squares: newSquares }
            ])
        });
    }

    jumpTo (step) {
        this.setState ({
            stepNum: step,
            nextX: (step % 2) === 0 
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNum]; // this is an object in the history array
        const winner = calculateWinner(current.squares);
        const moves = history.map(( step, move ) => {
            const showMoves = move ? 
                `go to move# ${move}` : 
                `go to first move`
            
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{showMoves}</button>
                </li>
            )
        })

        let status;
        let player;

        if (winner) {
            status = `Winner is ${winner}`
        } else {
            status = `Next is ${this.state.nextX ? player = "X" : player = "O"}`
        }
        
        return(
            <div className='game'>
                <div className='status' style={player === "X" || winner === "X" ? {color: "yellow"} : {color: "blue"}}>
                    {status}
                </div>
                <div className='game-board'>
                    <Board 
                    squares = {current.squares}
                    onClick = {(i) => this.handleClick(i)}
                    />
                </div>
                <div className='game-info'>
                    <div className='history-btn'>
                        <ol>{moves}</ol>
                    </div> 
                </div>
            </div>
            
        )
    }
}

function calculateWinner (squares) {
    const winnerLines = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];
    for(let i = 0; i < winnerLines.length; i++) {
        const [ first, sec, third ] = winnerLines[i];
        if (squares[first] && squares[first] === squares[sec] && squares[first] === squares[third]) {
            return squares[first]
        }
    }
    return null;
}

//${"square"}.addClass("animated bouncing");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Game/>
  </React.StrictMode>
);

