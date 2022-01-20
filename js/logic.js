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
const msgOfWinning = "Congratulations You've just win this round!! ;)";
const bomb = '💣';

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
        iContainer[rndNumber1][rndNumber2] = bomb;
        totalMines--;
    }

    return iContainer;
}

//Fill with number of mines
function fillContainerWNMinesNCounter() {
    const iContainer = fillContainerWMinesCoor();
    const lenContainer = iContainer.length;
    let counter = 0;

    for (let i = 0; i < iContainer.length; i++) {
        let innerArray = iContainer[i];
        for (let j = 0; j < innerArray.length; j++) {

            if (iContainer[i][j] != bomb) {                      
                //up            
                if ( (i > 0) && (iContainer[i-1][j] == bomb) )
                    counter++;      
                //upLeft
                if ( (i > 0) && (j > 0) && (iContainer[i-1][j-1] == bomb) )
                    counter++;     
                //left
                if ( (j > 0 ) && (iContainer[i][j-1] == bomb))
                    counter++;   
                //upRight 
                if ( (i > 0) && ( (j + 1 ) <= lenContainer) && (iContainer[i-1][j+1] == bomb) )
                    counter++;
                //right
                if ( ( (j+1) <= lenContainer) && (iContainer[i][j+1] == bomb) ) 
                    counter++;   
                //down
                if ( ( (i+1) < lenContainer) && (iContainer[i+1][j] == bomb) ) 
                    counter++;
                //downLeft
                if ( ((i+1) < lenContainer) && (j > 0) && (iContainer[i+1][j-1] == bomb))
                    counter++;   
                //downRight
                if ( ((i+1) < lenContainer) && ( (j+1) <= lenContainer) &&  (iContainer[i+1][j+1] == bomb))
                    counter++;
            }
            
            if (counter != 0 ) 
                iContainer[i][j] = counter;
            
            counter = 0;
        }   
    }

    return iContainer;
}

//check if the mines are clicked and actuate
function checkClickedMine(event){
    const currentTarget = event.target;
    const allInputs = document.getElementsByTagName("td");
    const filledContainer = fillContainerWNMinesNCounter();

    console.log(currentTarget.textContent);

    //in case of clicking a mine
    if (!flag) {
        if (currentTarget.textContent == bomb) {
            for (let i = 0; i < allInputs.length; i++) {
    
                if (allInputs[i].textContent == bomb) {
                    blockInputs(allInputs[i]);
                    allInputs[i].className = ' show_cell_value';
                }
            }
            printFinalMsg(msgOfLoosing, flag);
            currentTarget.className = ' clicked_mine ';

            //in case of clicking an empty cell    
        } else if (currentTarget.textContent.match('[\d:\d]')) {
            currentTarget.className = 'empty_cell ';
            currentTarget.textContent = '';
        } 
        currentTarget.className += ' show_cell_value ';
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
    let filledContainer = fillContainerWNMinesNCounter();
    let table = document.createElement("table");

    for (let i = 0; i < filledContainer.length; i++) {
        let rowTable = document.createElement("tr");
        for (let j = 0; j < filledContainer[i].length; j++) {
            let cell = document.createElement("td");
            cell.textContent = filledContainer[i][j];
            cell.className = "hide_cell_value";
            cell.addEventListener("click", checkClickedMine.bind(this), false);

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

restartBtn.onclick =(e)=>{
    printCounter();
    resetAllVariables();

    //clearInterval(initTheInterval);        
    //initTheInterval();
    window.location.reload();
    hideStartBtn();
};

//invoking the game
startTheGame();