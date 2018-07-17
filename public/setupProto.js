var body = document.getElementById('body');
let tablesList = document.getElementById('tablesList')
var numRows = 15;
var tables = [];
var greenBoxes = {}
var blackBoxes = {}


function createList() {
    for(let i=0; i<tables.length; i++) {
        let tableBut = document.createElement('div');
        tableBut.innerText = "Table No. :" + i;
        tablesList.appendChild(tableBut);
    }
}


function getCoord(id){
    let arr = id.split(',');
    return arr;
}

function determineTables () {
    let selectedBoxes = document.querySelectorAll(".selectedBox");
    tables = [];
    console.log('selectedBoxes')
    console.log(selectedBoxes)
    console.log('selectedBoxesLength: ' + selectedBoxes.length)

    let shit = selectedBoxes.length

    for(let i=0; i<shit; i++) {
        console.log('yay')
        let boxCoord = getCoord(selectedBoxes[i].id);
        console.log(boxCoord);

        //CHECK IF THE BOX IS BESIDE ANY OF THE OTHER SELECTED BOXES
        let check = false;
        let numTables = tables.length;
        for(let a=0; a<numTables; a++) {
            let numBoxesInTable = tables[a].length;
            for(let b=0; b<numBoxesInTable; b++) {
                let checkingBoxCoord = getCoord(tables[a][b].id);

                if(boxCoord[0] == checkingBoxCoord[0] && 
                    (boxCoord[1]-checkingBoxCoord[1] == 1 || 
                    checkingBoxCoord[1]-boxCoord[1] == 1)) { //if the boxes are in the same row && beside each other

                    tables[a].push(selectedBoxes[i]);
                    selectedBoxes[i].innerText = a;
                    check = true;
                } else if (boxCoord[1] == checkingBoxCoord[1] &&
                            (boxCoord[0] - checkingBoxCoord[0] == 1 || 
                            checkingBoxCoord[0] - boxCoord[0] == 1)) {//if the boxes are in the same column
                    tables[a].push(selectedBoxes[i]);
                    selectedBoxes[i].innerText = a;
                    check = true;
                }
            }
        }

        //IF BOX IS NOT, ADD IT AS A NEW TABLE TO THE ARRAY
        if (check == false) {
            tables.push([selectedBoxes[i]])
            selectedBoxes[i].innerText = tables.length - 1;
        }
    }

    console.log(tables);
    createList();
}






// ====================================================================
//                 Selecting and Adding Walls
// ====================================================================

function addWallMode() {
    let smallBoxes = document.querySelectorAll('.smallBox')

    for(let i=0; i<smallBoxes.length; i++) {
        smallBoxes[i].removeEventListener('click', selectTable);
        smallBoxes[i].removeEventListener('mouseenter', highlightTable);
        smallBoxes[i].removeEventListener('mouseleave', unHighlightTable);

        smallBoxes[i].addEventListener('click', selectWall);
        smallBoxes[i].addEventListener('mouseenter', highlightWall);
        smallBoxes[i].addEventListener('mouseleave', unHighlightWall);
    }
}


function unSelectWall(event) {
    blackBoxes[event.target.id] = false;
    event.target.classList.remove('selectedWall');
    event.target.removeEventListener('click', unSelectWall)
    event.target.addEventListener('click', selectWall);
}

function selectWall(event) {
    blackBoxes[event.target.id] = true;
    event.target.classList.add('selectedWall');
    event.target.removeEventListener('click', selectWall);
    event.target.addEventListener('click', unSelectWall)
}

function highlightWall(event) {
    event.target.classList.add('highlightedWall');
}

function unHighlightWall(event) {
    event.target.classList.remove('highlightedWall');
}







// ====================================================================
//                 Selecting and Adding Boxes 
// ====================================================================

function addTableMode(){
    let smallBoxes = document.querySelectorAll('.smallBox')

    for(let i=0; i<smallBoxes.length; i++) {
        smallBoxes[i].removeEventListener('click', selectWall);
        smallBoxes[i].removeEventListener('mouseenter', highlightWall);
        smallBoxes[i].removeEventListener('mouseleave', unHighlightWall);

        smallBoxes[i].addEventListener('click', selectTable);
        smallBoxes[i].addEventListener('mouseenter', highlightTable);
        smallBoxes[i].addEventListener('mouseleave', unHighlightTable);
    }
}

function unSelectTable(event) {
    greenBoxes[event.target.id] = false;
    event.target.classList.remove('selectedBox');
    event.target.removeEventListener('click', unSelectTable)
    event.target.addEventListener('click', selectTable);
}

function selectTable(event) {
    greenBoxes[event.target.id] = true;
    console.log(event.target);
    let classes = event.target.classList;
    console.log(classes);
    console.log(classes.length);
    let check = true;
    for(let i=0; i<classes.length; i++) {
        console.log(classes[i]);
        debugger;
        if (classes[i] == 'selectedWall') {
            debugger;
            check = false;
        }

        if (i == classes.length - 1) {
            if(check == true) {
                event.target.classList.add('selectedBox');
                event.target.removeEventListener('click', selectTable);
                event.target.addEventListener('click', unSelectTable)
            }   
        }
    }
}

function highlightTable(event) {
    let classes = event.target.classList;
    console.log(classes);
    console.log(classes.length);
    let check = true;
    for(let i=0; i<classes.length; i++) {
        console.log(classes[i]);
        // debugger;
        if (classes[i] == 'selectedWall') {
            // debugger;
            check = false;
        }

        if (i == classes.length - 1) {
            if(check == true) {
                event.target.classList.add('highlightedBox');
            }   
        }
    }

    console.log(event.target);
}

function unHighlightTable(event) {
    event.target.classList.remove('highlightedBox');
    console.log(event.target);
}


// ====================================================================
//                      Setting up the Boxes
// ====================================================================
function setup () {
    let bigBox = document.createElement('div');
    bigBox.id = 'bigBox';

    for(let a=0; a<numRows; a++) {
        for(let i=0; i<numRows; i++) {
            let smallBox = document.createElement('div');
            smallBox.classList.add('smallBox');
            smallBox.style.width = (500-(numRows*2))/numRows;
            smallBox.style.height = (500-(numRows*2))/numRows;
            smallBox.id = a.toString() + ',' + i.toString();

            bigBox.appendChild(smallBox);
        }
    }
    

    body.appendChild(bigBox)
    
    //Create Add Table Button
    let addTable = document.createElement('button');
    addTable.innerText = 'Add Tables';
    addTable.addEventListener('click', addTableMode);

    //Create Remove Button Button
    let addWall = document.createElement('button');
    addWall.innerText = 'Add Walls';
    addWall.addEventListener('click', addWallMode);

    //Create Save Button
    let determineTablesButton = document.createElement('button');
    determineTablesButton.innerText = 'Determine Tables';
    determineTablesButton.addEventListener('click', determineTables);

    body.appendChild(addTable)
    body.appendChild(addWall)
    body.appendChild(determineTablesButton)


    let list = document.createElement('div');
    list.id = 'list';
    body.appendChild(list)
}

window.onload = setup;