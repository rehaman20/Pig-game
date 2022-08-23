'use strict';
// State Variables
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Score Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// Button Elements
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Dice Element
const dice = document.querySelector('.dice');

// Initialize game on Reload
const initGame = function () {
  document.querySelectorAll('.score').forEach(scoreElement => {
    scoreElement.textContent = 0;
  });
  dice.classList.add('hidden');
};
initGame();

// Handling click event on Roll Button
btnRoll.addEventListener('click', () => {
  // Generate random dice number
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  // Display dice
  dice.setAttribute('src', `dice-${randomNumber}.png`);
  dice.classList.remove('hidden');
  //Check for rolled 1; If true switch to next player
  if (randomNumber !== 1) {
    currentScore += randomNumber;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  }
});

// Handling click event on Hold Button
btnHold.addEventListener('click', () => {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  if (scores[activePlayer] >= 10) {
    document.getElementById(`name--${activePlayer}`).textContent = 'Won🏆🎉';
    btnRoll.style.pointerEvents = 'none';
    btnHold.style.pointerEvents = 'none';
  }
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  currentScore = 0;
});

btnNewGame.addEventListener('click', function () {
  initGame();
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  document.getElementById(`name--0`).textContent = `PLAYER 1`;
  document.getElementById(`name--1`).textContent = `PLAYER 2`;
  activePlayer = 0;
  scores = [0, 0];
  btnRoll.style.pointerEvents = 'all';
  btnHold.style.pointerEvents = 'all';
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');
});
