const displayController = (() => {
	const gameGrid = document.querySelector('.game_container')
	const restartButton = document.querySelector('.restart_button')
	const playerTurn = document.querySelector('.game_flow')
	const cells = Array.from(document.querySelectorAll('.cell'))
	let isXturn = true

	restartButton.addEventListener('click', restartTheGame)
	gameGrid.addEventListener('click', makeTurn)

	function makeTurn(e) {
		let target = e.target

		// return if cell is already populated
		if (target.textContent !== '') return


		// turns logic
		let index = cells.indexOf(target)

		const populateCell = mark => {
			target.textContent = gameBoard.gameboard[index] = mark
			isXturn = !isXturn
		}
		if (isXturn) {
			populateCell(player1.marker)
			playerTurn.textContent = `Player O's turn`
		} else {
			populateCell(player2.marker)
			playerTurn.textContent = `Player X's turn`
		}


		gameBoard.checkWinner()
		if (gameBoard.xWon) {
			playerTurn.textContent = `Game over. Player X has won`
		} else if (gameBoard.xWon === false) {
			playerTurn.textContent = `Game over. Player O has won`
		// checking for a tie. If we have no empty cells and the board is full
		} else if (!gameBoard.gameboard.includes(undefined) && gameBoard.gameboard.length === 9) {
			playerTurn.textContent = `Game over. It's a tie`
		}

		// making cells unclickable if the game is done
		if (playerTurn.textContent.includes('Game over')) 
			cells.forEach(item => item.classList.add('non_clickable'))
	}

	function restartTheGame() {
		gameBoard.clearGameboardArray()
		isXturn = true
		gameBoard.xWon = null
		playerTurn.textContent = `Player X's turn`
		cells.forEach(item => {
			item.classList.remove('non_clickable')
			item.textContent = ''
		})
	}
})()

const gameBoard = (() => {
	const gameboard = []
	let xWon = null

	const clearGameboardArray = () => gameboard.length = 0

	const checkWinner = () => {
		let win1 = gameboard[0] === 'X' && gameboard[1] ==='X' && gameboard[2] === 'X'
		let win2 = gameboard[3] === 'X' && gameboard[4] ==='X' && gameboard[5] === 'X'
		let win3 = gameboard[6] === 'X' && gameboard[7] ==='X' && gameboard[8] === 'X'
		let win4 = gameboard[0] === 'X' && gameboard[3] ==='X' && gameboard[6] === 'X'
		let win5 = gameboard[1] === 'X' && gameboard[4] ==='X' && gameboard[7] === 'X'
 		let win6 = gameboard[2] === 'X' && gameboard[5] ==='X' && gameboard[8] === 'X'
		let win7 = gameboard[0] === 'X' && gameboard[4] ==='X' && gameboard[8] === 'X'
		let win8 = gameboard[2] === 'X' && gameboard[4] ==='X' && gameboard[6] === 'X'
		let win9 = gameboard[0] === 'O' && gameboard[1] ==='O' && gameboard[2] === 'O'
		let win10 = gameboard[3] === 'O' && gameboard[4] ==='O' && gameboard[5] === 'O'
		let win11 = gameboard[6] === 'O' && gameboard[7] ==='O' && gameboard[8] === 'O'
		let win12 = gameboard[0] === 'O' && gameboard[3] ==='O' && gameboard[6] === 'O'
		let win13 = gameboard[1] === 'O' && gameboard[4] ==='O' && gameboard[7] === 'O'
 		let win14 = gameboard[2] === 'O' && gameboard[5] ==='O' && gameboard[8] === 'O'
		let win15 = gameboard[0] === 'O' && gameboard[4] ==='O' && gameboard[8] === 'O'
		let win16 = gameboard[2] === 'O' && gameboard[4] ==='O' && gameboard[6] === 'O'

		let winX = win1 || win2 || win3 || win4 || win5 || win6 || win7 || win8
		let winO = win9 || win10 || win11 || win12 || win13 || win14 || win15 || win16

		if (winX) {
			gameBoard.xWon = true
		} else if (winO) {
			gameBoard.xWon = false
		}
	}

	return { gameboard, clearGameboardArray, checkWinner, xWon }
})()

const Player = (name, marker) => {
	return { name, marker }
}

const player1 = Player('Player 1', 'X')
const player2 = Player('Player 2', 'O')