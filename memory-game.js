"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];
let clickCount = 2;

const colors = shuffle(COLORS);
createCards(colors);

// Shuffle array items in-place and return shuffled array.
function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

// Create card for every color in colors (each will appear twice)
function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let card = document.createElement("div");
    card.className = color;
    game.append(card);

    card.addEventListener("click", handleCardClick);
  }
}

// Flip a card face-up.
function flipCard(card) {
  let cardColor = card.className
  card.style.backgroundColor = cardColor;
  // this prevents the player from clicking the same card again
  card.removeEventListener("click", handleCardClick);
}

// Flip a card face-down.
function unFlipCard(card) {
  card.style.backgroundColor = "white";
  // this allows the player to try this card again
  card.addEventListener("click", handleCardClick);
}

let flippedCards = [];

// Handle clicking on a card: this could be first-card or second-card. 
function handleCardClick(e) {
  let cardClicked = e.target;
  flipCard(cardClicked);
  flippedCards.push(cardClicked);

  if (flippedCards.length < 2){
      console.log("pick another card")
      return;
  } else if (flippedCards.length === 2){
    if(flippedCards[0].className === flippedCards[1].className){
        console.log("cards match")
        for(let card of flippedCards){
            card.removeEventListener("click", handleCardClick);
        }
        flippedCards = [];
    } else if (flippedCards[0].className !== flippedCards[1].className) {
        console.log("cards don't match")
        for(let card of flippedCards){
            setTimeout(unFlipCard, 1000, card);
        }
        flippedCards = [];
    }
  }
}
