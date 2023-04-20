
const buttons = document.querySelectorAll(".box")
const remind = document.querySelector(".remind")
const playerX = document.querySelector(".playerX")
const playerO = document.querySelector(".playerO")
const tie = document.querySelector(".tie")
const restart = document.querySelector(".restart")


let player = ["X", "O"]
let currPlayer = 0
let board = ["","","","","","","","",""]
let score = [0, 0, 0]
let ended = false

const wonPos = [
    [buttons[0], buttons[1],buttons[2]],
    [buttons[3], buttons[4],buttons[5]], 
    [buttons[6], buttons[7],buttons[8]],
    [buttons[0], buttons[3],buttons[6]], 
    [buttons[1], buttons[4],buttons[7]], 
    [buttons[2], buttons[5],buttons[8]], 
    [buttons[0], buttons[4],buttons[8]], 
    [buttons[2], buttons[4],buttons[6]],]

const associatedPos = [ [0,3,6], [0,4], [0,5,7],[1,3],[1,4,6,7],[1,5], [2,3,7], [2,4], [2,5,6] ]

let untakenPos = [true,true,true,true,true,true,true,true]


function marker(element,  index) {
    if (ended){ 
        gameEnd()
        ended = false
        remind.innerHTML = "New game Started"
    }else if (element.innerHTML != ""){
        remind.innerHTML = "This position is already taken"
    }else{
        remind.innerHTML = ""
        element.innerHTML = `<img class="image" src=${player[currPlayer]}.png>`
        board[index] = player[currPlayer]
        winChecker(index)
        currPlayer = 1 - currPlayer
        
    }
}

function gameEnd(){
    position = [0]
    board = ["","","","","","","","",""]
    buttons.forEach(element =>{
        element.className = "box"
        element.innerHTML = ""

    })
    remind.innerHTML = ""
}


function gameWon(winPos){
    remind.innerHTML = `Player ${player[currPlayer]} won the game!!!`
    score[currPlayer] += 1
    playerX.innerHTML = score[0]
    playerO.innerHTML = score[1]
    winPos.forEach( element =>{
        element.classList.toggle("active")
    })
    ended = true 

}
function winChecker(pos){
    const currPlay = [player[currPlayer], player[currPlayer], player[currPlayer]].toString()
    const winningPos = [
        [board[0], board[1],board[2]],
        [board[3], board[4],board[5]], 
        [board[6], board[7],board[8]],
        [board[0], board[3],board[6]], 
        [board[1], board[4],board[7]], 
        [board[2], board[5],board[8]], 
        [board[0], board[4],board[8]], 
        [board[2], board[4],board[6]],]
    associatedPos[pos].every(boardIndex =>{
        let checking = winningPos[boardIndex]
        console.log(checking.toString(),"---", currPlay)
        if (checking.toString() == currPlay){
            gameWon( wonPos[boardIndex])
            return false
        }
        return true
    })

    if (!board.includes("") && remind.innerHTML==""){
        remind.innerHTML = "No Body Won the game!!!"
        buttons.forEach(element =>{
            element.classList.toggle("tied")
        })
        score[2] += 1
        tie.innerHTML = score[2]
        ended = true
        return
    }
}

buttons.forEach( (element,index) => {
    element.addEventListener("click", e=>{ marker(element, index)  })
});

restart.addEventListener("click", e=>{
    let end = setTimeout(gameEnd, 1500)
    score = [0, 0, 0]
    playerO.innerHTML = 0
    playerX.innerHTML = 0
    tie.innerHTML = 0
})
