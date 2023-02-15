import { comboGanador } from '../constanst'

export const checkWinFrom = (boardToCheck) => {
  // se revisan todas las combinaciones ganadoras
  // para ver si algun jugador ha ganado
  for (const combo of comboGanador) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  // si no hay ganador
  return null
}

export const checkEmpate = (newBoard) => {
  return newBoard.every((square) => square !== null)
}
