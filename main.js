const displayController = (() => {
	let para = document.querySelector('.game_flow')
	let gameIsDone = false
	main.onclick = (e) => {
		let target = e.target

		// clearing gameboard
		if (target.className === 'restart_button') {
			gameBoard.clearGameboard()
			gameBoard.isXturn = true
			para.textContent = `Player X's turn`
			displayController.gameIsDone = false
			gameBoard.cells.forEach(item => item.classList.remove('non_clickable'))
		}

		// return if game is done
		if (displayController.gameIsDone) return

		// return if cell is already populated
		if (target.className === 'cell' && target.textContent !== '') return

		let index = gameBoard.cells.indexOf(target)
		let xTurn = target.className === 'cell' && gameBoard.isXturn
		let oTurn = target.className === 'cell' && !gameBoard.isXturn

		// turns logic
		if (xTurn) {
			target.textContent = player1.marker
			gameBoard.gameboard[index] = target.textContent
			gameBoard.isXturn = false
			para.textContent = `Player O's turn`
		} else if (oTurn) {
			target.textContent = player2.marker
			gameBoard.gameboard[index] = target.textContent
			gameBoard.isXturn = true
			para.textContent = `Player X's turn`
		}

		gameBoard.checkWinner()
	}
	return {para, gameIsDone}
})()

const gameBoard = (() => {
	const gameboard = []
	let isXturn = true
	const cells = Array.from(document.querySelectorAll('.cell'))

	const clearGameboard = (() => {
		cells.forEach(item => item.textContent = '')
		gameboard.length = 0
	})

	const checkWinner = (() => {
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

		if (win1 || win2 || win3 || win4 || win5 || win6 || win7 || win8) {
			displayController.para.textContent = `Game over. Player X has won`
			displayController.gameIsDone = true
			cells.forEach(item => item.classList.add('non_clickable'))
		} else if (win9 || win10 || win11 || win12 || win13 || win14 || win15 || win16) {
			displayController.para.textContent = `Game over. Player O has won`
			displayController.gameIsDone = true
			cells.forEach(item => item.classList.add('non_clickable'))
		} else if (!gameboard.includes(undefined) && gameboard.length === 9) {
			displayController.para.textContent = `Game over. It's a tie`
			displayController.gameIsDone = true
			cells.forEach(item => item.classList.add('non_clickable'))
		}
	})

	return { gameboard, isXturn, cells, clearGameboard, checkWinner }
})()

const Player = (name, marker) => {
	return { name, marker }
}

const player1 = Player('Player 1', 'X')
const player2 = Player('Player 2', 'O')
