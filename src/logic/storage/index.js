export const saveGameToStorage = (board, turn) => {
    //save here match history
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
}

export const resetGameToStorage = () => {
    //reset here match history
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}