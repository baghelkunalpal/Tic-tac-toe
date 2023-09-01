const boxes = document.querySelectorAll(".box");

const gameInfo = document.querySelector(".game-info");
const newGameButton = document.querySelector(".btn");


// first  of all initializing variales

let currentplay;

let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentplay = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newGameButton.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentplay}`;
}

initGame();


function swapTurn(){
    if(currentplay==="X"){
        currentplay = "0";
    }
    else{
        currentplay = "X";
    }
    gameInfo.innerText = `Current Player - ${currentplay}`;
}

function checkGameOver() {
    let answer = "";
    winningPositions.forEach((winningPosition) => { // Rename the parameter to avoid conflicts
        if (
            (gameGrid[winningPosition[0]] !== "" && gameGrid[winningPosition[1]] !== "" && gameGrid[winningPosition[2]] !== "") &&
            (gameGrid[winningPosition[0]] === gameGrid[winningPosition[1]]) && (gameGrid[winningPosition[1]] === gameGrid[winningPosition[2]])
        ) {
        
            if (gameGrid[winningPosition[0]] === "X")
                answer = "X";
            else
                answer = "0";

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            boxes[winningPosition[0]].classList.add("win"); 
            boxes[winningPosition[1]].classList.add("win"); 
            boxes[winningPosition[2]].classList.add("win"); 
        }
    });

 


  if(answer!==""){
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameButton.classList.add("active");
    return;
  }

  let fillCount = 0;
  gameGrid.forEach((box)=>{
    if(box!=="")
        fillCount++;
  });

  if(fillCount===9){
    gameInfo.innerHTML = "Game Tied 😱!";
    newGameButton.classList.add("active");
  }

}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText = currentplay;
        gameGrid[index] = currentplay;
        boxes[index].style.pointerEvents = "none";
        swapTurn();

        checkGameOver(winningPositions);
    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});
newGameButton.addEventListener("click",initGame);
