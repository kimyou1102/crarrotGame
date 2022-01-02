const playBtn = document.querySelector('.playBtn');
const timer = document.querySelector('.timer');
const count = document.querySelector('.count');
const popup = document.querySelector('.popup');
const field = document.querySelector('.field');
const sound = document.querySelector('.sound');
const winSound = document.querySelector('.winSound');
const carrotSound = document.querySelector('.carrotSound');
const bugSound = document.querySelector('.bugSound');
const alertSound = document.querySelector('.alertSound');

let timeCount;
let time;

makecarrotBug(7, 'bug');
makecarrotBug(10, 'carrot');

function makecarrotBug(num, carrotOrBug) {
    for(let i=0; i < num; i++) {
        let img = document.createElement('img');
        img.setAttribute('class', carrotOrBug);
        let top = Math.random() * (630 - 380) + 380;
        let left = Math.random() * (1456);
        img.src = `img/${carrotOrBug}.png`
        img.style.top = top + 'px';
        img.style.left = left + 'px';
        field.appendChild(img);
    }
}

playBtn.addEventListener('click', () => {
    if(playBtn.innerHTML === `<i class="fas fa-stop" aria-hidden="true"></i>`) {
        clearInterval(timeCount);
        alertSound.play();
        let message = 'Replay❓'
        gamestop(message);
    } else {
        playState();
    }
})

function gamestop(message) {
    sound.pause();
    sound.currentTime = 0
    playBtn.style.visibility = 'hidden';
    popup.innerHTML = `<button class="redoBtn"><i class="fas fa-redo"></i></button>${message}`;
    popup.style.display = 'block';
    const redoBtn = document.querySelector('.redoBtn');
    redoBtn.addEventListener('click', () => {
        playBtn.innerHTML = `<i class="fas fa-play"></i>`;
        playBtn.style.visibility = 'visible';
        popup.style.display = 'none';
        timer.innerHTML = `0:10`;
        playState();
        winSound.pause();
        winSound.currentTime = 0
    })
}

function playState() {
    playBtn.innerHTML = `<i class="fas fa-stop"></i>`;
    sound.load();
    count.innerHTML = 10;
    timerStart();
    appearInField();
    let carrotNum = 10;
    field.addEventListener('click', (event) => {
        if(event.target.className === 'carrot') {
            carrotNum--;
            count.innerHTML = carrotNum;
            event.target.style.display = 'none';
            // carrotSound.play();
            console.log(carrotSound.paused);
            if (!carrotSound.paused) { //멈춘
                carrotSound.pause();
                carrotSound.currentTime = 0
            }
            carrotSound.play();
            
        } else if(event.target.className === 'bug') {
            clearInterval(timeCount);
            bugSound.play();
            let message = 'YOU LOST💩';
            gamestop(message);
        }
    });
}

function appearInField() {
    let carrotRandom = document.querySelectorAll('.carrot');
    randomPosition(10, carrotRandom);
    let bugRandom = document.querySelectorAll('.bug');
    randomPosition(7, bugRandom);
}

function randomPosition(num, carrotOrBug) {
    for(let i=0; i < num; i++) {
        let newTop = Math.random() * (630 - 380) + 380;
        let newLeft = Math.random() * (1456);    
        carrotOrBug.item(i).style.display = 'block';
        carrotOrBug.item(i).style.top = newTop + 'px';
        carrotOrBug.item(i).style.left = newLeft + 'px';
    }
}

function timerStart() {
    time = 10;
    timeCount = setInterval(function() {
        timer.innerHTML = `0:${time}`
        time--;

        if(time !==0 && count.innerHTML === '0') { //time > 0으로 했을 때는 2초때 클릭해도 안멈추고 lost로 떴음
            clearInterval(timeCount);
            winSound.play();
            let message = 'YOU WON👏';
            gamestop(message);
        } else if(time < 0) {
            clearInterval(timeCount);
            let message = 'YOU LOST💩';
            gamestop(message);
        }

    }, 1000);
}


// for(let i=0; i < 10; i++) {
//     let carrotImg = document.createElement('img');
//     carrotImg.setAttribute('class', 'carrot');
//     let top = Math.random() * (630 - 380) + 380;
//     let left = Math.random() * (1456);
//     carrotImg.src = 'img/carrot.png';
//     carrotImg.style.top = top + 'px';
//     carrotImg.style.left = left + 'px';
//     field.appendChild(carrotImg);
// }

// for(let i=0; i < 7; i++) {
//     let bugImg = document.createElement('img');
//     bugImg.setAttribute('class', 'bug');
//     let top = Math.random() * (630 - 380) + 380;
//     let left = Math.random() * (1456);
//     bugImg.src = 'img/bug.png';
//     bugImg.style.top = top + 'px';
//     bugImg.style.left = left + 'px';
//     field.appendChild(bugImg);
// }

// body.addEventListener('click', (event)=> {
//     console.dir(event.target.className);
//     console.dir(event.target.tagName);
//     if(event.target.tagName === 'I' || event.target.className === 'playBtn') {
//         console.log('플레이버튼 선택');
//         if(playBtn.innerHTML === `<i class="fas fa-stop" aria-hidden="true"></i>`) {
//             playBtn.style.visibility = 'hidden';
//             let message = 'Replay❓'
//             popup(message);
//         } else {
//             playBtn.innerHTML = `<i class="fas fa-stop"></i>`;
//         }
    
//     }
// })