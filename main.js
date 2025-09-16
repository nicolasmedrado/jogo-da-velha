let turn = 0
let playerOneScore = 0
let playerTwoScore = 0
let playerOneShowScore = document.getElementById('player-one-score')
let playerTwoShowScore = document.getElementById('player-two-score')
const startBtn = document.getElementById('start-btn')
const resetBtn = document.getElementById('reset-table')
const menuBtn = document.getElementById('reset-game')
const playerOne = document.getElementById('player1')
const playerTwo = document.getElementById('player2')
const playerScreen = document.getElementById('players')
const gameTable = document.getElementById('table')
const gameScreen = document.getElementById('game-screen')
const playerScore = document.getElementById('score')
const winnerScreen = document.getElementById('winner-screen')
const winnerHeader = document.getElementById('game-result')
const cells = document.querySelectorAll('[data-cell]')
const winningSequences = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    
    document.getElementById('player-one-name').innerText = playerOne.value + ': '
    document.getElementById('player-two-name').innerText = playerTwo.value + ': '

    playerOneShowScore.innerText = '0'
    playerTwoShowScore.innerText = '0'

    if (playerOne === '' || playerTwo === '') {
        alert('Preencha os nomes!')
    } else {
        playerOne.value = ''
        playerTwo.value = ''
        playerScore.style.display = 'flex'
        playerScreen.style.display = 'none'
        gameScreen.style.display = 'flex'
        gameScreen.style.flexDirection = 'column'
        gameTable.style.display = 'grid'
    }
})

resetBtn.addEventListener('click', (event) => {
    event.preventDefault()
    playerScreen.style.display = 'none'
    playerScore.style.display = 'flex'
    winnerScreen.style.display = 'none'
    gameScreen.style.display = 'flex'
    gameTable.style.display = 'grid'
    clearTable()
})

menuBtn.addEventListener('click', (event) => {
    event.preventDefault()
    playerScreen.style.display = 'flex'
    winnerScreen.style.display = 'none'
    gameTable.style.display = 'none'
    gameScreen.style.display = 'none'
    playerOneScore = 0
    playerTwoScore = 0
    playerOneShowScore.innerText = '0'
    playerTwoShowScore.innerText = '0'
    clearTable()
})

function currentPlayer() {
    return turn % 2 === 0 ? 'X' : 'O'
}

function clearTable() {
    turn = 0
    cells.forEach(cell => {
        cell.textContent = ''
    })
}

function checkWinner() {
    for (let combo of winningSequences) {
        const [a, b, c] = combo
        
        if (
            cells[a].textContent !== '' &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            playerScreen.style.display = 'none'
            gameTable.style.display = 'none'
            winnerScreen.style.display = 'flex'
            playerScore.style.display = 'none'
            const winnerHeader = document.getElementById('game-result')
            winnerHeader.textContent = cells[a].textContent + ' venceu!'
            if (cells[a].textContent === 'X') {
                playerOneScore += 1
                playerOneShowScore.innerText = ' ' + playerOneScore
            } else if (cells[a].textContent === 'O') {
                playerTwoScore += 1
                playerTwoShowScore.innerText = ' ' + playerTwoScore
            }
            return
        }
    }

    if ([...cells].every(cell => cell.textContent !== '')) {
            playerScreen.style.display = 'none'
            gameTable.style.display = 'none'
            gameScreen.style.display = 'none'
            winnerScreen.style.display = 'flex'
            winnerHeader.textContent = 'Deu velha! :)'

    }

    return null
}

cells.forEach(cell => {
    cell.addEventListener('click', (event) => {
        event.preventDefault()
        if (cell.textContent === '') {
            cell.textContent = currentPlayer()
            turn++
            checkWinner()
        }
    })
})