import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from './components/Square.jsx'
import { TURN } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'



function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')

    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')

    return turnFromStorage ?? TURN.X
  })
  // null not win yet, fale is draw, true is win
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    // if the square is already filled, do nothing
    if (board[index] || winner) return

    // update the board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // update the turn
    const newTurn = turn === TURN.X ? TURN.O : TURN.X
    setTurn(newTurn)
    //save here match history
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    //review if there is a winner
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // draw
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reinicar el Juego</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                  {square}
                </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURN.X}>
          {TURN.X}
        </Square>
        <Square isSelected={turn === TURN.O}>
          {TURN.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
