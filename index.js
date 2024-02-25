const suit = ['Red', 'Blue', 'Green'];
const value = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const specialCards = ['Skip-bo'];
const specialColors =['Orange'];
const NUM_CARDS = 5;

//defining user and the AI
const player1 = {name:'Player 1', hand:[],stack:[],discard:{'pile1':[],'pile2':[],'pile3':[],'pile4':[]}};
const player2 = {name:'Player 2', hand:[],stack:[],discard:[]};

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

//This is where the user places a card to end their turn when there are no other possible moves for them to do.
//This function should show strictness as it should only allow the player to put down four different kinds of card value into the array.
//However if there is a similar card that already exist in the array it can therefore be pushed into the array. 
function discardPile(player,card){

    for(let pileName in discard){
        if(discard[pileName].length > 0 && discard[pileName][0] === card){
            discard[pileName].push(card);
            return pileName;
        }
    }

    for(let pileName in discard){
        if(discard[pileName].length ===0){
            discard[pileName].push(card);
            return pileName;
        }
    }
    return false;
}

//Similar to display hand function however separate function is needed as its accessing a different array. 
function displayDiscard(player,containerID){
    const handContainer = document.getElementById(containerID);

    handContainer.innerHTML = '';

    for(let i = 0; i<player.discard.length;i++){
        //console.log(player.hand[i]);
        const card = player.discard[i];
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

//This function is used when the player needs to draw a card to have five on hand.
function drawForFive(player,deck){
    if(player.hand.length>5){
        const drawCard = deck.pop();

        const newCard = document.createElement('div');
        newCard.className = "card";
        newCard.textContent = card.suits + ' ' + card.values;
    }
    else if(deck.length === 0){
        alert('No more cards in the deck! Please reshuffle for a new deck');
    }
    else{
        alert('You already have five cards you cant draw another card!');
    }
}

//This function is to let the user know who's turn it is.
function turnMessage(player){
    const turnMessage = document.getElementById('message');

    if(player === 'Player 1'){
        turnMessage.textContent = "Its Player One's turn!";
    }
    else{
        turnMessage.textContent = "Its Player Two's turn!";
    }
}

function handleEndTurn(){
    const currentPlayer = player2.name;
    turnMessage(currentPlayer);
}


const gameTitle = document.getElementById('gameTitle');
const startGame = document.getElementById('start-button')
startGame.addEventListener('click', gameSetUp);


//This sets up the game 
function gameSetUp(){
    startGame.style.display = 'none';
    gameTitle.style.display = 'none';

    const drawCardButton = document.getElementById('draw-card');
    drawCardButton.style.display = 'inline-block';

    // Show the "End Turn" button when the game starts
    const endTurnButton = document.getElementById('endTurn');
    endTurnButton.style.display = 'inline-block';

    // Update the turn message when the game starts
    const currentPlayer = player1.name; // Replace with actual player's name
    turnMessage(currentPlayer);

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

    const endTurn = document.getElementById('endTurn');
    endTurn.addEventListener('click',handleEndTurn);

    //this do while loop will function for the game play up until there is a declared winner so this loop will run 
    // as long as neither player has 0 cards left on their deck.
    //do{

    //}while(player1.stack.length>0 || player2.stack.length >0 )

    const drawCard = document.getElementById('draw-card');
    drawCard.addEventListener('click', drawForFive);

    //drawForFive(player1,shuffledDeck);

}

