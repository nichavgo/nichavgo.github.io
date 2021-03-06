// Game setup

function setupOfflineGame(setupContainer){
    const offlineSetup = document.querySelector('.offline');
    offlineSetup.style.display = 'block';

    const playerNameInput = document.querySelector('#playerName');
    const playerNumberInput = document.querySelector('#playerNumber');
    const maxPointsInput = document.querySelector('#maxPoints');
    const playButton = document.querySelector('#playButton');
    
    playButton.addEventListener('click', function(){
        let playerName = playerNameInput.value;
        if(playerName === ""){ 
            alert('Tienes que escoger un nombre de jugador.');
            return;
        }
        let numberOfPlayers = Number(playerNumberInput.value);
        if(numberOfPlayers < 2){
            alert('Tienes que escoger al menos dos jugadores.');
            return;
        }
        let maxPoints = Number(maxPointsInput.value);
        if(maxPoints < 1){
            alert('El valor mínimo para el máximo de puntos es 1.');
            return;
        }

        setupContainer.style.display = 'none';

        const gameContainer = document.querySelector('.game');
        gameContainer.style.display = '';

        startGame(false, false, playerName, numberOfPlayers, maxPoints);
    })
}

function setupOnlineGameHost(){

}

function setupOnlineGameJoin(){
    
}

const setupContainer = document.querySelector('.setup');
const onlineHostButton = document.querySelector('.onlineHostButton');
const onlineGuestButton = document.querySelector('.onlineGuestButton');
const offlineButton = document.querySelector('.offlineButton');

setupContainer.style.display = 'block';

onlineHostButton.addEventListener('click', function(){ alert('¡Esta función todavía no puede usarse!'); });
onlineGuestButton.addEventListener('click', function(){ alert('¡Esta función todavía no puede usarse!'); });
offlineButton.addEventListener('click', function(){
    const buttonContainer = document.querySelector('.selectOnOff');
    buttonContainer.style.display = 'none';

    setupOfflineGame(setupContainer);
});