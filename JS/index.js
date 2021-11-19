//Variables and Classes

let userArray = [];
let currentUser = {};
if(localStorage.userArray){
    userArray = JSON.parse(localStorage.userArray);
}
console.log(`Current number of registered users: ${userArray.length}`);
console.log(userArray);

class userProfile {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.data = {};
    }
}

  // Event listener for habit input form
const signUpForm = document.querySelector('#signUpButton');

signUpForm.addEventListener('click', (e) => {
    e.preventDefault(); 
    console.log("sign up event"); 
    const newUser = createNewUser();
    newUser && userArray.push(newUser);
    localStorage.setItem('userArray', JSON.stringify(userArray));
    
});

const loginForm = document.querySelector('#loginButton');

loginForm.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("log in event"); 
    loginUser();
});

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
        label.insertAdjacentElement('afterend', newP);
        userInput.value = "";
        passInput.value = "";
        return false;
    } else {
        const newUser = new userProfile(userInput.value, passInput.value);
        userInput.value = "";
        passInput.value = "";
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
    if(!userExistenceCheck(userInput.value)){
        const label = document.querySelector('#login-label');
        const oldP = document.querySelector('.warning');
        oldP && oldP.remove();
        const newP = document.createElement('p');
        newP.classList.add('warning');
        newP.innerText = `The username \"${userInput.value}\" does not exists!`;
        label.insertAdjacentElement('afterend', newP);
        console.log('herein');
    } else if (passCheck(indexOfUserCheck(userInput.value), passInput.value)){
        console.log(indexOfUserCheck(userInput.value));
        console.log('checks out');
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
