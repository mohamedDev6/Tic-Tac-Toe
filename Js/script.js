const mainTitle = document.querySelector(".mainTitle");
const roundTitle = document.getElementById("roundTitle");

const player1Score = document.getElementById("player1");
const player2Score = document.getElementById("player2");

const player1Label = document.getElementById("player1Label");
const player2Label = document.getElementById("player2Label");

const resetBtn = document.querySelector(".reset");

let turn = "X";
let gameOver = false;

let round = 1;
let maxRounds = 3;

let xScore = 0;
let oScore = 0;

let gameMode = "pvp";

// Game Mode
function setMode(mode) {
    gameMode = mode;

    resetAll();

    if (mode === "ai") {
        mainTitle.innerHTML = "Player vs Computer";

        player1Label.textContent = "Player";
        player2Label.textContent = "Computer";
    } else {
        mainTitle.innerHTML = "Player vs Player";

        player1Label.textContent = "Player X";
        player2Label.textContent = "Player O";
    }
}

// Main Game Function
function game(id) {
    roundTitle.classList.remove("hide");

    if (gameOver) return;

    let element = document.getElementById(id);

    if (element.textContent !== "") return;

    // Prevent clicking during computer turn
    if (gameMode === "ai" && turn !== "X") return;

    element.textContent = turn;

    getResultOfRound();

    // AI MODE
    if (gameMode === "ai") {
        turn = "O";

        mainTitle.innerHTML = "Computer Thinking...";

        setTimeout(() => {
            computerMove();
        }, 500);
    } else {
        // PVP MODE
        turn = turn === "X" ? "O" : "X";

        mainTitle.innerHTML = `It's Player ${turn} Turn`;
    }
}

// Computer Move
function computerMove() {
    if (gameOver) return;

    let emptySquares = [];

    for (let i = 1; i <= 9; i++) {
        let cell = document.getElementById("item" + i);

        if (cell.textContent === "") {
            emptySquares.push(cell);
        }
    }

    if (emptySquares.length === 0) return;

    let randomIndex = Math.floor(Math.random() * emptySquares.length);

    let randomCell = emptySquares[randomIndex];

    randomCell.textContent = "O";

    getResultOfRound();

    turn = "X";

    mainTitle.innerHTML = "It's Player X Turn";
}

// Check the result of round
function getResultOfRound() {
    if (checkWin()) {
        gameOver = true;
        round++;

        setTimeout(resetGame, 1500);
        return;
    }

    if (isDraw()) {
        gameOver = true;
        round++;

        mainTitle.innerHTML = "It's a Tie! 🤝";

        setTimeout(resetGame, 1500);
        return;
    }
}

// Check Win
function checkWin() {
    let squares = [];

    for (let i = 1; i <= 9; i++) {
        squares[i] = document.getElementById("item" + i).textContent;
    }

    let winCases = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],

        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],

        [1, 5, 9],
        [3, 5, 7],
    ];

    for (let [a, b, c] of winCases) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            document.getElementById("item" + a).style.backgroundColor = "#08006c";

            document.getElementById("item" + b).style.backgroundColor = "#08006c";

            document.getElementById("item" + c).style.backgroundColor = "#08006c";

            updateScore(squares[a]);

            mainTitle.innerHTML = `The ${squares[a]} Wins This Round! 🎉`;

            return true;
        }
    }

    return false;
}

// Check Draw
function isDraw() {
    let squares = [];

    for (let i = 1; i <= 9; i++) {
        squares.push(document.getElementById("item" + i).textContent);
    }

    return squares.every((cell) => cell !== "");
}

// Update Score
function updateScore(winner) {
    if (winner === "X") {
        xScore++;
        player1Score.textContent = xScore;
    } else {
        oScore++;
        player2Score.textContent = oScore;
    }

    checkFinalWinner();
}

// Final Winner Check
function checkFinalWinner() {
    if (xScore === maxRounds || oScore === maxRounds) {
        gameOver = true;

        let winner = xScore === maxRounds ? "X" : "O";

        mainTitle.innerHTML = `Player ${winner} Won The Game! 🎉`;

        roundTitle.textContent = "Game Over";

        setTimeout(() => {
            resetAll();
        }, 3000);
    }
}

// Reset Round
function resetGame() {
    for (let i = 1; i <= 9; i++) {
        let cell = document.getElementById("item" + i);

        cell.textContent = "";

        cell.style.backgroundColor = "#170fb3ce";
    }

    turn = "X";

    gameOver = false;

    if (round > maxRounds) {
        endGame();
        return;
    }

    mainTitle.innerHTML = "<span>X O</span> Game";
    roundTitle.textContent = `Round ${round}`;
}

// End Game
function endGame() {
    let finalWinner;

    if (xScore > oScore) {
        finalWinner = "Player X 🎉";
    } else if (oScore > xScore) {
        finalWinner = "Player O 🎉";
    } else {
        finalWinner = "No One";
    }

    mainTitle.innerHTML = `Final Winner: ${finalWinner}`;

    roundTitle.textContent = "Game Over";

    setTimeout(() => {
        resetAll();
    }, 3000);
}

// Reset All
function resetAll() {
    round = 1;

    xScore = 0;
    oScore = 0;

    player1Score.textContent = 0;
    player2Score.textContent = 0;

    roundTitle.classList.add("hide");

    gameOver = false;

    resetGame();
}

// Reset Button
resetBtn.addEventListener("click", () => {
    resetAll();
});
