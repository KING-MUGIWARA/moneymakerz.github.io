document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const betInput = document.getElementById('betAmount');
    const startGameBtn = document.getElementById('startGame');
    const balanceDisplay = document.getElementById('currentBalance');

    let player = 'X';
    let computer = 'O';
    let currentPlayer = player;
    let gameOver = false;
    let pot = 0;

    // Fetch current balance from localStorage
    let currentBalance = parseFloat(localStorage.getItem('currentBalance')) || 0;
    balanceDisplay.textContent = 'Current Balance: ₦' + currentBalance.toFixed(2);

    function startGame() {
        pot = parseInt(betInput.value);
        if (isNaN(pot) || pot <= 0) {
            alert("Please enter a valid bet amount.");
            return;
        }
        
        // Deduct bet amount from current balance
        if (pot > currentBalance) {
            alert("Insufficient balance.");
            return;
        }
        currentBalance -= pot;
        // Update balance display
        balanceDisplay.textContent = 'Current Balance: ₦' + currentBalance.toFixed(2);
        // Store updated balance in localStorage
        localStorage.setItem('currentBalance', currentBalance.toFixed(2));

        betInput.disabled = true;
        startGameBtn.disabled = true;
        cells.forEach(cell => {
            cell.innerText = '';
            cell.addEventListener('click', handleClick, { once: true });
        });
        gameOver = false;
        message.innerText = "Your Turn...";
    }

    function handleClick(e) {
        const cell = e.target;
        if (cell.innerText !== '' || gameOver) return;
        cell.innerText = currentPlayer;
        if (checkWin(currentPlayer)) {
            message.innerText = `${currentPlayer} wins! Collect your prize of ₦${pot * 0.5}!`;
            gameOver = true;
            currentBalance += pot * 0.5; // Add 50% of the pot to the current balance
        } else if (checkDraw()) {
            message.innerText = "It's a draw!";
            gameOver = true;
            currentBalance -= pot * 0.5; // Deduct 50% of the pot from the current balance
            balanceDisplay.textContent = 'Current Balance: ₦' + currentBalance.toFixed(2); // Update balance display
        } else {
            currentPlayer = currentPlayer === player ? computer : player;
            if(currentPlayer === computer) {
                computerTurn();
            } else {
                message.innerText = "Your Turn...";
            }
        }
        // Update balance display
        balanceDisplay.textContent = 'Current Balance: ₦' + currentBalance.toFixed(2);
        // Store updated balance in localStorage
        localStorage.setItem('currentBalance', currentBalance.toFixed(2));
        
        // Enable Start Game button when game ends
        startGameBtn.disabled = false;
        betInput.disabled = false; // Enable bet input field when game ends
    }

    function computerTurn() {
        let emptyCells = [...cells].filter(cell => cell.innerText === '');
        let bestMoveIndex = -1;
        let bestScore = -Infinity;
        
        // Iterate through empty cells to find the best move
        emptyCells.forEach((cell, index) => {
            cell.innerText = computer; // Try the move
            
            // Evaluate the move
            let score = minimax(cells, 0, false);
            
            // Undo the move
            cell.innerText = '';
            
            // Update the best move if necessary
            if (score > bestScore) {
                bestScore = score;
                bestMoveIndex = index;
            }
        });
        
        // Make the best move
        emptyCells[bestMoveIndex].innerText = computer;
        
        // Check if computer wins
        if (checkWin(computer)) {
            message.innerText = `${computer} wins! Better luck next time...`;
            gameOver = true;
        } else if (checkDraw()) {
            message.innerText = "It's a draw!";
            gameOver = true;
            currentBalance -= pot * 0.5; // Deduct 50% of the pot from the current balance
            balanceDisplay.textContent = 'Current Balance: ₦' + currentBalance.toFixed(2); // Update balance display
        } else {
            currentPlayer = player;
            message.innerText = "Your Turn...";
        }
        
        // Enable Start Game button when game ends
        startGameBtn.disabled = false;
        betInput.disabled = false; // Enable bet input field when game ends
    }

    // Minimax algorithm to determine the best move for the computer
    function minimax(board, depth, isMaximizing) {
        if (checkWin(player)) {
            return -10;
        } else if (checkWin(computer)) {
            return 10;
        } else if (checkDraw()) {
            return 0;
        }
    
        if (isMaximizing) {
            let bestScore = -Infinity;
            board.forEach((cell, index) => {
                if (cell.innerText === '') {
                    cell.innerText = computer;
                    let score = minimax(board, depth + 1, false);
                    cell.innerText = '';
                    bestScore = Math.max(score, bestScore);
                }
            });
            return bestScore;
        } else {
            let bestScore = Infinity;
            board.forEach((cell, index) => {
                if (cell.innerText === '') {
                    cell.innerText = player;
                    let score = minimax(board, depth + 1, true);
                    cell.innerText = '';
                    bestScore = Math.min(score, bestScore);
                }
            });
            return bestScore;
        }
    }

    function checkWin(player) {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winConditions.some(combination => {
            return combination.every(index => {
                return cells[index].innerText === player;
            });
        });
    }

    function checkDraw() {
        if ([...cells].every(cell => cell.innerText !== '')) {
            return true;
        }
        return false;
    }

    startGameBtn.addEventListener('click', startGame);
});
