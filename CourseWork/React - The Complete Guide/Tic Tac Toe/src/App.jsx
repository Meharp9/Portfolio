import { useState } from "react"
import GameBoard from "./components/GameBoard.jsx"
import Player from "./components/Player.jsx"
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null], 
  [null, null, null], 
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
        winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (let turn of gameTurns) {
    const rowIndex = turn['square'][0];
    const colIndex = turn['square'][1];
    gameBoard[rowIndex][colIndex] = turn['player'];
  }

  return gameBoard;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  
  const currPlayer = deriveActivePlayer(gameTurns);
  const gameBoard =  deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  const restartGame = () => {
    setGameTurns([]);
  }

  const updatePlayerNameHandler = (symbol, newName) => {
    setPlayers((currPlayerNames) => {
      return {
        ...currPlayerNames,
        [symbol]: newName
      }
    }
  )};
  
  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns(prevTurns => {
      const currPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {
          square: [rowIndex, colIndex],
          player: currPlayer
        },
        ...prevTurns
      ]

      return updatedTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={currPlayer === 'X'} updateName={updatePlayerNameHandler}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={currPlayer === 'O'} updateName={updatePlayerNameHandler}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={restartGame}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log gameTurns={gameTurns}/>
    </main>
  )
};

export default App;
