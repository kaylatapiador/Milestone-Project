const colors = ['Red', 'Blue', 'Green'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const specialCards = ['Skip-bo'];
const NUM_CARDS = 5;

//defining user and the AI
const player = {name:'Player 1',hand:[],stack:[]};
const aiPlayers = {name:'Player 2',hand:[],stack:[]};

// Create deck of cards [there are 148 colored/numbered cards and 18 special cards = 162 cards in total]
function createDeck(){
    let deck = [];

    for (let color of colors) {
        for (let rank of ranks) {
            deck.push({color, rank});
            deck.push({color,rank});
            deck.push({color,rank});
            deck.push({color,rank});
        }
    }
    
    for(let i = 0 ; i< 18; i++){
        let specialCard = specialCards
        deck.push({color:'Orange', value:specialCard });
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
    const container = document.getElementById(containerID);
    container.innerHTML = '';

    player.hand.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        if(player.hand === "Skip-bo")`{
            cardElement.textContent = 
        }
        else{
            cardElement.textContent = `${card.value} of ${card.suit}`;
            container.appendChild(cardElement);
        }
    });
}

//This sets up the game 
function gameSetUp(){
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
    const allPlayers = [player].concat(aiPlayers);
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
    //console.log(allPlayers);
    //console.log(shuffledDeck.length);


}

document.getElementById('start-button').addEventListener('click', gameSetUp);