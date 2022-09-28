//step 1. playable game with minimum functions: creating deck, shuffling, dealing Cards, evaluating winner
//step 2. ability for the player to hit or stand
//step 3. ability for the dealer to hit or stand
//step 4. variable value of Ace - can be '1' or '11'

//PSEUDOCODING for ver 1:
//1. define player and ReadableStreamDefaultReader
//2. create and shuffle a game deck
//3. draw 2 cards for player and dealer respectively
//4. win conditions: blackjack/ higher hand value
//5. display hands of both player and dealer and declare winner

//PSEUDOCODING for ver 2:
//1.game mode "hit or stand"
//2.functionality for user to input hit or stand.

//PSEUDOCODING for ver 3:
//1. dealer to hit or stand ONLY after player choose to stand
//2.if dealer hand value is less than 17, dealer hits
//3. if dealer hand value is more than 17, dealer stands

// PSEUDOCODING for ver 4:
//1.if totalHandValue, including an ace, is less than 21, ace value is 11
//2.when totalHandValue, including an ace is more than 21, ace value is REDUCED to 1

// GLOBAL VARIABLES
// Declare game modes
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards drawn";
var GAME_RESULTS_SHOWN = "results shown";
var GAME_HIT_OR_STAND = "hit or stand";
var GAME_END = "game end";
var currentGameMode = GAME_START;

// Declare variables to store player and dealer hands
//use arrays as each hand will be holding multiple card objects
var playerHand = [];
var dealerHand = [];

//Declare variable to hold deck of cards
var gameDeck = [];

//Function to make deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts ♡", "diamonds ♢", "clubs ♧", "spades ♤"];
  var imageSuits = ["H", "D", "C", "S"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var imageName = rankCounter + "-" + imageSuits[suitIndex] + ".png";

      if (cardName == 1) {
        cardName = "ace";
        imageName = "A-" + imageSuits[suitIndex] + ".png";
      } else if (cardName == 11) {
        cardName = "jack";
        imageName = "J-" + imageSuits[suitIndex] + ".png";
      } else if (cardName == 12) {
        cardName = "queen";
        imageName = "Q-" + imageSuits[suitIndex] + ".png";
      } else if (cardName == 13) {
        cardName = "king";
        imageName = "K-" + imageSuits[suitIndex] + ".png";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        imageName: imageName,
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
  var aceCounter = 0;

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
    } else if (currentCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }

  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }
  return totalHandValue;
};

//function that displays the player and dealer hands in message
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  //player hand
  var playerMessage = "🤟 Player Hand:<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "<img style='display:inline' width='91' height='140' src='images/" +
      playerHandArray[index].imageName +
      "' />";
    index = index + 1;
  }

  //Dealer hand
  index = 0;
  var dealerMessage = "👀 Dealer Hand:<br>";
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "<img style='display:inline' width='91' height='140' src='images/" +
      dealerHandArray[index].imageName +
      "' />";
    index = index + 1;
  }

  return playerMessage + "<br>" + dealerMessage;
};

//function that displays the total hand values in a message
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br><br>Player 🧮: " +
    playerHandValue +
    "<br>Dealer 🧮: " +
    dealerHandValue;
  return totalHandValueMessage;
};

//compare total hand value
var infoWinningOrLoosing = function (
  playerHand,
  playerHandTotalValue,
  dealerHand,
  dealerHandTotalValue
) {
  //same value -> tie
  if (playerHandTotalValue == dealerHandTotalValue) {
    outputMessage =
      displayPlayerAndDealerHands(playerHand, dealerHand) +
      "<br><br>IT IS A TIE 🫥🫥";
  }

  //player higher value -> player wins
  else if (playerHandTotalValue > dealerHandTotalValue) {
    outputMessage =
      displayPlayerAndDealerHands(playerHand, dealerHand) +
      "<br><br>YOU WIN 🍀! WOOHOOOO 🫡";
  }

  //dealer higher value -> dealer wins
  else {
    outputMessage =
      displayPlayerAndDealerHands(playerHand, dealerHand) +
      "<br><br>DEALER WINS 🫣🫣";
  }

  return outputMessage;
};

