const colors = ['Red', 'Blue', 'Green'];
const ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const specialCards = ['Skip-bo'];

const playerHand = [];
const dealerHand = [];

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
const deck = createDeck();

//console.log(deck);

// Function to shuffle deck
function shuffleCards(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
const shuffledDeck = shuffleCards(deck);

//console.log(shuffledDeck);


//Function gets the number of AI playing vs User
function getNumOfPlayers(){
    document.getElementById('getNumPlayers').addEventListener('click', function() {
        // Get the number of players entered by the user
        const numPlayers = parseInt(document.getElementById('playerInput').value);

        // Validate the number of players
        if (isNaN(numPlayers) || numPlayers < 1 || numPlayers > 5) {
            document.getElementById('result').textContent = 'Please enter a number between 1 and 5.';
            
        } else {
            // Display the number of players
            document.getElementById('result').textContent = `Number of players: ${numPlayers}`;
        }
    });

}

