import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'
import Square from './components/square'
import { TURNS } from './constanst'
import { checkWinFrom, checkEmpate } from './logic/board'
import WinnerModal from './components/WinnerModal'
import { saveGameStorage, resetGameStorage } from './logic/storage'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // reviso si hay algun ganador
    const newWinner = checkWinFrom(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEmpate(newBoard)) {
      setWinner(false)
    }
  }

  useEffect(() => {
    // guardar
    saveGameStorage({
      board,
      turn
    })
  }, [turn, board])

  return (
    <main className='board'>
      <h1>Triki</h1>
      <button onClick={resetGame}> Resetear juego </button>
      <section className='game'>
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          )
        })}
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}
export default App
