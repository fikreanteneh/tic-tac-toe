let player = ["X", "O"]
let position = [0]
let played = ["","","","","","","","",""]
let score = [0, 0, 0]
let ended = false

const buttons = document.querySelectorAll(".box")
const remind = document.querySelector(".remind")
const playerX = document.querySelector(".playerX")
const playerO = document.querySelector(".playerO")
const tie = document.querySelector(".tie")
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
        element.className = "box"
        element.innerHTML = ""

    })
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
function gameWon(win, winPos){
    remind.innerHTML = `Player ${player[win - 1]} won the game!!!`
    score[win-1] += 1
    playerX.innerHTML = score[0]
    playerO.innerHTML = score[1]
    // let winPos = [buttons[indexes[0]], buttons[indexes[1]], buttons[indexes[2]]]
    winPos.forEach( element =>{
        element.classList.toggle("active")
    })
    ended = true 

}
function winChecker(){
    let checkPos = [
        [[played[0], played[1],played[2]], [buttons[0], buttons[1],buttons[2]]],
        [[played[3], played[4],played[5]], [buttons[3], buttons[4],buttons[5]]],
        [[played[6], played[7],played[8]], [buttons[6], buttons[7],buttons[8]]],
        [[played[0], played[3],played[6]], [buttons[0], buttons[3],buttons[6]]],
        [[played[1], played[4],played[7]], [buttons[1], buttons[4],buttons[7]]],
        [[played[2], played[5],played[8]], [buttons[2], buttons[5],buttons[8]]],
        [[played[0], played[4],played[8]], [buttons[0], buttons[4],buttons[8]]],
        [[played[2], played[4],played[6]], [buttons[2], buttons[4],buttons[6]]]
        ]
    checkPos.every(element =>{

        let play = element[0]
        let boxes = element[1]
        let win = match(play)
        if (win){
            gameWon(win, boxes)
            return false
        }
        return true
    })
    
    // for(let i = 0; i <= 6; i+=3){
    //    play = [played[i], played[i + 1 ], played[i + 2]]
    //    let win = match(play)
    //    if (win){
    //     gameWon(win, [i, i+1, i+2])
    //     return
    // }
    // }
    // for(let i = 0; i < 3; i++){
    //     play = [played[i], played[i + 3], played[i + 6]]
    //     win = match(play)
    //     if (win){ 
    //         gameWon(win, [i, i+3, i+6])
    //         return
    //     }
    //  }
    // for (let i = 0; i < 2; i++){
    //     play = [played[i*2], played[4], played[8-(i*2)]]
    //     win = match(play)
    //     if (win){ 
    //         gameWon(win, [i*2, 4, 8 - (i*2)])
    //         return
    //     }
    // }
    if (!played.includes("") && remind.innerHTML==""){
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

buttons.forEach( (element,x) => {
    element.addEventListener("click", e=>{ marker(element, position, x)  })
});

restart.addEventListener("click", e=>{
    let end = setTimeout(gameEnd, 1500)
    score = [0, 0, 0]
    playerO.innerHTML = 0
    playerX.innerHTML = 0
    tie.innerHTML = 0
})


// diagonal = [[played[0], played[4], played[8]], [played[2], played[4], played[6]]]
    // diagonal.forEach( (element, index) => {