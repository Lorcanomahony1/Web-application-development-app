
const crypto = require('crypto');

//create an array to store user data
const users = [];

function createUser(username, password){
    users.push({ username, password });
    console.log(users);
}

function authenticateUser(username, password){
    //find the user by username in the array
    const user = users.find(user => user.username === username);

    if(!user || user.password !== password){
        return false;
    }
    return true;
}

module.exports = { createUser, authenticateUser };






/*
const crypto = require('crypto');

// create an array to store user data
const users = [];

function createUser(username, password) {
    // hash the password using SHA256 algorithm
    const hash = crypto.createHash('sha256').update(password).digest('hex');

    // store the user data (username and password hash)
    users.push({ username, password: hash });

    console.log(users);
}

function authenticateUser(username, password) {
    // find the user by username
    const user = users.find(user => user.username === username);

    // if user not found, or password is incorrect, return false
    if (!user || user.password !== crypto.createHash('sha256').update(password).digest('hex')) {
        return false;
    }

    // if user is found and password is correct, return true
    return true;
}

module.exports = { createUser, authenticateUser };

*/