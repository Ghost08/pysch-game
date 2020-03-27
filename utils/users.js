const users = [];

function userJoin(id, userName, gameCode) {
    const user = {
        id,
        userName,
        gameCode
    };

    users.push(user);

    return user;
}

// Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get room users
function getRoomUsers(gameCode) {
    return users.filter(user => user.gameCode === gameCode);
}


module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};