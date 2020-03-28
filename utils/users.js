const {
    users
} = require('../utils/dbHelper');

function userJoin(id, userName, gameCode, isHost) {
    const user = {
        id,
        userName,
        gameCode,
        isHost
    };

    users.insert(user);

    return user;
}

// Get current user
function getCurrentUser(id) {
    return users.findOne({
        id: id
    });
}

// User leaves chat
function userLeave(id) {
    const user = users.findOne({
        id: id
    });

    if (user) {
        users.remove(user);
        return user;
    }
}

// Get room users
function getRoomUsers(gameCode) {
    return users.find({
        gameCode: gameCode
    });
}


module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};