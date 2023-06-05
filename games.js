
const element = document.getElementById("element")
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winCondition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

initGame();

function initGame(){
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
  
}
//trying to make the cell that is chosen to change colour with on mouse over
// cells.onmouseOver = doSomething;

function doSomething(){
    element.style.backgroundColor = "red";
}
// const mouse = function onmouseOver(){
    
// }

function cellClicked(){
    const cellIndex =this.getAttribute("cellIndex");
    element.onmouseOver = doSomething;

    if(options[cellIndex] != "" || !running){
        return;
    }

    
    updateCell(this, cellIndex);
    
    checkWinner();
}

function updateCell(cell, index){
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i< winCondition.length; i++){
        const condition = winCondition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }

        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins`;
        running =false;
    }
    else if(!options.includes("")){
        statusText.textContent =`Draw!`;
        running = false;

    }
    else{
        changePlayer();
    }
}



function restartGame(){
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}


// this is what is going to make the pop ups
setTimeout(firstMessage, 30000);
setTimeout(fasterMessage, 1000000);

function firstMessage(){
    alert("Now that you know that the game works, try to beat the timer");
}

function fasterMessage(){
    alert("LoL! Times up.....play another game");
}