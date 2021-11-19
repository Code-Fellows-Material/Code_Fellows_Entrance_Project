const monthCell = document.querySelector('.month-cell');


for(let i = 0; i < 31; i++){
    const newDiv = document.createElement('div');
    newDiv.classList.add('cell');
    newDiv.classList.add('month-day-cell');
    newDiv.innerText = i+1;
    monthCell.appendChild(newDiv);
}