'use strict';

const targetColorElement = document.getElementById('targetColor')
const colorButtons = document.querySelectorAll('.box')
const messageElement = document.getElementById('message')
const resetButton = document.getElementById('resetBtn')
const startButton = document.getElementById('startBtn')
const timeElement = document.getElementById('time')
const scoreElement = document.getElementById('score')
const colors = ['red', 'green', 'blue', 'yellow']
let timer = null

let isgameRunning = true

let currentTarget = ''
targetColorElement.textContent = currentTarget

startButton.addEventListener('click', () => {
    if (timer) {
        clearInterval(timer);
    }
    let timeLeft = 10
    timeElement.textContent = timeLeft
    timer = setInterval(() => {
        timeLeft -= 1
        timeElement.textContent = timeLeft
        if (timeLeft <= 0) {
            clearInterval(timer)
            timer = null
            isgameRunning = false
            messageElement.textContent = 'Time\'s up! Your final score is ' + scoreElement.textContent
            colorButtons.forEach(button => button.disabled = true)
        }
    }, 1000)

    colorButtons.forEach(button => button.disabled = false)
    setTargetColor()
    scoreElement.textContent = '0'
})




const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

const setTargetColor = () => {
    currentTarget = getRandomColor()
    targetColorElement.textContent = currentTarget
}


colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log(button.dataset.color);
        if (!isgameRunning) return
        if (button.dataset.color.toLowerCase() === currentTarget.toLowerCase()) {
        messageElement.textContent = 'Correct!'
        scoreElement.textContent = parseInt(scoreElement.textContent) + 1
        setTargetColor()
        } else {
            messageElement.textContent = 'Wrong! Try Again.'
        }
    });
});

resetButton.addEventListener('click', () => {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }

    scoreElement.textContent = '0';
    messageElement.textContent = '';
    timeElement.textContent = '10';
    colorButtons.forEach(button => button.disabled = true);
});
