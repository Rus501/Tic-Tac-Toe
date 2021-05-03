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

		gameBoard.isWinner(player1.marker)
		gameBoard.isWinner(player2.marker)

		if (gameBoard.winner === 'X') {
			playerTurn.textContent = `Game over. Player X has won`
		} else if (gameBoard.winner === 'O') {
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
		gameBoard.winner = null
		playerTurn.textContent = `Player X's turn`
		cells.forEach(item => {
			item.classList.remove('non_clickable')
			item.textContent = ''
		})
	}
})()

const gameBoard = (() => {
	const gameboard = []
	const winner = null

	const clearGameboardArray = () => gameboard.length = 0

	const _checkCondition = (n1, n2, n3, mark) => {
	   if (gameboard[n1] === mark && gameboard[n2] === mark && gameboard[n3] === mark) { 
	   	gameBoard.winner = mark 
	   }
	}

	const isWinner = mark => {
		_checkCondition(0, 1, 2, mark)
		_checkCondition(3, 4, 5, mark)
		_checkCondition(6, 7, 8, mark)
		_checkCondition(0, 3, 6, mark)
		_checkCondition(1, 4, 7, mark)
		_checkCondition(2, 5, 8, mark)
		_checkCondition(0, 4, 8, mark)
		_checkCondition(2, 4, 6, mark)
	}

	return { gameboard, winner, clearGameboardArray, isWinner }
})()

const Player = (name, marker) => {
	return { name, marker }
}

const player1 = Player('Player 1', 'X')
const player2 = Player('Player 2', 'O')