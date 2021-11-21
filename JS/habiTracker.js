
////--------Classes, Variables, and Selectors------------------------

class Habit {
    constructor(habit) {
        this.habit = habit;
        this.habitData = [];
    }
}

let habitArray = [];

let userArray = JSON.parse(localStorage.userArray);

let currentUser = JSON.parse(localStorage.currentUser);

let currentUserIndex = JSON.parse(localStorage.currentUserIndex);


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
    userArray[currentUserIndex].data = [];
    localStorage.setItem('userArray', JSON.stringify(userArray)); 
    window.location.href = './habiTracker.html';
});



form.addEventListener('submit', (e) => {
    e.preventDefault(); // This will stop the form from navigating to the new page on submission.
    const input = document.querySelector('#habit-input');
    createNewHabit(input.value);
    createNewHabitLabel(input.value);
    createNewHabitGrid();
    input.value = "";
})


//--------On Load------------------------

document.querySelector('#name-heading').innerText = userArray[currentUserIndex].username;
habitArray = currentUser.data;
fillMonth(monthCell);

let count = 0;
for(let habit of userArray[currentUserIndex].data){
    createNewHabitLabel(userArray[currentUserIndex].data[count].habit);
    createNewHabitGrid();
    count++;
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

function createNewHabit(habit){
    const newHabit = new Habit(habit);
    userArray[currentUserIndex].data.push(newHabit);
    localStorage.setItem('userArray', JSON.stringify(userArray));
    console.log(habitArray);
}

function createNewHabitGrid(){
    const habitCell = document.querySelector('.tracking-cell');
    const newDiv = document.createElement('div');
    newDiv.classList.add('month-cell');
    habitCell.appendChild(newDiv);
    fillGrid(newDiv);
}

function createNewHabitLabel(habit){
    const habitCell = document.querySelector('.habit-cell');
    const newDiv = document.createElement('div');
    newDiv.classList.add('cell');
    newDiv.innerText = habit;
    habitCell.appendChild(newDiv);
}