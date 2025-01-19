let userScore = 0;
let compScore = 0;
let randomProcessing = true;

let compChoiceRandom = document.querySelector(".comp_choice");
let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let yourScore = document.querySelector("#user-score");
let oppScore = document.querySelector("#comp-score");
let comp_Text = document.querySelector("#compText");
let img = document.querySelector(".c_choice");
resetBtn = document.getElementById("resetBtn")

window.onload = () => {
    randomImg();
}

const showScore = (userWin) => {
    if(userWin){
        userScore++;
        console.log("UserScore = ",userScore);
        yourScore.innerText = `${userScore}`;
    }else{
        compScore++;
        console.log("Comp Score = ",compScore);
        oppScore.innerText = `${compScore}`;
    }
}

let interval2;
const randomImg = () =>{
    if(randomProcessing){
        clearInterval(interval2)
        interval2 = setInterval((displayRandomImages),100);
    }   
}

const displayRandomImages = () => {
    let images = ["images/paper.png","images/rock.png","images/scissors.png"];
    let randomIdx = Math.floor(Math.random() * 3);
    let imageDisplay = images[randomIdx];
    img.src = imageDisplay;
    return imageDisplay;
}

const genCompChoice = () => {
    let options = ["rock", "paper", "scissor"];
    let randIdx = Math.floor(Math.random() * 3);
    let compChoice = options[randIdx];
    return compChoice;
} 

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin){
        msg.innerText = `You Win!, Your ${userChoice} beats Computers ${compChoice}`;
        msg.style.backgroundColor = "green";
    }else{
        msg.innerText = `You Lose :(  Computers ${compChoice} beats Your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

const playGame = (userChoice) =>{
    randomProcessing = false;
    console.log("User Choice = ",userChoice);
    setTimeout(() => {
        clearInterval(interval2);
        let compChoice = genCompChoice();
        console.log("Comp choice = ",compChoice);
        if(compChoice == "rock"){
            img.src = "images/rock.png";
        }else if(compChoice == "paper"){
            img.src = "images/paper.png"
        }else{
            img.src = "images/scissors.png"
        }
        if(userChoice === compChoice){
            msg.innerText = "The Match Was Draw, Play Again";
            msg.style.backgroundColor = "#201E50";
        }
        else{
            let userWin = true;
            if(userChoice === "rock"){
                userWin = compChoice === "paper" ? false : true;
            }
            else if(userChoice === "paper"){
                userWin = compChoice === "scissor" ? false : true;
            }else {
                userWin = compChoice === "rock" ? false : true;
            }
            showWinner(userWin, userChoice, compChoice);
            showScore(userWin);
        }
        setTimeout(()=>{
            randomProcessing = true;
            randomImg();
            msg.innerText = "Pick Next Move"
            msg.style.backgroundColor = "#201E50"
        },2000)
    },0)
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        userChoice = choice.getAttribute("id");
        console.log("Clicked",userChoice);
        playGame(userChoice);
    })
})

resetBtn.addEventListener("click",() => {
    userScore = 0;
    compScore = 0;
    yourScore.innerText = `${userScore}`;
    oppScore.innerText = `${compScore}`;
    msg.innerText = "Pick Any Move";
    console.log("Clicked")
})