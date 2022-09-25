//step 1. playable game with minimum functions: creating deck, shuffling, dealing Cards, evaluating winner
//step 2. ability for the player to hit or stand
//step 3. ability for the dealer to hit or stand
//step 4. variable value of Ace - can be '1' or '11'

//PESUDOCODING for step 1:
//1. define player and ReadableStreamDefaultReader
//2. create and shuffle a game deck
//3. draw 2 cards for player and dealer respectively
//4. win conditions: blackjack/ higher hand value
//5. display hands of both player and dealer and declare winner

// Declare game modes
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards drawn";
var GAME_RESULTS_SHOWN = "results shown";
var currentGameMode = GAME_START;

// Declare variables to store player and dealer hands
//use arrays as each hand will be holding multiple card objects
var playerHand = [];
var dealerHand = [];

//Declare variable to hold deck of cards
var gameDeck = "empty at the start";

//Function to make deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      rankCounter += 1;
    }

    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Function that shuffles a deck
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);

    var randomCard = cardDeck[randomIndex];

    var currentCard = cardDeck[currentIndex];

    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;

    currentIndex = currentIndex + 1;
  }

  return cardDeck;
};

//Funtion that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

// GAME FUNCTION
var checkForBlackjack = function (handArray) {
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;

  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackjack = true;
  }

  return isBlackjack;
};

//function that calculates a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  // loop through and add values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    //for j,q,k value is 10
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }
  return totalHandValue;
};

// MAIN FUNCTION
var main = function (input) {
  var outputMessage = "";

  // first click
  if (currentGameMode == GAME_START) {
    // create the game deck
    gameDeck = createNewDeck();
    console.log(gameDeck);

    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log("player hand ==> ", playerHand);
    console.log("dealer hand ==> ", dealerHand);

    //progress the gamemode
    currentGameMode = GAME_CARDS_DRAWN;

    //write and return the appropriate output message
    outputMessage =
      "Everyone has been dealt a card.<br><br>Click the 'submit' button to evaluate cards!";
    return outputMessage;
  }

  // second click
  if (currentGameMode == GAME_CARDS_DRAWN) {
    //test checkForBlackjack function
    // playerHand = [
    //   { name: "queen", suit: "clubs", rank: 12 },
    //   { name: "ace", suit: "diamonds", rank: 1 },
    // ];
    // dealerHand = [
    //   { name: "ace", suit: "clubs", rank: 1 },
    //   { name: 10, suit: "spades", rank: 10 },
    // ];

    //check for blackjack
    var playerHasBlackjack = checkForBlackjack(playerHand);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);

    // console.log("Does player have Blackjack? ==?", playerHasBlackjack);
    // console.log("Does dealer have Blackjack? ==?", dealerHasBlackjack);
    //check for tie:
    // playerHasBlackjack = true;
    // dealerHasBlackjack = true;

    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      //both player and dealer has blackjack -> tie
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        outputMessage = "BLACKJACK TIE!";
      }
      // only player has blackjack -> player wins
      else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        outputMessage = "PLAYER WINS!<br><br> Player has BLACKJACK";
      }

      // only dealer has blackjack -> dealer wins
      else {
        outputMessage = "DEALER WINS!<br><br> Dealer has BLACKJACK";
      }
      console.log(outputMessage);
    } else {
      outputMessage = "NO BLACKJACK!";
      console.log(outputMessage);

      // no blackjack -> game continues

      //calculate the total hand value of player and dealer
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      console.log("PLayer Total Hand Value --> ", playerHandTotalValue);
      console.log("Dealer Total Hand Value --> ", dealerHandTotalValue);

      //compare total hand value
      //same value -> tie
      if (playerHandTotalValue == dealerHandTotalValue) {
        outputMessage = "IT IS A TIE!";
      }

      //player higher value -> player wins
      else if (playerHandTotalValue > dealerHandTotalValue) {
        outputMessage = "YOU WIN! WOOHOOOO!";
      }

      //dealer higher value -> dealer wins
      else {
        outputMessage = "DEALER WINS!";
      }

      //change game mode
      currentGameMode = GAME_RESULTS_SHOWN;

      //output message
      return outputMessage;
    }
  }
};
