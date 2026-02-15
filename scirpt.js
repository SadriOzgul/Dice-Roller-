// Get references to the HTML elements
const diceDisplay = document.getElementById('dice-display');
const rollButton = document.getElementById('roll-button');
const resultText = document.getElementById('result-text');

const inputEl = document.getElementById('InputNumber');
const formEl = inputEl.closest('form'); // grabs the <form> in your HTML
let userGuess = null; // A User's guess.

// Create (or grab) a message element to show results
let messageEl = document.getElementById('match-message');
if (!messageEl) {
  messageEl = document.createElement('p');
  messageEl.id = 'match-message';
  // Put it under the form if it doesn't exist yet
  formEl.parentElement.appendChild(messageEl);
}

// Function to generate a random number between 1 and 6
function dieRoll() {
  return Math.floor(Math.random() * 6) + 1;// Math floor - rounds to nearest number.
}

// Function to update the dice display and result text
function updateDice(rollValue) {
  // Unicode characters for dice faces 1-6
  const diceFaces = ['&#9856;', '&#9857;', '&#9858;', '&#9859;', '&#9860;', '&#9861;'];

  diceDisplay.innerHTML = diceFaces[rollValue - 1]; // An array of dice. -1 because index starts at 0.
  resultText.textContent = rollValue;
}

// Handle user submitting their number
formEl.addEventListener('submit', (e) => {
  e.preventDefault(); // stops the page from refreshing

  const value = Number(inputEl.value.trim());

  // Validate input is a number 1-6
  if (!Number.isInteger(value) || value < 1 || value > 6) {
    userGuess = null;
    messageEl.textContent = 'Enter a whole number from 1 to 6.';
    return;
  }

  userGuess = value;
  messageEl.textContent = `Saved! Your number is ${userGuess}. Now roll the dice.`;
});

// Roll button compares roll result with userGuess
rollButton.addEventListener('click', () => {
  const rollResult = dieRoll();
  updateDice(rollResult);

  if (userGuess === null) {
    messageEl.textContent = 'Enter a number (1–6) and press Submit first.';
    return;
  }

  if (rollResult === userGuess) {
    messageEl.textContent = `🎉 Match! You picked ${userGuess} and rolled ${rollResult}.`;
  } else {
    messageEl.innerHTML = `❌ No match. You picked ${userGuess} but rolled ${rollResult}.<br>Try again!`;
  }
});

// Initial display
updateDice(1);
