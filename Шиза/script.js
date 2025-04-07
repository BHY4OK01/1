// === 1. Игровое поле ===
let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

// === 2. Отрисовка поля ===
function renderBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            if (board[row][col] !== 0) {
                cell.textContent = board[row][col];
                cell.classList.add(`cell-${board[row][col]}`);
            }
            boardElement.appendChild(cell);
        }
    }
}

// === 3. Добавляем случайную плитку ===
function addRandomTile() {
    const emptyCells = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }

    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

// === 4. Логика движения ===

// Движение влево
function moveLeft() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        let newRow = board[row].filter(cell => cell !== 0);
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                newRow[i + 1] = 0;
                moved = true;
            }
        }
        newRow = newRow.filter(cell => cell !== 0);
        while (newRow.length < 4) newRow.push(0);
        if (JSON.stringify(board[row]) !== JSON.stringify(newRow)) {
            board[row] = newRow;
            moved = true;
        }
    }
    if (moved) addRandomTile();
}

// Движение вправо
function moveRight() {
    let moved = false;
    for (let row = 0; row < 4; row++) {
        let newRow = board[row].filter(cell => cell !== 0);
        for (let i = newRow.length - 1; i > 0; i--) {
            if (newRow[i] === newRow[i - 1]) {
                newRow[i] *= 2;
                newRow[i - 1] = 0;
                moved = true;
            }
        }
        newRow = newRow.filter(cell => cell !== 0);
        while (newRow.length < 4) newRow.unshift(0);
        if (JSON.stringify(board[row]) !== JSON.stringify(newRow)) {
            board[row] = newRow;
            moved = true;
        }
    }
    if (moved) addRandomTile();
}

// Движение вверх
function moveUp() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        let column = [board[0][col], board[1][col], board[2][col], board[3][col]];
        let newColumn = column.filter(cell => cell !== 0);
        for (let i = 0; i < newColumn.length - 1; i++) {
            if (newColumn[i] === newColumn[i + 1]) {
                newColumn[i] *= 2;
                newColumn[i + 1] = 0;
                moved = true;
            }
        }
        newColumn = newColumn.filter(cell => cell !== 0);
        while (newColumn.length < 4) newColumn.push(0);
        if (JSON.stringify(column) !== JSON.stringify(newColumn)) {
            for (let row = 0; row < 4; row++) board[row][col] = newColumn[row];
            moved = true;
        }
    }
    if (moved) addRandomTile();
}

// Движение вниз
function moveDown() {
    let moved = false;
    for (let col = 0; col < 4; col++) {
        let column = [board[0][col], board[1][col], board[2][col], board[3][col]];
        let newColumn = column.filter(cell => cell !== 0);
        for (let i = newColumn.length - 1; i > 0; i--) {
            if (newColumn[i] === newColumn[i - 1]) {
                newColumn[i] *= 2;
                newColumn[i - 1] = 0;
                moved = true;
            }
        }
        newColumn = newColumn.filter(cell => cell !== 0);
        while (newColumn.length < 4) newColumn.unshift(0);
        if (JSON.stringify(column) !== JSON.stringify(newColumn)) {
            for (let row = 0; row < 4; row++) board[row][col] = newColumn[row];
            moved = true;
        }
    }
    if (moved) addRandomTile();
}

// === 5. Обработка клавиатуры ===
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveLeft();
    if (event.key === "ArrowRight") moveRight();
    if (event.key === "ArrowUp") moveUp();
    if (event.key === "ArrowDown") moveDown();
    renderBoard();
});

// === 6. Обработка свайпов ===
const boardElement = document.getElementById("board");
const hammer = new Hammer(boardElement);

hammer.on("swipeleft", () => { moveLeft(); renderBoard(); });
hammer.on("swiperight", () => { moveRight(); renderBoard(); });
hammer.on("swipeup", () => { moveUp(); renderBoard(); });
hammer.on("swipedown", () => { moveDown(); renderBoard(); });

// === 7. Запуск игры ===
addRandomTile();
addRandomTile();
renderBoard();