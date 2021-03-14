class card{
    constructor(number, suit){
        this.number = number;
        this.suit = suit;
    }
}
class deck{
    constructor(copies){
        this.cardList = new Array(0);
        for(let i = 0; i < copies; i++){
            // All card objects are frozen to prevent any changes to their attribute values
            this.cardList.push(Object.freeze(new card('joker', 'red')));
            this.cardList.push(Object.freeze(new card('joker', 'black')));
            for(let j = 2; j < 15; j++){
                this.cardList.push(Object.freeze(new card(j, 'diamond')));
                this.cardList.push(Object.freeze(new card(j, 'club')));
                this.cardList.push(Object.freeze(new card(j, 'heart')));
                this.cardList.push(Object.freeze(new card(j, 'spade')));
            }
        }
    }
    shuffle(){
        // Create an array of numbers from 0 to cardList.length - 1
        let shuffleKeys = [...Array(this.cardList.length).keys()];
        let newList = new Array(this.cardList.length);
        let randomIndex;
        for(let i = 0; i < this.cardList.length; i++){
            randomIndex = Math.floor(Math.random() * (this.cardList.length - i));
            newList[i] = this.cardList[shuffleKeys[randomIndex]];
            shuffleKeys = shuffleKeys.slice(0, randomIndex).concat(shuffleKeys.slice(randomIndex + 1));
        }
        this.cardList = newList;
    }
    draw(){
        return this.cardList.shift();
    }
    get length(){
        return this.cardList.length;
    }
}

// Incomplete!
class table{
    // For the time being, this does not consider online play
    constructor(playerList, maxPoints){
        this.playerList = [...playerList]; // Makes a shallow copy of the player list
        this.startingPlayer = this.playerList[0]; // The player starting the round
        this.maxPoints = maxPoints; // If a player has this many points at the end of a round, they lose

        this.deck = new deck(Math.ceil(playerList.length / 2));
        this.deck.shuffle();
        this.discard = new Array; // Discard pile
        this.triads = new Array; // Triads on the table
        this.ladders = new Array; // Ladders on the table

        this.activePlayer = this.startingPlayer; // The player whose turn it is
    }
    deal(){
        for(let i = 0; i < 9; i++){
            for(const player of this.playerList){
                player.hand.push(this.deck.draw());
            }
        }
        this.discard.unshift(this.deck.draw());
    }
}

class lastAction{
    constructor(){
        this.action = null;
        
        this.triads = null;
        this.ladders = null;
        this.discard = null;
        
        this.hand = null;
        this.drewDiscard = null;
        this.cardToPlay = null;
        this.laddersPlayed = null;
        this.triadsPlayed = null;
        this.playedCards = null;

        this.previous = null;
    }
}
// Incomplete!
class player{
    constructor(name, ai = false){
        this.name = name; // The player's name
        this.ai = ai; // Is the player an AI?

        this.hand = new Array; // The player's hand of cards
        this.drewDiscard = false; // Has the player drawn from the discard pile? If so, does he still have to play that card?
        this.cardToPlay = null; // The card to play (drawn from the discard pile)
        this.laddersPlayed = new Array; // The ladders the player played in a turn
        this.triadsPlayed = new Array; // The triads the player played in a turn
        this.playedCards = [false, false]; // Has the player played cards this turn? On a previous turn? 
        // The player's last action and snapshot of game state before its effect. Key "previous" contains the previous action and state
        this.lastAction = new lastAction;

        this.immediateWin = true; // Can the player win the game without waiting for one more turn?
        this.points = 0; // The number of points the player has accumulated
        this.position = 1; // ** THIS STILL HAS NO USE (IT IS MEANT TO BE THE PLAYER'S POSITION AT THE END OF A GAME)
    }
    drawDeck(table){
        if(table.deck.length === 0){
            return false;
        }
		else{
			this.captureLastAction('rb', table);
			this.hand.push(table.deck.pop(0));
			
			return true; 
        }
    }
}

function startGame(online, host, playerName, numberOfPlayers, maxPoints){
    let localPlayer = new player(playerName);
    let playerList = [localPlayer];
    
    for(let i = 1; i < numberOfPlayers; i++){
        playerList.push(new player('AI ' + i, true));
    }

    currentTable = new table(playerList, maxPoints);
    currentTable.deal();

    // TEST
    const handContainer = document.querySelector('.game .hand');
    handContainer.innerHTML = '';
    for(const crd of currentTable.activePlayer.hand){
        let cardImage = document.createElement('img');
        cardImage.src = `cards/${crd.suit}${crd.number}.png`;
        handContainer.appendChild(cardImage);
    }
}