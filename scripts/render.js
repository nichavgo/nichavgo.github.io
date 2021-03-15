let cardNumbers = {2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 'Jack', 12: 'Queen', 13: 'King', 14: 'Ace'};  
function renderHand(hand){
    const handContainer = document.querySelector('.game .hand');
    handContainer.innerHTML = '';
    for(const crd of hand){
        let cardImage = document.createElement('img');
        cardImage.src = `cards/${crd.suit}${crd.number}.png`;
        if(crd.number !== 'joker'){
            cardImage.alt = `${cardNumbers[crd.number]} of ${crd.suit}s`;
        } else{
            cardImage.alt = `${crd.suit} ${crd.number}`;
        }
        handContainer.appendChild(cardImage);
    }
}