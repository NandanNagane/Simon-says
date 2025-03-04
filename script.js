const start=document.querySelector("#start");
const buttons=document.querySelectorAll(".game button");
const levelCount=document.querySelector(".level-count");
const strictMode=document.querySelector("#mode input[type='checkbox']");
let userSequence=[];
let comSequence=[];
let isPlaying=false;
let level=1;
let started=false;

function lightButton(buttonIdx){ 
     buttons[buttonIdx].style.filter = "brightness(160%)";
     setTimeout(() => {
        buttons[buttonIdx].style.filter = "brightness(100%)";
      }, 400);
 }
async function playSequence() {
    isPlaying = true;
    for (let i = 0; i < comSequence.length; i++) {
        await new Promise((resolve) =>{
            setTimeout(()=>{
                resolve();
            }, 800)
        } 
        );
        const buttonIdx = comSequence[i];
        lightButton(buttonIdx);
    }
    isPlaying = false;
}
function congrats(){
    alert("Congratulations! You have won the game.Click on 'OK' to restart the game");
    setTimeout(()=>{startFun();},1000);
}
function nextInSequence(){
    if(level===10) {congrats(); return;}
    comSequence.push(Math.floor(Math.random()*4));
    level++;
    levelCount.textContent=level;
    userSequence=[];
    playSequence();
    
}

function checkSequence(){
    for(let i=0;i<userSequence.length;i++){
        if(userSequence[i]!==comSequence[i]){
            if(strictMode.checked){
                 setTimeout(() => {
                    alert('Wrong move! Starting over.');
                    startFun();
                  }, 600);
            }
            else {
                setTimeout(() => {
                    alert('Wrong move!, Try again.');
                    playSequence();
                  }, 600);
                userSequence=[];
            }
            return;
        }
    }
     if(userSequence.length===comSequence.length){
        setTimeout(() => {
            nextInSequence();
        }, 1000);
    }
    
}
buttons.forEach((btn,index) => {
    btn.addEventListener("click", () => {
        if(isPlaying ) return;
        if(started===false) {alert ("First Start the Game"); return;}
        userSequence.push(index);
        lightButton(index);
        checkSequence();
    });
});

function startFun(){  
    started=true;
    level=1;
    levelCount.textContent=level;
    start.disabled=true;
    comSequence=[];
    userSequence=[];
    comSequence.push(Math.floor(Math.random()*4));
    playSequence();
    
}

start.addEventListener("click",startFun)