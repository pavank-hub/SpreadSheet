const row = 20;
const col = 10;

const gridContainer = document.getElementById('grid-container');
const cellInfo = document.getElementById('cell-info');
let selectedcell = null;
const formulaInput = document.getElementById('formula-input');

const sheetData = {};

const savedData = JSON.parse(localStorage.getItem("spreadsheetData")) || {};

// it also looks like ...

// let savedData =
//     JSON.parse(localStorage.getItem("spreadsheetData"));

// if(!savedData){
//     savedData = {};
// }

const saveBtn = document.getElementById('save-btn');


for( let i=0; i<=row; i++){

    for(let j=0; j<=col; j++){

        const cell = document.createElement('div');

        if(i === 0 && j === 0){
            cell.classList.add("top-left-corner");
        }
        else if(i === 0 && j > 0){
            cell.classList.add("column-header");
            cell.textContent = String.fromCharCode(64+j);

        }
        else if(i > 0 && j === 0){
            cell.classList.add("row-header");
            cell.textContent = i;
        }
        else{
            // text content columnLetter+rowNumber

            cell.classList.add("cell");
            const columnLetter = String.fromCharCode(64+j);
            const cellId = `${columnLetter}${i}`
            cell.dataset.cellId = cellId;
            
            // Restore values while creating cells.
            // cell mein b jyga and sheetData mein b.
            if(savedData[cellId]){
                cell.textContent = savedData[cellId];
                sheetData[cellId] = savedData[cellId];
            }

            cell.contentEditable = true;

            // Step 3 and 4: Detect and highlight which cell is selected
            cell.addEventListener('click',(e)=>{
                // console.log(e.target.dataset.cellId);

                cellInfo.textContent = `Selected Cell: ${e.target.dataset.cellId}`
                // selected colour changing style

                if(selectedcell){
                    selectedcell.classList.remove("selected-cell");
                }

                e.target.classList.add("selected-cell");

                selectedcell = e.target;

                formulaInput.value = e.target.textContent;

                // console.log(selectedcell);
            })

            // Step 5: Saves data when a cell is edited
            cell.addEventListener('input',(e)=>{
                const cellId = e.target.dataset.cellId;
                const val = e.target.textContent.trim();

                if(val) sheetData[cellId] = val;
                else delete sheetData[cellId];

                // console.log(sheetData);
            })
        }
        
        gridContainer.appendChild(cell);

    }
}

formulaInput.addEventListener("input",()=>{

    // direct formula bar m changes kiya , kisi cell ko click kre bina.
    if(!selectedcell) return ;

    // if selectedcell is not empty
    selectedcell.textContent = formulaInput.value;

    // which cell is selected
    const cellId = selectedcell.dataset.cellId;

    // if formula bar consists of any value
    if(formulaInput.value.trim()) sheetData[cellId] = formulaInput.value;
    else delete sheetData[cellId];

})


saveBtn.addEventListener("click",()=>{

    localStorage.setItem(
        "spreadsheetData",
        JSON.stringify(sheetData)
    );

    alert("Spreadsheet Saved!");

});

