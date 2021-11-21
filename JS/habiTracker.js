
//--------Classes, Variables, and Selectors------------------------

class Habit {
    constructor(habitName) {
        this.habitName = habitName;
        this.habitData = [];
    }
}

let userArray = JSON.parse(localStorage.userArray);
let currentUserIndex = JSON.parse(localStorage.currentUserIndex);
let habitCount = 0;

const logoutButton = document.querySelector('#logout-button');
const clearButton = document.querySelector('#clear-button');
const form = document.querySelector('#habit-input-form');
const monthCell = document.querySelector('.month-cell');

//--------Event listeners------------------------

logoutButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    currentUserIndex = null;
    localStorage.setItem('currentUserIndex', JSON.stringify(currentUserIndex));
    window.location.href = './index.html';
});

clearButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    userArray[currentUserIndex].habitArray = [];
    localStorage.setItem('userArray', JSON.stringify(userArray)); 
    window.location.href = './habiTracker.html';
});

form.addEventListener('submit', (e) => {
    e.preventDefault(); // This will stop the form from navigating to the new page on submission.
    const input = document.querySelector('#habit-input');
    createNewHabit(input.value);
    createNewHabitLabel(input.value);
    createNewHabitGrid(habitCount);
    habitCount++;
    input.value = "";
})

//--------On Load------------------------

document.querySelector('#name-heading').innerText = userArray[currentUserIndex].username;

fillMonth(monthCell);

for(let habit of userArray[currentUserIndex].habitArray){
    createNewHabitLabel(userArray[currentUserIndex].habitArray[habitCount].habitName);
    createNewHabitGrid(habitCount);
    habitCount++;
}

//--------Functions------------------------

function fillMonth(targetCell){
    for(let i = 0; i < 31; i++){
    const newDiv = document.createElement('div');
    newDiv.classList.add('cell');
    newDiv.classList.add('month-day-cell');
    newDiv.innerText = i+1;
    targetCell.appendChild(newDiv);
    }
}

function createNewHabit(habit){
    const newHabit = new Habit(habit);
    userArray[currentUserIndex].habitArray.push(newHabit);
    localStorage.setItem('userArray', JSON.stringify(userArray));
    console.log("userArray[currentUserIndex].habitArray in createNewHabit funct: ", userArray[currentUserIndex].habitArray);
}

function createNewHabitGrid(habitIndex){
    const habitCell = document.querySelector('.tracking-cell');
    const newDiv = document.createElement('div');
    newDiv.classList.add('month-cell');
    habitCell.appendChild(newDiv);
    fillGrid(newDiv, habitIndex);
}

function fillGrid(targetCell, habitIndex){
    for(let i = 0; i < 31; i++){
        const newDiv = document.createElement('div');
        userArray[currentUserIndex].habitArray[habitIndex].habitData[i] ? 
            newDiv.classList.add('selected-month-day-cell'): 
            newDiv.classList.add('month-day-cell');
        newDiv.addEventListener('click', () => {
            userArray[currentUserIndex].habitArray[habitIndex].habitData[i] = !userArray[currentUserIndex].habitArray[habitIndex].habitData[i];
            userArray[currentUserIndex].habitArray[habitIndex].habitData[i] ? 
                newDiv.classList.replace('month-day-cell', 'selected-month-day-cell') : 
                newDiv.classList.replace('selected-month-day-cell', 'month-day-cell');       
            localStorage.setItem('userArray', JSON.stringify(userArray));
        })
    targetCell.appendChild(newDiv);
    }
}

function createNewHabitLabel(habit){
    const habitCell = document.querySelector('.habit-cell');
    const newDiv = document.createElement('div');
    newDiv.classList.add('cell');
    newDiv.innerText = habit;
    habitCell.appendChild(newDiv);
}