var resetEverything = function () {
  playerHand = [];
  dealerHand = [];
  gameDeck = [];
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
      "Everyone has been dealt a card 💫.<br><br>Click the 'DRAW🃏' button one more time to evaluate cards 🔍!";
    return outputMessage;
  }

  // second click
  if (currentGameMode == GAME_CARDS_DRAWN) {
    //check for blackjack
    var playerHasBlackjack = checkForBlackjack(playerHand);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);

    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      //both player and dealer has blackjack -> tie
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br><br>BLACKJACK TIE 🫥🫥 <br><br>Game end... click 'DRAW🃏' button to play a new game 🤝 ";
        currentGameMode = GAME_START;
        resetEverything();
      }
      // only player has blackjack -> player wins
      else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br><br>YOU WIN 🫡!<br><br> You has BLACKJACK 🍀🍀 <br><br>Game end... click 'DRAW🃏' button to play a new game 🤝";
        currentGameMode = GAME_START;
        resetEverything();
      }

      // only dealer has blackjack -> dealer wins
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br><br>DEALER WINS 🫣<br><br> Dealer has BLACKJACK <br><br>Game end... click 'DRAW🃏' button to play a new game 🤝";
      }
      console.log(outputMessage);
      currentGameMode = GAME_START;
      resetEverything();
      return outputMessage;
    } else {
      outputMessage = displayPlayerAndDealerHands(playerHand, dealerHand);
      console.log(outputMessage);

      // no blackjack -> game continues

      //calculate the total hand value of player and dealer
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      console.log("PLayer Total Hand Value --> ", playerHandTotalValue);
      console.log("Dealer Total Hand Value --> ", dealerHandTotalValue);

      outputMessage += displayHandTotalValues(
        playerHandTotalValue,
        dealerHandTotalValue
      );

      //change game mode
      currentGameMode = GAME_HIT_OR_STAND;

      //output message
      return outputMessage;
    }
  }

  //HIT OR STAND
  if (currentGameMode == GAME_HIT_OR_STAND) {
    if (input != "hit" && input != "stand") {
      return (
        '❌ Wrong button ❌... click only "hit" or "stand" to continue with the game. <br><br>' +
        displayPlayerAndDealerHands(playerHand, dealerHand)
      );
    }

    //player HIT
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      // Calcute whether user bust or not, after the 'hit'. >21 = BUST
      if (playerHandTotalValue > 21) {
        currentGameMode = GAME_START;
        resetEverything();
        return "BUST! Your card value is more than 21. You LOST 🫣 <br><br>Game end... click 'DRAW🃏' button to play a new game 🤝";
      }
      if (playerHandTotalValue == 21) {
        currentGameMode = GAME_START;
        resetEverything();
        return "BLACKJACK 🍀🍀! You WIN 🫡!<br><br>Game end... click 'DRAW🃏' button to play a new game 🤝";
      }

      // else, continue game
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        '<br> You drew another card. <br><br>Please click "hit" or "stand" to continue the game.';
    }

    //player STAND
    else if (input == "stand") {
      //calculate the total hand value of player and dealer
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      if (dealerHandTotalValue > 21) {
        currentGameMode = GAME_START;
        resetEverything();
        return "Dealer BUST! You WIN 🫡 <br><br>Game end... click 'DRAW🃏' button to play a new game 🤝";
      }

      if (dealerHandTotalValue == 21) {
        currentGameMode = GAME_START;
        resetEverything();
        return "Dealer BLACKJACK! DEALER WINS 🫣<br><br>Game end... click 'DRAW🃏' button to play a new game 🤝";
      }

      var result = displayPlayerAndDealerHands(playerHand, dealerHand);
      //compare total hand value
      //same value -> tie
      if (playerHandTotalValue == dealerHandTotalValue) {
        outputMessage =
          result +
          "<br><br>IT IS A TIE 🫥🫥 <br><br>Game end... click 'DRAW🃏' button to play a new game 🤝";
      }

      //player higher value -> player wins
      else if (playerHandTotalValue > dealerHandTotalValue) {
        outputMessage =
          result +
          "<br><br>YOU WIN 🍀🍀! WOOHOOOO 🫡 <br><br>Game end... click 'DRAW🃏' button to play a new game 🤝";
      }

      //dealer higher value -> dealer wins
      else {
        outputMessage =
          result +
          "<br><br>DEALER WINS 🫣<br><br>Game end... click 'DRAW🃏' button to play a new game 🤝";
      }
      currentGameMode = GAME_START;
      resetEverything();
    }

    outputMessage += displayHandTotalValues(
      playerHandTotalValue,
      dealerHandTotalValue
    );

    return outputMessage;
  }
};
