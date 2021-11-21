//--------Classes, Variables, and Selectors------------------------

class UserProfile {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.data = [];
    }
}

let userArray = [];
let currentUser = {};



const loginForm = document.querySelector('#loginButton');
const signUpForm = document.querySelector('#signUpButton');



//--------Event listeners------------------------

signUpForm.addEventListener('click', (e) => {
    e.preventDefault(); 
        console.log("sign up event"); 
        const newUser = createNewUser();
        if(newUser && userArray.push(newUser)){
            localStorage.setItem('userArray', JSON.stringify(userArray));
            const userInput = document.querySelector('#sign-up-user');
            const userIndex = indexOfUserCheck(userInput.value);
            setCurrentUser(userIndex);
            window.location.href = './habiTracker.html';
        } 
    } 
);

loginForm.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("log in event"); 
    loginUser();
});

//--------On Load------------------------

if(localStorage.userArray){
    userArray = JSON.parse(localStorage.userArray);
}

//--------Functions------------------------

function createNewUser(){
    const userInput = document.querySelector('#sign-up-user');
    const passInput = document.querySelector('#sign-up-pass');

    if(userExistenceCheck(userInput.value)){
        const label = document.querySelector('#sign-up-label');
        const oldP = document.querySelector('.warning');
        oldP && oldP.remove();
        const newP = document.createElement('p');
        newP.classList.add('warning');
        newP.innerText = `The username \"${userInput.value}\" already exists!`;
        label.style.margin = '40px';
        label.insertAdjacentElement('afterend', newP);
        userInput.value = "";
        passInput.value = "";
        return false;
    } else {
        const newUser = new UserProfile(userInput.value, passInput.value);
        return newUser;
    }
}

function userExistenceCheck(userName){
    for(let user of userArray){
        if(user.username != null){
            console.log(`compare:${user.username} to ${userName}`);
            if(user.username === userName){
                console.log('username already exists!');
                return true;
            }
        }
    }
    console.log('username does not exist!');
    return false;
}

function loginUser(){
    const userInput = document.querySelector('#login-user');
    const passInput = document.querySelector('#login-pass');
    const userIndex = indexOfUserCheck(userInput.value);

    if(!userExistenceCheck(userInput.value)){
        const label = document.querySelector('#login-label');
        const oldP = document.querySelector('.warning');
        oldP && oldP.remove();
        const newP = document.createElement('p');
        newP.classList.add('warning');
        newP.innerText = `The username \"${userInput.value}\" does not exists!`;
        label.style.marginBottom = '10px';
        label.insertAdjacentElement('afterend', newP);
    } else if (passCheck(userIndex, passInput.value)){
        setCurrentUser(userIndex);
        window.location.href = './habiTracker.html';
    } else {
        const label = document.querySelector('#login-label');
        const oldP = document.querySelector('.warning');
        oldP && oldP.remove();
        const newP = document.createElement('p');
        newP.classList.add('warning');
        newP.innerText = `username or password is incorrect.`;
        label.insertAdjacentElement('afterend', newP);
    }
}

function indexOfUserCheck(userInput){
    userCount = 0;
    for(let user of userArray){
        console.log(`${user.username} vs ${userInput}`)
        if(user.username === userInput){
            console.log(`username exists at index ${userCount}`);
            return userCount;
        }
        userCount++;
    }
}

function passCheck(index, passInput){
    console.log(`compare: ${userArray[index].password} to ${passInput}`);
        if(userArray[index].password === passInput){
            console.log('password matches');
            return true;
        }
        console.log('password does not match');
    return false;
}

function setCurrentUser(index){
    currentUser = userArray[index];
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('currentUserIndex', JSON.stringify(index));
}
