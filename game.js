// Game setup
let startGame = false;

const setupContainer = document.querySelector('.setup');
const onlineButton = document.querySelector('.onlineButton');
const offlineButton = document.querySelector('.offlineButton');

setupContainer.style.display = 'block';

onlineButton.addEventListener('click', function(){ alert('¡Esta función todavía no puede usarse!'); });
offlineButton.addEventListener('click', setupOfflineGame);

function setupOfflineGame(){

}