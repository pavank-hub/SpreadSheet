const row = 20;
const col = 10;

const gridContainer = document.getElementById('grid-container');
const cellInfo = document.getElementById('cell-info');
let selectedcell = null;

const sheetData = {};


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

            cell.contentEditable = true;

            // Step 3 and 4: Detect and highlight which cell is selected
            cell.addEventListener('click',(e)=>{
                // console.log(e.target.dataset.cellId);

                cellInfo.textContent = `Selected Cell: ${e.target.dataset.cellId}`
                // selected colour changing style

                if(selectedcell){
                    selectedcell.style.backgroundColor = "white";
                }

                e.target.style.backgroundColor = "lightblue";

                selectedcell = e.target;

                console.log(selectedcell);
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


