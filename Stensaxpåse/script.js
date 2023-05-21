let playerName = '';
let playerScore = 0;
let computerScore = 0;
let round = 1;

function startGame() {
  const nameInput = document.getElementById('name-input');
  playerName = nameInput.value;
  nameInput.disabled = true;

  document.getElementById('player-score').textContent = `Spelare: 0`;
  document.getElementById('computer-score').textContent = `Datorn: 0`;

  document.getElementById('player-name').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
}

function playRound(playerChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  const result = determineWinner(playerChoice, computerChoice);

  updateScore(result);
  displayResult(playerChoice, computerChoice, result);
  
  round++;

  if (round > 3) {
    endGame();
  } else {
    document.getElementById('round').textContent = `Omgång ${round}`;
  }
}

function determineWinner(playerChoice, computerChoice) {
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'player';
  } else if (
    (computerChoice === 'rock' && playerChoice === 'scissors') ||
    (computerChoice === 'paper' && playerChoice === 'rock') ||
    (computerChoice === 'scissors' && playerChoice === 'paper')
  ) {
    return 'computer';
  } else {
    return 'tie';
  }
}

function updateScore(result) {
  if (result === 'player') {
    playerScore++;
  } else if (result === 'computer') {
    computerScore++;
  }

  document.getElementById('player-score').textContent = `Spelare: ${playerScore}`;
  document.getElementById('computer-score').textContent = `Datorn: ${computerScore}`;
}

function displayResult(playerChoice, computerChoice, result) {
  const resultMessage = document.getElementById('result-message');
  
  if (result === 'player') {
    resultMessage.textContent = `Du valde ${playerChoice}, datorn valde ${computerChoice}. Du vinner omgången!`;
  } else if (result === 'computer') {
    resultMessage.textContent = `Du valde ${playerChoice}, datorn valde ${computerChoice}. Datorn vinner omgången!`;
  } else {
    resultMessage.textContent = `Du valde ${playerChoice}, datorn valde ${computerChoice}. Det blir oavgjort!`;
  }
}

function endGame() {
  const winnerMessage = document.createElement('h2');
  winnerMessage.style.color = 'green';
  
  if (playerScore > computerScore) {
    winnerMessage.textContent = `Grattis ${playerName}! Du vann spelet!`;
  } else if (computerScore > playerScore) {
    winnerMessage.textContent = `Datorn vann spelet! Bättre lycka nästa gång, ${playerName}!`;
  } else {
    winnerMessage.textContent = `Det blev oavgjort! Ingen vinnare denna gång.`;
  }

  document.getElementById('game').classList.add('hidden');
  document.getElementById('result-message').classList.add('hidden');
  document.body.appendChild(winnerMessage);

  const playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Spela igen';
  playAgainButton.onclick = restartGame;
  document.body.appendChild(playAgainButton);
}

function restartGame() {
  playerName = '';
  playerScore = 0;
  computerScore = 0;
  round = 1;

  const nameInput = document.getElementById('name-input');
  nameInput.disabled = false;
  nameInput.value = '';

  document.getElementById('player-name').classList.remove('hidden');
  document.getElementById('game').classList.add('hidden');
  
  document.getElementById('result-message').textContent = '';

  const winnerMessage = document.querySelector('h2');
  if (winnerMessage) {
    document.body.removeChild(winnerMessage);
  }

  const playAgainButton = document.querySelector('button');
  if (playAgainButton) {
    document.body.removeChild(playAgainButton);
  }
}
