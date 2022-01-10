let cols = 8, rows = 8, totalMines = 10; 

//random number between 0 - 19
function rndNumber(){
    return Math.floor(Math.random() * cols)
}

// Creating the multidimensional array
function initContainer() {
    let mContainer = new Array(cols);

        for (let index = 0; index < mContainer.length; index++) {
            mContainer[index] = new Array(rows);            
        }

    return mContainer
}

// Filling out the multidimensional array with
//  1- coordineates
//  2- mines
function fillContainerWMinesCoor(){    
    const iContainer = initContainer();
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

    //return fillContainerWNMines()

    return iContainer;
}

//Filling with number of mines
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

//Printing the filled container on the html
function printFilledContainer() {
    const filledContainer = fillContainerWNMines();
    const container = document.getElementById("container");
    const table = document.createElement("table");

    table.setAttribute('border', 1);
    table.setAttribute('cellspacing', 0)

    for (let i = 0; i < filledContainer.length; i++) {
        let rowTable = document.createElement("tr");
        for (let j = 0; j < filledContainer[i].length; j++) {
            let cell = document.createElement("td");
            cell.setAttribute('padding', 15)
            cell.append(filledContainer[i][j]); 
            rowTable.appendChild(cell);
        }
        table.appendChild(rowTable);
    }

    container.appendChild(table);
}

printFilledContainer();