let animalNames = [];
let flippedCard = localStorage.getItem('flippedCard');
let lastFlippedTime = localStorage.getItem('lastFlippedTime');
const cooldownDuration = 24 * 60 * 60 * 1000; // 1 day in milliseconds

// Fetch the animal names from the text file
fetch('/animal_names.txt')
  .then(response => response.text())
  .then(data => {
    animalNames = data.split('\n').filter(name => name.trim() !== '');
    setRandomAnimalNames();
  });

function setRandomAnimalNames() {
  const cardTextElements = document.querySelectorAll('.card-text');

  // Select three random animal names for each card
  const randomAnimalNames = getRandomItems(animalNames, 3);

  // Set the random animal names for each card
  cardTextElements.forEach((element, index) => {
    element.textContent = randomAnimalNames[index];
  });
}

function flipCard(cardNumber) {
  const currentTime = new Date().getTime();

  if (lastFlippedTime && (currentTime - lastFlippedTime < cooldownDuration)) {
    const remainingCooldown = Math.ceil((cooldownDuration - (currentTime - lastFlippedTime)) / 1000);
    const remainingMinutes = Math.ceil(remainingCooldown / 60 / 60); // Convert remaining cooldown to minutes
    alert(`Please wait ${remainingMinutes} hour before flipping another card.`);
    return;
  }

  const card = document.querySelector('.card:nth-child(' + cardNumber + ')');
  card.classList.add('flip');

  flippedCard = cardNumber;
  lastFlippedTime = currentTime;
  localStorage.setItem('flippedCard', flippedCard);
  localStorage.setItem('lastFlippedTime', lastFlippedTime);

  setTimeout(function() {
    card.classList.remove('flip');
    flippedCard = null;
    localStorage.removeItem('flippedCard');
  }, cooldownDuration);
}

function getRandomItems(array, count) {
  const shuffled = array.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Check if a card was previously flipped and apply the flip class on page load
window.addEventListener('DOMContentLoaded', function() {
  if (flippedCard) {
    const card = document.querySelector('.card:nth-child(' + flippedCard + ')');
    card.classList.add('flip');

    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - lastFlippedTime;
    if (elapsedTime >= cooldownDuration) {
      card.classList.remove('flip');
      flippedCard = null;
      localStorage.removeItem('flippedCard');
    } else {
      setTimeout(function() {
        card.classList.remove('flip');
        flippedCard = null;
        localStorage.removeItem('flippedCard');
      }, cooldownDuration - elapsedTime);
    }
  }
});

