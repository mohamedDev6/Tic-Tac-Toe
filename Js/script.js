const mainTitle = document.querySelector(".mainTitle");
const roundTitle = document.getElementById("roundTitle");

const player1Score = document.getElementById("player1");
const player2Score = document.getElementById("player2");

let turn = "X";
let gameOver = false;

let round = 1;
let maxRounds = 3;

let xScore = 0;
let oScore = 0;

// The main Function
function game(id) {
    roundTitle.classList.remove("hide");

    if (gameOver) return;

    let element = document.getElementById(id);

    if (element.textContent !== "") return;

    element.textContent = turn;

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

    turn = turn === "X" ? "O" : "X";
    mainTitle.innerHTML = `It's Player ${turn} Turn`;
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

            mainTitle.innerHTML = `The Player ${squares[a]} wins this round! 🎉`;
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

// End The Game
function endGame() {
    let finalWinner;

    if (xScore > oScore) finalWinner = "Player X 🎉";
    else if (oScore > xScore) finalWinner = "Player O 🎉";
    else finalWinner = "No one";

    mainTitle.innerHTML = `The Final Winner: ${finalWinner}`;
    roundTitle.textContent = "Game Over";

    setTimeout(() => {
        resetAll();
    }, 3000);
}

// Score Update
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

// Check The Final Winner
function checkFinalWinner() {
    if (xScore === maxRounds || oScore === maxRounds) {
        let winner = xScore === maxRounds ? "X" : "O";

        mainTitle.innerHTML = `The Player ${winner} Won The Game! 🎉`;
        roundTitle.textContent = "Game Over";

        setTimeout(() => {
            resetAll();
        }, 3000);
    }
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
const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", () => {
    resetAll();
});
