let result = document.getElementById("result");
let historyList = document.getElementById("history-list");
let memory = 0;
let history = [];
let undoStack = [];
let redoStack = [];

function appendNumber(num) {
    result.value += num;
    saveUndo();
}

function appendOperator(op) {
    result.value += op;
    saveUndo();
}

function appendDecimal() {
    if (!result.value.includes(".")) {
        result.value += ".";
    }
    saveUndo();
}

function clearDisplay() {
    result.value = "";
    saveUndo();
}

function calculateResult() {
    try {
        let expression = result.value;
        let answer = eval(expression);
        result.value = answer;
        saveHistory(expression, answer);
    } catch {
        result.value = "Error";
    }
    saveUndo();
}

function saveHistory(expression, answer) {
    let entry = `${expression} = ${answer}`;
    history.push(entry);
    let li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
}

function memoryAdd() {
    memory += parseFloat(result.value) || 0;
}

function memorySubtract() {
    memory -= parseFloat(result.value) || 0;
}

function memoryRecall() {
    result.value = memory;
}

function memoryClear() {
    memory = 0;
}

function calculateSquareRoot() {
    result.value = Math.sqrt(parseFloat(result.value));
}

function calculateLog() {
    result.value = Math.log10(parseFloat(result.value));
}

function calculateSin() {
    result.value = Math.sin(parseFloat(result.value) * (Math.PI / 180));
}

function calculateCos() {
    result.value = Math.cos(parseFloat(result.value) * (Math.PI / 180));
}

function calculateTan() {
    result.value = Math.tan(parseFloat(result.value) * (Math.PI / 180));
}

function undoLast() {
    if (undoStack.length > 0) {
        redoStack.push(result.value);
        result.value = undoStack.pop();
    }
}

function redoLast() {
    if (redoStack.length > 0) {
        undoStack.push(result.value);
        result.value = redoStack.pop();
    }
}

function saveUndo() {
    undoStack.push(result.value);
    redoStack = [];
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

document.addEventListener("keydown", function(event) {
    if (event.key.match(/[0-9.+\-*/]/)) {
        appendNumber(event.key);
    } else if (event.key === "Enter") {
        calculateResult();
    } else if (event.key === "Backspace") {
        result.value = result.value.slice(0, -1);
    }
});
