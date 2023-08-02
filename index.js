let currentPlayer = 'X'

btnRestart.addEventListener('click', restart)

const Player = (sign) =>{
    const getSign = () => sign

    return {getSign}
}


const gameBoard = (() =>{
    const game = ['','','','','','','','','']
    const getSquare = (index) => {
        return game[index];
    };

    const setSquare = (index, sign) => {
        if (index >= 0 && index < game.length) {
            game[index] = sign;
        }
    };
    const reset = () => {
        for (let i = 0; i < game.length; i++) {
            game[i] = '';
        }
    };

    return {getSquare, setSquare, reset}
})();


const displayController = (() =>{
    const squareElements = document.querySelectorAll('.square')
    const btnRestart = document.getElementById('restart')

    squareElements.forEach((square, index) => {
        square.addEventListener('click', (e) => {
            if (gameController.getIsOver() || e.target.textContent !== '') {
                return;
            }
            gameController.playRound(index);
            updateGameboard();
        });
    });

    const updateGameboard = () => {
        for (let i = 0; i < squareElements.length; i++) {
            squareElements[i].textContent = gameBoard.getSquare(i);
        }
    };
    
    const setResultMessage = (winner) => {
        if (winner === "Draw") {
          return console.log("It's a draw!");
        } else {
          return console.log(`Player ${winner} has won!`);
        }
      };
    
      return {setResultMessage}

})()

const gameController = (() => {
    const playerX = Player('X')
    const player0 = Player('0')
    let round = 1
    let isOver = false

    const playRound = (squareIndex) => {
        gameBoard.setSquare(squareIndex ,getCurrentPlayerSign())
        if(checkWinner(squareIndex)){
            isOver = true
            return console.log('win')
        }
        if (round === 9){
            isOver = true 
            return console.log('draw')
        }
        round ++
    }

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSign() : player0.getSign()
    }

    const checkWinner = (fieldIndex) => {
        const winConditions = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
    
        return winConditions
          .filter((combination) => combination.includes(squareIndex))
          .some((possibleCombination) =>
            possibleCombination.every(
              (index) => gameBoard.getField(index) === getCurrentPlayerSign()
            )
          );
      };

      const getIsOver = () => {
        return isOver
      }

      const reset = () => {
        round = 1;
        isOver = false 
      }

      return {playRound, getIsOver, reset }
    })()

// cells.forEach((cell, index) => {
//     cell.addEventListener('click',()=> makeMove(index))
// });


// function restart(){
//     cells.forEach(cell => {
//             cell.innerHTML = '' 
//     });

//     game = ['','','','','','','','','']
// }


// function makeMove(index){
//     if(game[index] === ''){
//         game[index] = currentPlayer;
//         cells[index].innerHTML = currentPlayer
//         currentPlayer = currentPlayer === 'X' ? '0' : 'X'
//     }
// }

// const winConditions = [[0,1,2],[2,5,8],[0,3,6],[6,7,8],[0,4,8],[2,4,6],[1,4,7],[3,4,5]]

// function checkGameOver(){
//     if(game[0] == game[1] == game[2] || 
//         game[2] == game[5] == game[8] ||
//         game[0] == game[3] == game[6] ||
//         game[6] == game[7] == game[8] ||
//         game[0] == game[4] == game[8] ||
//         game[2] == game[4] == game[6] ||
//         game[1] == game[4] == game[7] ||
//         game[3] == game[4] == game[6] ){
//             return 'win'
//         }else if(!game.includes('')){
//             return 'tie'
//         }else{
//             return 'play'
//         }
// }

// let gameOver = false;


