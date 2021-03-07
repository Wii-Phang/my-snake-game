const scoreDisplay = document.getElementsByClassName('score');
const grid = document.querySelector('.grid');
const startBtn = document.getElementsByClassName('startBtn');

const width = 10;
let score = 0;
let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
let appleIndex = 0
let intervalTime = 1000
let timerId = 0
const speed = 0.8


function startGame() {
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove apple
    squares[appleIndex].classList.remove('apple')


    clearInterval(timerId)
    currentSnake = [2, 1, 0]

    score = 0
    scoreDisplay.textContent = score

    direction = 1
    intervalTime = 1000
    generateApples()

    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}

function createGrid() {

    //create 100 grid 
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div')

        square.classList.add('square')

        grid.appendChild(square)

        squares.push(square)
    }
}

createGrid();


currentSnake.forEach(index => squares[index].classList.add('snake'))

function move() {

    //end game if hits wall
    if (
        (currentSnake[0] % width === 0 && direction === -1) || //if hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if hit up wall
        (currentSnake[0] % width === 9 && direction === 1) || //if hit right wall
        (currentSnake[0] + width >= width * width && direction === width) //if hit down wall
    )

        return clearInterval(timerId)

    //move the snake
    const tail = currentSnake.pop()

    squares[tail].classList.remove('snake')

    currentSnake.unshift(currentSnake[0] + direction)

    //deal with snake head gets apple
    if (squares[currentSnake[0]].classList.contains('apple')) {

        squares[currentSnake[0]].classList.remove('apple') //remove the apple

        squares[tail].classList.add('snake') //grow the snake longer by adding snake class

        currentSnake.push(tail) //grow the snake array

        generateApples() //generate new apple

        score++

        scoreDisplay[0].textContent = score //display the score

        //speed up the snake
        clearInterval(timerId)

        intervalTime *= speed

        timerId = setInterval(move, intervalTime)

    }


    squares[currentSnake[0]].classList.add('snake')


}

//create apple randomly around the map
function generateApples() {

    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))

    squares[appleIndex].classList.add('apple')
}

generateApples()

function control(e) {

    //keyCode:
    // 39 is right arrow
    // 38 is for the up arrow
    // 37 is for the left arrow
    // 40 is for the down arrow

    if (e.keyCode === 37) {
        console.log("left pressed")
        direction = -1
    }
    else if (e.keyCode === 38) {
        console.log("up pressed")
        direction = -width
    }
    else if (e.keyCode === 39) {
        console.log("right pressed")
        direction = 1
    }
    else if (e.keyCode === 40) {
        console.log("down pressed")
        direction = width
    }
}

document.addEventListener('keyup', control)
startBtn[0].addEventListener('click', startGame)