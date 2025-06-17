const gameBoard = document.getElementById('gameBoard');
        const gameMessage = document.getElementById('gameMessage');
        const resetButton = document.getElementById('resetButton');
        const cells = document.querySelectorAll('.cell'); 
        const winCelebrationMessage = document.getElementById('winCelebrationMessage'); 

        
        let board = ['', '', '', '', '', '', '', '', '']; 
        let currentPlayer = 'X';
        let gameActive = true; 
        const winningConditions = [
            [0, 1, 2], 
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6], 
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], 
            [2, 4, 6]
        ];

        
        function handleCellClick(clickedCellEvent) {
            const clickedCell = clickedCellEvent.target;
            const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

            
            if (board[clickedCellIndex] !== '' || !gameActive) {
                return;
            }

           
            board[clickedCellIndex] = currentPlayer;
            clickedCell.innerHTML = currentPlayer;

            checkResult(); 
        }

       
        function checkResult() {
            let roundWon = false;
            let winningCombo = null; 
            for (let i = 0; i < winningConditions.length; i++) {
                const winCondition = winningConditions[i];
                let a = board[winCondition[0]];
                let b = board[winCondition[1]];
                let c = board[winCondition[2]];

               
                if (a === '' || b === '' || c === '') {
                    continue;
                }

                
                if (a === b && b === c) {
                    roundWon = true;
                    winningCombo = winCondition; 
                    break;
                }
            }

            if (roundWon) {
                gameMessage.innerHTML = ''; 
                winCelebrationMessage.innerHTML = `🎉 Player ${currentPlayer} Wins! 🎉`; // Display win message
                winCelebrationMessage.style.opacity = 1; 
                winCelebrationMessage.style.transform = 'translateY(0)'; s
                winningCombo.forEach(index => {
                    cells[index].classList.add('winning-cell');
                });

                gameActive = false;
                return;
            }

            
            let roundTie = !board.includes(''); 
            if (roundTie) {
                gameMessage.innerHTML = 'It\'s a Tie!';
                winCelebrationMessage.innerHTML = ''; 
                winCelebrationMessage.style.opacity = 0; 
                gameActive = false;
                return;
            }

            
            switchPlayer();
        }

        
        function switchPlayer() {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            gameMessage.innerHTML = `Player ${currentPlayer}'s Turn`;
        }

        
        function handleResetGame() {
            board = ['', '', '', '', '', '', '', '', '']; 
            currentPlayer = 'X'; 
            gameActive = true; 
            gameMessage.innerHTML = `Player ${currentPlayer}'s Turn`; 
            winCelebrationMessage.innerHTML = ''; 
            winCelebrationMessage.style.opacity = 0;
            winCelebrationMessage.style.transform = 'translateY(20px)'; 
            
            cells.forEach(cell => {
                cell.innerHTML = '';
                cell.classList.remove('winning-cell');
            });
        }

       
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });

        
        resetButton.addEventListener('click', handleResetGame);

       
        gameMessage.innerHTML = `Player ${currentPlayer}'s Turn`;



        // Inside the handleCellClick function:
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    // --- ADD THIS CODE HERE ---
    if (currentPlayer === 'X') {
        clickedCell.classList.add('player-x');
        clickedCell.classList.remove('player-o'); // Ensure only 'player-x' is active
    } else { // currentPlayer is 'O'
        clickedCell.classList.add('player-o');
        clickedCell.classList.remove('player-x'); // Ensure only 'player-o' is active
    }
    // --- END OF ADDITION ---

    checkResult();
}