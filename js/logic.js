//variables
let cols = 8, rows = 8, totalMines = 10; 
let h = 0, m = 0, s = 0;
let flag = false, flagStartBtn = true;
let counterInterval;
const msgDom = document.getElementById('msg');
const tableDom = document.getElementsByTagName('table');
const container = document.getElementById("container");
const counter = document.getElementById("counter");
const restartBtn = document.createElement('button');
const startBtn = document.getElementById('start_button');
const msgOfLoosing = "You just been explosed!! Try again ;)";
const msgOfWinning = "Congratulations You.ve just win this round!! ;)";

//generate a random number between 0 - 19
function rndNumber(){
    return Math.floor(Math.random() * cols)
}

// Create the multidimensional array
function initContainer() {
    let mContainer = new Array(cols);

        for (let index = 0; index < mContainer.length; index++) {
            mContainer[index] = new Array(rows);            
        }

    return mContainer
}

// Fill out the multidimensional array with
//  1- coordineates
//  2- mines
function fillContainerWMinesCoor(){    
    let iContainer = initContainer();
    let rndNumber1 = 0, rndNumber2 = 0;

    //fill with coordinates
    for (let i = 0; i < iContainer.length; i++) {
         let innerArray = iContainer[i];
        for (let j = 0; j < innerArray.length; j++) {
            iContainer[i][j] = ` [${i}:${j}] `;
        }
    }

    //fill with mines
    while (totalMines > 0) {
        rndNumber1 = rndNumber();
        rndNumber2 = rndNumber();
        iContainer[rndNumber1][rndNumber2] = 'X'
        totalMines--;
    }

    return iContainer;
}

//Fill with number of mines
function fillContainerWNMines() {
    const iContainer = fillContainerWMinesCoor();
    let counter = 0;

    for (let i = 0; i < iContainer.length; i++) {
        let innerArray = iContainer[i];
        for (let j = 0; j < innerArray.length; j++) {
            //top left corner
            if (iContainer[i][j] != 'X') {                
                if (i == 0 && j == 0) {
                    if (iContainer[i+1][j] == 'X') {
                        counter++;
                    } if (iContainer[i+1][j+1] == 'X') {
                        counter++;
                    } if (iContainer[i][j+1] == 'X') {
                        counter++;
                    }
                }
                //top right corner
                else if ((i == 0 && j == (rows - 1))) {
                    if (iContainer[i][j-1] == 'X') {
                        counter++;
                    } if (iContainer[i+1][j-1] == 'X') {
                        counter++;
                    } if (iContainer[i+1][j] == 'X') {
                        counter++;
                   }     
                }
                //left line 
                else if ((i != 0 && i != rows -1 && j == 0)) {
                    if (iContainer[i+1][j] == 'X') {
                        counter++;
                    } if (iContainer[i+1][j+1] == 'X') {
                        counter++;
                    } if (iContainer[i][j+1] == 'X') {
                        counter++;
                    } if (iContainer[i-1][j] == 'X') {
                        counter++;
                    } if (iContainer[i-1][j+1] == 'X') {
                        counter++;
                    }
                }
                //right line
                else if (i != 0 && i != (rows-1) && j == (cols - 1)) {
                    if (iContainer[i-1][j] == 'X') {
                        counter++;
                    }  if (iContainer[i-1][j-1] == 'X') {
                        counter++;
                    } if (iContainer[i][j-1] == 'X') {
                        counter++;
                    } if (iContainer[i+1][j-1] == 'X') {
                        counter++;
                    } if (iContainer[i+1][j] == 'X') {
                        counter++;
                    } 
                }    
                // top line
                else if (i == 0 && j != 0) {
                    if (iContainer[i][j-1] == 'X') {
                        counter++;
                    } if (iContainer[i+1][j-1] == 'X') {
                        counter++;
                    } if (iContainer[i+1][j] == 'X') {
                        counter++;
                    } if (iContainer[i+1][j+1] == 'X') {
                        counter++;
                    } if (iContainer[i][j+1] == 'X') {
                         counter++;
                    } 
                }
                //bottom line **
                else if (i == (rows -1) && j != 0 && j != (cols -1)) {
                    if (iContainer[i][j-1] == 'X') {
                        counter++;
                    } if (iContainer[i-1][j-1] == 'X') {
                        counter++;
                    } if (iContainer[i-1][j] == 'X') {
                        counter++;
                    } if (iContainer[i-1][j+1] == 'X') {
                        counter++;
                    } if (iContainer[i][j+1] == 'X') {
                        counter++;
                    }    
                }
                // left bottom corner
                 else if (i == (rows -1) && j == 0) {
                    if (iContainer[i-1][j] == 'X') {
                        counter++;
                    } if (iContainer[i-1][j+1] == 'X') {
                        counter++;
                    } if (iContainer[i][j+1] == 'X') {
                        counter++;
                    } 
                }
                // right bottom corner
                else if (i == (rows -1) && j == (cols - 1)) {
                    if (iContainer[i-1][j-1] == 'X') {
                        counter++;
                    } if (iContainer[i][j-1] == 'X') {
                        counter++;
                    } if (iContainer[i-1][j] == 'X') {
                        counter++;
                    }
                }
                
                if (i != 0 && j != 0 && i != (rows - 1) && j != (cols -1)) {
                    if (iContainer[i-1][j-1] == 'X') {
                        counter++;
                    } if (iContainer[i-1][j] == 'X') {
                        counter++;
                    } if (iContainer[i-1][j+1] == 'X') {
                        counter++;
                    } if (iContainer[i][j-1] == 'X') {
                        counter++;
                    } if (iContainer[i][j+1] == 'X') {
                        counter++;
                    } if (iContainer[i+1][j-1] == 'X') {
                        counter++;
                    } if (iContainer[i+1][j] == 'X') {
                        counter++;
                    } if (iContainer[i+1][j+1] == 'X') {
                        counter++;
                    }
                }
            }
            if (counter != 0 ) {
                iContainer[i][j] = counter;
            }
            counter = 0;
        }
    }

    return iContainer;
}

