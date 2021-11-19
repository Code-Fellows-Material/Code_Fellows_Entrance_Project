

const monthCell = document.querySelector('.month-cell');
fillMonth(monthCell);

function fillMonth(targetCell){
    for(let i = 0; i < 31; i++){
    const newDiv = document.createElement('div');
    newDiv.classList.add('cell');
    newDiv.classList.add('month-day-cell');
    newDiv.innerText = i+1;
    targetCell.appendChild(newDiv);
    }
}

function fillGrid(targetCell){
    for(let i = 0; i < 31; i++){
    const newDiv = document.createElement('div');
    newDiv.classList.add('cell');
    newDiv.classList.add('month-day-cell');
    newDiv.addEventListener('click', () => {
        newDiv.style.backgroundColor = 'black';
    })
    targetCell.appendChild(newDiv);
    }
}


// Event listener for habit input form
const form = document.querySelector('#habit-input-form');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // This will stop the form from navigating to the new page on submission.
    const input = document.querySelector('#habit-input');
    createNewHabit(input.value);
    createNewHabitGrid();
    input.value = "";
})

function createNewHabit(habit){
    console.log(habit);
    const habitCell = document.querySelector('.habit-cell');
    const newDiv = document.createElement('div');
    newDiv.classList.add('cell');
    newDiv.innerText = habit;
    habitCell.appendChild(newDiv);
}

function createNewHabitGrid(){
    const habitCell = document.querySelector('.tracking-cell');
    const newDiv = document.createElement('div');
    newDiv.classList.add('month-cell');
    habitCell.appendChild(newDiv);
    fillGrid(newDiv);
}