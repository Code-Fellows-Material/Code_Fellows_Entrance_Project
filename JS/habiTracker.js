let habitArray = [];
let userArray = JSON.parse(localStorage.userArray);
console.log(userArray);

let currentUser = JSON.parse(localStorage.currentUser);
console.log(currentUser);

let currentUserIndex = JSON.parse(localStorage.currentUserIndex);
console.log(currentUserIndex);

console.log(userArray[currentUserIndex]);


habitArray = currentUser.data;
console.log(habitArray);

let count = 0;
for(let habit of userArray[currentUserIndex].data){
    createNewHabitLabel(userArray[currentUserIndex].data[count].habit);
    createNewHabitGrid();
    count++;
}

console.log(habitArray);
console.log(localStorage);



document.querySelector('#name-heading').innerText = userArray[currentUserIndex].username;

class Habit {
    constructor(habit) {
        this.habit = habit;
        this.habitData = [];
    }
}


const logoutButton = document.querySelector('#logout-button');
logoutButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    currentUserIndex = null;
    localStorage.setItem('currentUserIndex', JSON.stringify(currentUserIndex));
    window.location.href = './index.html';
});

const clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', (e) => {
    e.preventDefault(); 
    userArray[currentUserIndex].data = [];
    localStorage.setItem('userArray', JSON.stringify(userArray)); 
    window.location.href = './habiTracker.html';
});




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
    createNewHabitLabel(input.value);
    createNewHabitGrid();
    input.value = "";
})

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