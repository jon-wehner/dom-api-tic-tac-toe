window.addEventListener("DOMContentLoaded", (event) => {
  const xImg =  'https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg'
  const oImg =  'https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg'
  const board = document.getElementById("tic-tac-toe-board");
  const headLine = document.getElementById('game-status');
  const newGameButton = document.getElementById("new-game");
  const giveUpButton = document.getElementById("give-up");

  let currentPlayerSymbol = 'x';
  let squareValues = ["", "", "", "", "", "", "", "", ""];
  let gameStatus = "";
  loadGameState();
//START
  function loadGameState(){
      currentPlayerSymbol = JSON.parse(localStorage['currentPlayerSymbol']);
      squareValues = JSON.parse(localStorage['squareValues']);
      gameStatus = JSON.parse(localStorage['gameStatus']);

      //if squareValues[i] = 'x' makeimg(square i, x)
      const squares = document.querySelectorAll(".square");
      for(let i = 0; i < squares.length; i++){
        const symbol = document.createElement('img');
          if(squareValues[i] === 'x'){
            symbol.setAttribute("src", xImg);
            symbol.setAttribute("class", 'x');
          } else if (squareValues[i] === 'o'){
              symbol.setAttribute("src", oImg);
              symbol.setAttribute("class", 'o');
          } else {

          }
          squares[i].appendChild(symbol);
          console.log(squares)
      }

  }

  function makeImg(src, className, event){
      const symbol = document.createElement('img');
      symbol.setAttribute("src", src);
      symbol.setAttribute("class", className);
      event.target.appendChild(symbol);
  }

  function checkGameStatus(){
    //check for a tie
    let filledSquares = squareValues.filter((ele) => ele.length > 0)
    if (filledSquares.length === 9) {
      gameStatus = "Winner: None"
    }
    //check verticle
    if ((squareValues[0] === squareValues[3] && squareValues[3] === squareValues[6] && squareValues[6] !== "") ||
    (squareValues[1] === squareValues[4] && squareValues[4] === squareValues[7] && squareValues[7] !== "") ||
    (squareValues[2] === squareValues[5] && squareValues[5] === squareValues[8] && squareValues[8] !== "")) {
        gameStatus = 'Winner: ' + currentPlayerSymbol.toUpperCase();
        newGameButton.removeAttribute('disabled');
    }
    //check horizontal
    if ((squareValues[0] === squareValues[1] && squareValues[1] === squareValues[2] && squareValues[2] !== "") ||
    (squareValues[3] === squareValues[4] && squareValues[4] === squareValues[5] && squareValues[5] !== "") ||
    (squareValues[6] === squareValues[7] && squareValues[7] === squareValues[8] && squareValues[8] !== "")) {
        gameStatus = "Winner: " + currentPlayerSymbol.toUpperCase();
        newGameButton.removeAttribute('disabled');

    }
    //check diagnal
    if ((squareValues[0] === squareValues[4] && squareValues[4] === squareValues[8] && squareValues[8] !== "") ||
    (squareValues[2] === squareValues[4] && squareValues[4] === squareValues[6] && squareValues[6] !== "")){
        gameStatus = "Winner: " + currentPlayerSymbol.toUpperCase();
        newGameButton.removeAttribute('disabled');
    }
    headLine.innerHTML = gameStatus;
  }

  function saveGameState(){
      localStorage.setItem('currentPlayerSymbol', JSON.stringify(currentPlayerSymbol));
      localStorage.setItem('squareValues', JSON.stringify(squareValues));
      localStorage.setItem('gameStatus', JSON.stringify(gameStatus));
  }

  board.addEventListener("click",(event) => {
      let squareIdNum = Number.parseInt(event.target.id.slice(-1));


    if (squareValues[squareIdNum] === "" && gameStatus === "") {
      if (currentPlayerSymbol === 'x') {
        squareValues[squareIdNum] = 'x'
        makeImg(xImg, 'x', event);
        checkGameStatus()
        currentPlayerSymbol = 'o';
      } else {
        squareValues[squareIdNum] = 'o'
        makeImg(oImg, 'o', event);
        checkGameStatus()
        currentPlayerSymbol = 'x'
      }
    }
    saveGameState();
  })

  function newGame() {
  localStorage.clear();
  giveUpButton.disabled = false;
  gameStatus = ""
  headLine.innerHTML = ""
  squareValues = ["", "", "", "", "", "", "", "", ""];
  const squares = document.querySelectorAll(".square");
  squares.forEach(ele => {
    ele.innerHTML = ""
  })
  currentPlayerSymbol = 'x'
  newGameButton.disabled = true;
  }

  newGameButton.addEventListener("click", (event) => {
      newGame();
  })

  function addGiveUp() {
    giveUpButton.addEventListener("click", (event) => {
      if (currentPlayerSymbol === "x") {
      gameStatus = 'Winner: O'
      } else {
      gameStatus = 'Winner: X'
      }
      headLine.innerHTML = gameStatus
      giveUpButton.disabled = true;
      newGameButton.disabled = false;

    } )
  }
  addGiveUp()



})
