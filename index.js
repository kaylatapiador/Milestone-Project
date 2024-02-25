const suit = ['Red', 'Blue', 'Green'];
const value = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const specialCards = ['Skip-bo'];
const specialColors =['Orange'];
const NUM_CARDS = 5;

//defining user and the AI
const player1 = {name:'Player 1', hand:[],stack:[]};
const player2 = {name:'Player 2', hand:[],stack:[]};

// Create deck of cards [there are 148 colored/numbered cards and 18 special cards = 162 cards in total]
function createDeck(){
    let deck = [];

    for (let suits of suit) {
        for (let values of value) {
            deck.push({suits, values});
            deck.push({suits,values});
            deck.push({suits,values});
            deck.push({suits,values});
        }
    }
    
    for(let i = 0 ; i< 18; i++){
        let specialCard = specialCards
        let specialColor = specialColors
        deck.push({suits:specialColor, values:specialCard });
    }
    return deck;
}

//console.log(deck);

// Function to shuffle deck
function shuffleCards(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

//console.log(shuffledDeck);

//Function gets the number of AI playing vs User
/*function getNumPlayers() {
    // Get the number of players entered by the user
    const numPlayers = parseInt(document.getElementById('playerInput').value);

    // Validate the number of players
    if (isNaN(numPlayers) || numPlayers < 1 || numPlayers > 5) {
        document.getElementById('result').textContent = 'Invalid. Please enter a number between 1 and 5.';
    }
    return numPlayers;
}

//this function sets up the array of AI playing agianst the user
function createAI(name){
    return{
        name: name,
        hand:[],
        stack:[]
    };
}*/

//This function builds the deck for the players that they need to get rid of to win
function dealDeck(deck,cards,players){

    for(let i = 0; i<cards;i++){
        for(let player of players){
            player.stack.push(deck.pop());
        }
    }
    
}
//This function gives the players the cards they will have on hand
function dealHand(deck,players){

    for(let player of players){
        for(let i = 0; i<NUM_CARDS; i++){
            player.hand.push(deck.shift());
        }
    }

}

function displayHand(player,containerID){

    const handContainer = document.getElementById(containerID);

    handContainer.innerHTML = '';

    for(let i = 0; i<player.hand.length;i++){
        //console.log(player.hand[i]);
        const card = player.hand[i];
        //console.log(card);
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        if(card.suits ==='Red'){
            cardElement.classList.add('red');
        }
        if(card.suits[0] === 'Orange'){
            cardElement.classList.add('orange');
        }
        if(card.suits === 'Blue'){
            cardElement.classList.add('blue');
        }
        if(card.suits === 'Green'){
            cardElement.classList.add('green');
        }
        cardElement.textContent = card.suits + ' ' + card.values;

        //console.log(cardElement);
        handContainer.appendChild(cardElement);
    }
        
}

function displayDeck(player,containerID){
    const handContainer = document.getElementById(containerID);

    handContainer.innerHTML = '';

     //console.log(player.hand[i]);
    const card = player.stack[0];
    //console.log(card);
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    if(card.suits ==='Red'){
        cardElement.classList.add('red');
    }
    if(card.suits[0] === 'Orange'){
        cardElement.classList.add('orange');
    }
    if(card.suits === 'Blue'){
        cardElement.classList.add('blue');
    }
    if(card.suits === 'Green'){
        cardElement.classList.add('green');
    }
    cardElement.textContent = card.suits + ' ' + card.values;

    //console.log(cardElement);
    handContainer.appendChild(cardElement);

}

//These function are used to make the the user drag the card in its respective area.

const gameTitle = document.getElementById('gameTitle');
const startGame = document.getElementById('start-button')
startGame.addEventListener('click', gameSetUp);


//This sets up the game 
function gameSetUp(){
    startGame.style.display = 'none';
    gameTitle.style.display = 'none';

    const deck = createDeck();
    const shuffledDeck = shuffleCards(deck);
    //console.log(shuffledDeck.length);
    //const players = getNumPlayers();
    const players = 2;

    /*for(let i = 0;i<players;i++){
         let aiPlayer = createAI('AI Player '+ (i+1));
         aiPlayers.push(aiPlayer);
    }
    //console.log(aiPlayers)*/
    const allPlayers = [player1].concat(player2);
    //console.log(allPlayers);
    if(players < 5 ){
        dealDeck(shuffledDeck,30,allPlayers);
    }
    else{
        dealDeck(shuffledDeck,20,allPlayers);
    }
    //console.log(allPlayers);
    //console.log(shuffledDeck.length);

    dealHand(shuffledDeck,allPlayers);
    //console.log(player1);
    //console.log(player2);

    displayHand(player1,'player1-hand');
    displayHand(player2,'player2-hand');

    displayDeck(player1,'player1-deck');
    displayDeck(player2,'player2-deck');
    //console.log(allPlayers);
    //console.log(shuffledDeck.length);
    /*const playerCards = document.querySelectorAll('.card');
    playerCards.forEach(card => {
        card.addEventListener('click', moveCardToMiddle);
    });*/



}

