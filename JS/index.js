//Variables and Classes

let userArray = [];
if(localStorage.userArray){
    userArray = JSON.parse(localStorage.userArray);
}
console.log(`Current number of registered users: ${userArray.length}`);

class userProfile {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.data = {};
    }
}

  // Event listener for habit input form
const form = document.querySelector('#signup-form');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // This will stop the form from navigating to the new page on submission.
    userArray.push(createNewUser());
    localStorage.setItem('userArray', JSON.stringify(userArray));
    // console.log(userArray);
})

function createNewUser(){
    const userInput = document.querySelector('#sign-up-user');
    const passInput = document.querySelector('#sign-up-pass');
    userCheck(userInput.value);
    const newUser = new userProfile(userInput.value, passInput.value);
    userInput.value = "";
    passInput.value = "";
    return newUser;
}

function userCheck(userInput){
    for(let user of userArray){
        console.log(`${user.username} vs ${userInput}`)
        if(user.username === userInput){
            console.log('same username already exists!');
            return false;
        }
        console.log('we good');
    }
    return true;
}
