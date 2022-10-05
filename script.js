const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");
let score = 0;
let pipePositionScore = pipe.offsetLeft;
const play = new Audio("./audio/play.mp3");
const jumpS = new Audio("./audio/jump.mp3");
const gameOver = new Audio("./audio/gameover.mp3");

const jump = () => {
    mario.classList.add("jump");
    jumpS.play();
    setTimeout(() => {
        mario.classList.remove("jump");
    }, 500);
}

botaoIniciar = document.querySelector("#iniciar");
MarioWorld = document.querySelector(".MarioWorld");
function iniciar() {
    pipe.classList.add("pipe-animation");
    clouds.classList.add("clouds-animation");
    mario.removeAttribute("hidden");
    MarioWorld.setAttribute("hidden","hidden");
    botaoIniciar.setAttribute("hidden", "hidden");
    document.addEventListener("keydown", jump);
    document.addEventListener("click", jump);
    play.play();
}

const loop = setInterval(() => {
    const cloudsPosition = clouds.offsetLeft;
    const pipePosition = pipe.offsetLeft;
    // "+" junto ao window serve para converter um string de numero em numero
    const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        //para a animação da nuvem e set a posição onde parou
        clouds.style.animation = "none";
        clouds.style.left = `${cloudsPosition}px`;

        pipe.style.animation = "none";
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = "none";
        mario.style.bottom = `${marioPosition}px`;
        mario.src = "./imagens/game-over.png";
        mario.style.width = "80px";
        mario.style.marginLeft = "40px";

        document.getElementById("recomecar").removeAttribute("hidden");
        play.pause();
        gameOver.play();
        clearInterval(loop);
    } else if (pipePosition > pipePositionScore) {
        score += 100;
        document.getElementById("score").innerHTML = score;
        //acelera pipe
        if (score % 500 === 0) {
            pipe.style.animationDuration = aceleraPipe();
        }
    }
    pipePositionScore = pipePosition;

}, 10);



function aceleraPipe() {
    //"+" serve pra converter um string number em number
    let pipeT = +window.getComputedStyle(pipe).animationDuration.replace("s", "");
    pipeT -= 0.05;
    return pipeT + "s";
}