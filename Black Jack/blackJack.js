let messageElement = document.getElementById("message");
let cardListElement = document.getElementById("cardList");
let sumElement = document.getElementById("sum");
let sum = 0;
let firstNum, secondNum;
let cards = []
let gameOver = false;
let start = 0;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
    resetGame();
    firstNum = getRandomInt(1, 13);
    secondNum = getRandomInt(1, 13);
    let firstCard = cardConversion(firstNum);
    let secondCard = cardConversion(secondNum);
    cards.push(firstCard);
    cards.push(secondCard);
    sum += firstNum + secondNum;
    update();
}

function gameStatus() {
    if (gameOver == false) {
        if (start > 0) {
            if (sum < 21) {
                return "Lieu thi an nhieu khong lieu thi an it";
            } else if (sum == 21) {
                gameOver = true;
                return "VUA CO BAC";
            } else {
                gameOver = true;
                return "NGA O DAU GAP DOI O DAY";
            }
        } else {
            start++;
            return "Wanna test your fortune?";
        }
    } else {
        return "Wanna test your fortune?";
    }
}

function newCard() {
    if (gameOver == false) {
        if (sum == 21) {
            messageElement.textContent = "VUA CO BAC";
            cardListElement.textContent = "Your Cards: " + cards;
            sumElement.textContent = "Sum: " + sum;
            gameOver = true;
        } else {
            let newNum = getRandomInt(1, 13);
            let newCard = cardConversion(newNum);
            cards.push(newCard);
            sum += newNum;
            update();
        }
    } else {
        startGame();
    }
}

function resetGame() {
    gameOver = false;
    sum = 0;
    start = 0;
    cards = [];
    messageElement.textContent = "Wanna test your fortune?";
    cardListElement.textContent = "Your Cards:";
    sumElement.textContent = "Sum:";
}

function update() {
    messageElement.textContent = gameStatus();
    cardListElement.textContent = "Your Cards: " + cards;
    sumElement.textContent = "Sum: " + sum;
}

function cardConversion(card) {
    if (card > 10) {
        if (card == 11) {
            return "J";
        } else if (card == 12) {
            return "Q";
        } else if (card == 13) {
            return "K";
        }
    } else if (card == 1) {
        return "A";
    } else {
        return card;
    }
}