//check if the mines are clicked and actuate
function checkClickedMine(event){
    let currentTarget = event.target;
    let allInputs = document.getElementsByTagName("input");
    
    //in case of clicking a mine
    if (!flag) {
        if (currentTarget.value == 'X') {
            for (let i = 0; i < allInputs.length; i++) {
    
                if (allInputs[i].value == 'X') {
                    blockInputs(allInputs[i]);
                    allInputs[i].className = ' show_input_value';
                }
            }
            printFinalMsg(msgOfLoosing, flag);
            currentTarget.className = ' clicked_mine ';

            //in case of clicking an empty cell    
        } else if (currentTarget.value.match('[\d:\d]')) {
            currentTarget.className = 'empty_input ';
            currentTarget.value = '';
        } 
        currentTarget.className += ' show_input_value ';
    }
}

//remove the listener of clicking and clear the inteval 
//means stop the counter
function blockInputs(input) {
    flag = true;
    input.removeEventListener('click', checkClickedMine);
    clearInterval(counterInterval);
}

//Printing the filled container on the html
function printFilledContainer() {
    let filledContainer = fillContainerWNMines();
    let table = document.createElement("table");

    for (let i = 0; i < filledContainer.length; i++) {
        let rowTable = document.createElement("tr");
        for (let j = 0; j < filledContainer[i].length; j++) {
            let cell = document.createElement("td");
            let input = document.createElement("input");
            input.type = 'button'
            input.value = filledContainer[i][j];
            input.className = "hide_input_value";
            input.addEventListener("click", checkClickedMine.bind(this), false);
            cell.appendChild(input); 
            rowTable.appendChild(cell);
        }
        table.appendChild(rowTable);
    }

    container.appendChild(table);
}

//print th emsg depen of he's winning or loosing
function printFinalMsg(msg, isLoosed){
    
    restartBtn.append('Restart');
    restartBtn.className = 'restart_button';

    if (isLoosed) {
        msgDom.className = 'msg loosing_msg'
        msgDom.innerHTML = msg;
        msgDom.parentNode.insertBefore(restartBtn, msgDom.nextSibling)
        tableDom[0].className = 'red_border';
    }
}

function printCounter() {
    counter.innerHTML = "Counter: 00:00:00"
}

//increment the counter
function incrementCounter(){
    let sAux = '', mAux = '', hAux = '';

    s++;

    if (s == 60) {
        m++;
        s = 0;
    } 
    if (m == 60) {
        h++;
        m = 0;
    }

    s < 10 ? sAux = '0' + s : sAux = s;
    m < 10 ? mAux = '0' + m : mAux = m;
    h < 10 ? hAux = '0' + h : hAux = h;

    counter.innerHTML = "Counter: " + hAux + ":" + mAux + ":" + sAux;
}

//init the counter every one second automatically
function initTheInterval() {
    counterInterval = setInterval( incrementCounter, 1000)
}

function hideStartBtn() {
    if (!flagStartBtn) {
        startBtn.style.display = 'block'
    } else {
        startBtn.style.display = 'none'
    }
}

function resetAllVariables(){
    s = 0, m = 0, h = 0;
    flag = !flag;
    flagStartBtn = !flagStartBtn;
}

function startTheGame() {    
    printCounter();

    startBtn.onclick =()=>{
        initTheInterval();
        printFilledContainer();

        hideStartBtn();

    };   
}

restartBtn.onclick =()=>{
    printCounter();
    resetAllVariables();

    //clearInterval(initTheInterval);        
    //initTheInterval();
    window.location.reload();
    hideStartBtn();
};

//invoking the game
startTheGame();