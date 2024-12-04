// script.js
const questionElement = document.getElementById("question");
const form = document.getElementById('form');
const input = document.getElementById('inp');
let scoreElement = document.getElementById('score');
const refreshButton = document.getElementById('refresh');

let score = Number(localStorage.getItem("score"));
if (!score) {
    score = 0;
}

scoreElement.textContent = `score : ${score}`;
let num1, num2, correctAnswer, operation;

// Function to generate a new question
function generateQuestion() {
    num1 = Math.floor(Math.random() * 10);
    num2 = Math.floor(Math.random() * 10);
    
    // Randomly select an operation
    const operations = ['+', '-', '*', '/'];
    operation = operations[Math.floor(Math.random() * operations.length)];

    // Calculate the correct answer based on the operation
    switch (operation) {
        case '+':
            correctAnswer = num1 + num2;
            questionElement.innerText = `What is ${num1} + ${num2}?`;
            break;
        case '-':
            correctAnswer = num1 - num2;
            questionElement.innerText = `What is ${num1} - ${num2}?`;
            break;
        case '*':
            correctAnswer = num1 * num2;
            questionElement.innerText = `What is ${num1} * ${num2}?`;
            break;
        case '/':
            // Ensure no division by zero and that the result is a whole number
            if (num2 === 0) {
                num2 = 1; // Change num2 to 1 to avoid division by zero
            }
            correctAnswer = num1 / num2;
            questionElement.innerText = `What is ${num1} / ${num2}?`;
            break;
    }
}

// Initial question generation
generateQuestion();

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    let userAnswer = +input.value;
    if (correctAnswer === userAnswer) {
        score++;
    } else {
        score--;
    }
    
    updateScore();
    
    // Check if the score is 50
    if (score === 50) {
        alert("You win!"); // Display win message
        score = 0; // Reset score to 0
        updateScore(); // Update the displayed score
        // Optionally, you can reset the score or perform other actions here
    }
    
    input.value = ''; // Clear the input field
    generateQuestion(); // Generate a new question
});

function updateScore() {
    localStorage.setItem("score", String(score));
    scoreElement.textContent = `score : ${score}`; // Update score display
}

// Refresh button functionality
refreshButton.addEventListener('click', function () {
    generateQuestion(); // Generate a new question
});

// Clear Local Storage 
// localStorage.removeItem("score");