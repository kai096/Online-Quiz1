const cards = document.querySelectorAll('.card');
const matchedText = document.getElementById('matched');
const btn = document.getElementById('btn');
const countDown = document.getElementById('countDown');
const bgm = document.getElementById('bgm');
let cardOne, cardTwo; //falsy value
let matched = 0;
let time = 120;

function playAud(){
    bgm.play();
}
function pauseAud(){
    bgm.pause();
}


var count = setInterval(timer, 1000)
function timer(){
    time = time-1
    if(time <= 0){
        clearInterval(count);
        location.reload();
        shuffleCard()
    }
    countDown.innerText = time
    
}

function turnOver(e){
    //console.log(e.target);
    clickedCard = e.target;
    if (cardOne !== clickedCard) {
        clickedCard.classList.add('flip')
        if(!cardOne) {
            return cardOne = clickedCard
        }
    
        cardTwo = clickedCard
        //console.log(cardOne, cardTwo);
        let cardOneImg = cardOne.querySelector('.back-view img').src;
        let cardTwoImg = cardTwo.querySelector('.back-view img').src;
        //console.log(cardOneImg, cardTwoImg)
        matchedSet(cardOneImg, cardTwoImg)
    }
}
function matchedSet(img1, img2){
    console.log(img1, img2)
    if (img1 === img2) {
       // console.log(matched)
        matched++
        matchedText.innerText = matched;
        if (matched == 8) {
                shuffleCard()
                location.reload()
        }
        cardOne.removeEventListener('click', turnOver)
        cardTwo.removeEventListener('click', turnOver)
        cardOne = cardTwo = '';
    }
        //else
        else{
             setTimeout(() => {
                cardOne.classList.add('shake')
                cardTwo.classList.add('shake')
            }, 400);
            setTimeout(() => {
                cardOne.classList.remove("shake", "flip");
                cardTwo.classList.remove("shake", "flip");
                cardOne = cardTwo = ''
            }, 1000);
        }
           
        
}

function shuffleCard() {
    matched = 0;
    timer()
    console.log('shuffling')
    
    let imgI = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8,]
    imgI = imgI.sort(() => Math.random() > 0.5 ? 1 : -1);
    //console.log(imgI)
    cards.forEach((card, i) => {
        card.classList.remove('flip')
        let imgTag = card.querySelector('.back-view img');
        imgTag.src = `./pairs.images/${imgI[i]}.png`
        console.log(imgTag)
        card.addEventListener('click', turnOver)
    })
    location.reload()
}
cards.forEach(card => {
    //console.log(card)
    card.addEventListener('click', turnOver)
})