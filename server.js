const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = socketio(server);

const formatMessage = require('./utils/messages');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./utils/users');

const botName = "Gamebot"

io.on("connection", socket => {

    socket.on("joinRoom", ({
        userName,
        gameCode
    }) => {

        const user = userJoin(socket.id, userName, gameCode);

        // join the game room
        socket.join(gameCode);

        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to Psych Game!'));

        // Broadcast when a user connects
        socket.broadcast
            .to(user.gameCode)
            .emit(
                'message',
                formatMessage(botName, `${user.userName} has joined the game`)
            );

        // Send users and room info
        io.to(user.gameCode).emit('roomUsers', {
            room: user.gameCode,
            users: getRoomUsers(user.gameCode)
        });
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.to(user.gameCode).emit('message', formatMessage(user.userName, msg));
    });


    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.gameCode).emit(
                'message',
                formatMessage(botName, `${user.userName} has left the game`)
            );

            // Send users and room info
            io.to(user.gameCode).emit('roomUsers', {
                room: user.gameCode,
                users: getRoomUsers(user.gameCode)
            });
        }
    });
});


const PORT = 3000 || process.env.PORT;


server.listen(PORT, () => {
    console.log(`server running @ ${PORT}`)
});