const startBtn = document.getElementById('start-btn')
const playerOne = document.getElementById('player1')
const playerTwo = document.getElementById('player2')
const playerScreen = document.getElementById('players')
const gameScreen = document.getElementById('table')
const winnerScreen = document.getElementById('winner-screen')
const cells = document.querySelectorAll('[data-cell]')
let turn = 0
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
    
    const playerOneName = playerOne.value
    const playerTwoName = playerTwo.value

    if (playerOneName === '' || playerTwoName === '') {
        alert('Preencha os nomes!')
    } else {
        playerScreen.style.display = 'none'
        gameScreen.style.display = 'grid'
    }
})

function currentPlayer() {
    return turn % 2 === 0 ? 'X' : 'O'
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
            gameScreen.style.display = 'none'
            winnerScreen.style.display = 'flex'
            const winnerHeader = document.createElement('h1')
            winnerHeader.textContent = cells[a].textContent + ' venceu!'
            winnerScreen.appendChild(winnerHeader)
            return
        }
    }

    if ([...cells].every(cell => cell.textContent !== '')) {
            playerScreen.style.display = 'none'
            gameScreen.style.display = 'none'
            winnerScreen.style.display = 'flex'
            const winnerHeader = document.createElement('h1')
            winnerHeader.textContent = 'Deu velha! :)'
            winnerScreen.appendChild(winnerHeader)
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