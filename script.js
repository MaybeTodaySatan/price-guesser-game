{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const products = [\
    \{ image: 'product1.jpg', highAnchor: 150, lowAnchor: 50, actual: 100 \},\
    \{ image: 'product2.jpg', highAnchor: 200, lowAnchor: 80, actual: 120 \},\
    \{ image: 'product3.jpg', highAnchor: 300, lowAnchor: 150, actual: 250 \}\
];\
\
let currentRound = 0;\
let totalDeviation = 0;\
let roundCount = 0;\
\
document.getElementById('start-button').addEventListener('click', startGame);\
document.getElementById('submit-button').addEventListener('click', submitGuess);\
document.getElementById('restart-button').addEventListener('click', restartGame);\
\
function startGame() \{\
    document.getElementById('start-screen').style.display = 'none';\
    document.getElementById('game-screen').style.display = 'block';\
    nextRound();\
\}\
\
function nextRound() \{\
    if (currentRound < products.length) \{\
        const product = products[currentRound];\
        document.getElementById('product-image').src = product.image;\
        document.getElementById('anchor-price').innerText = 'Suggested Price: $' + (Math.random() < 0.5 ? product.highAnchor : product.lowAnchor);\
        document.getElementById('guess-input').value = '';\
        document.getElementById('feedback').innerText = '';\
        \
        setTimeout(() => \{\
            document.getElementById('anchor-price').innerText = '';\
        \}, 10000);\
    \} else \{\
        endGame();\
    \}\
\}\
\
function submitGuess() \{\
    const product = products[currentRound];\
    const guess = parseFloat(document.getElementById('guess-input').value);\
    const deviation = Math.abs(guess - product.actual);\
    totalDeviation += deviation;\
    roundCount++;\
\
    document.getElementById('feedback').innerText = `The actual price is $$\{product.actual\}. Your guess was $$\{deviation\} off.`;\
    currentRound++;\
    \
    setTimeout(nextRound, 3000);\
\}\
\
function endGame() \{\
    document.getElementById('game-screen').style.display = 'none';\
    document.getElementById('end-screen').style.display = 'block';\
    document.getElementById('performance-summary').innerText = `You played $\{roundCount\} rounds. Your average deviation from the actual price was $$\{(totalDeviation / roundCount).toFixed(2)\}.`;\
\}\
\
function restartGame() \{\
    currentRound = 0;\
    totalDeviation = 0;\
    roundCount = 0;\
    document.getElementById('end-screen').style.display = 'none';\
    document.getElementById('start-screen').style.display = 'block';\
\}\
}