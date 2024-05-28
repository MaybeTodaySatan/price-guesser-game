const products = [
    { image: 'product1.jpg', highAnchor: 150, lowAnchor: 50, actual: 100 },
    { image: 'product2.jpg', highAnchor: 200, lowAnchor: 80, actual: 120 },
    { image: 'product3.jpg', highAnchor: 300, lowAnchor: 150, actual: 250 }
];

let currentRound = 0;
let totalDeviation = 0;
let roundCount = 0;

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('submit-button').addEventListener('click', submitGuess);
document.getElementById('restart-button').addEventListener('click', restartGame);

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    nextRound();
}

function nextRound() {
    if (currentRound < products.length) {
        const product = products[currentRound];
        document.getElementById('product-image').src = product.image;
        document.getElementById('anchor-price').innerText = 'Suggested Price: $' + (Math.random() < 0.5 ? product.highAnchor : product.lowAnchor);
        document.getElementById('guess-input').value = '';
        document.getElementById('feedback').innerText = '';
        
        setTimeout(() => {
            document.getElementById('anchor-price').innerText = '';
        }, 10000);
    } else {
        endGame();
    }
}

function submitGuess() {
    const product = products[currentRound];
    const guess = parseFloat(document.getElementById('guess-input').value);
    const deviation = Math.abs(guess - product.actual);
    totalDeviation += deviation;
    roundCount++;

    document.getElementById('feedback').innerText = `The actual price is $${product.actual}. Your guess was $${deviation} off.`;
    currentRound++;
    
    setTimeout(nextRound, 3000);
}

function endGame() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    document.getElementById('performance-summary').innerText = `You played ${roundCount} rounds. Your average deviation from the actual price was $${(totalDeviation / roundCount).toFixed(2)}.`;
}

function restartGame() {
    currentRound = 0;
    totalDeviation = 0;
    roundCount = 0;
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}
