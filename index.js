let player = ["X", "O"]
let position = [0]
let played = ["","","","","","","","",""]
let score = [0, 0]
let ended = false

const buttons = document.querySelectorAll(".box")
const remind = document.querySelector(".remind")
const playerX = document.querySelector(".playerX")
const playerO = document.querySelector(".playerO")
const restart = document.querySelector(".restart")


function marker(element, position, x) {
    if (ended){ 
        gameEnd()
        ended = false
        remind.innerHTML = "New game Started"
    }else if (element.innerHTML != ""){
        remind.innerHTML = "This position is already taken"
    }else{
        remind.innerHTML = ""
        element.innerHTML = `<img class="image" src=${player[position[0]]}.png>`
        played[x] = player[position[0]]
        position[0] === 0 ? position[0] = 1: position[0] = 0
        winChecker()
    }
}

function gameEnd(){
    position = [0]
    played = ["","","","","","","","",""]
    buttons.forEach(element =>{
        element.innerHTML = ""})
    remind.innerHTML = ""
}

function match(board){
    if (board.toString() == ["X","X","X"].toString()){
        return 1
    }else if (board.toString() == ["O","O","O"].toString()){
        return 2
    }else{
        return false
    }
}
function gameWon(win){
    remind.innerHTML = `Player ${player[win - 1]} won the game!!!`
    score[win-1] += 1
    playerX.innerHTML = score[0]
    playerO.innerHTML = score[1]
    ended = true 

}
function winChecker(){
    for(let i = 0; i <= 6; i+=3){
       play = [played[i], played[i + 1 ], played[i + 2]]
       let win = match(play)
       if (win){
        gameWon(win)
        return
    }
    }
    for(let i = 0; i < 3; i++){
        play = [played[i + 0], played[i + 3], played[i + 6]]
        win = match(play)
        if (win){ 
            gameWon(win)
            return
        }
     }
    diagonal = [[played[0], played[4], played[8]], [played[2], played[4], played[6]]]
    diagonal.forEach(element => {
        win = match(element)
        if (win){ 
            gameWon(win)
            return
        }
    })
    if (!played.includes("") && remind.innerHTML==""){
        remind.innerHTML = "No Body Won the game!!!"
        ended = true
        return
    }
}

buttons.forEach( (element,x) => {
    element.addEventListener("click", e=>{ marker(element, position, x)  })
});

restart.addEventListener("click", e=>{
    let end = setTimeout(gameEnd, 1500)
    score = [0, 0]
    playerO.innerHTML = 0
    playerX.innerHTML = 0
})

