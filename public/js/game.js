const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const startGame = document.getElementById('startGame');

startGame.style.display = 'none';

const {
    userName,
    gameCode,
    isHost
} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

//get Username
const user = document.getElementById("userName");
user.innerText = userName;

// Initiate Socket operations

const socket = io();

// join gameroom
socket.emit('joinRoom', {
    userName,
    gameCode,
    isHost
});

// Get room and users
socket.on('roomUsers', ({
    room,
    users
}) => {
    outputRoomName(room);
    outputUsers(users);

    // show play game button

    if (users && users.length > 1) {
        console.log(isHost);

        if(isHost === true){
            startGame.style.display = '';
        }        
    }

});

// Message from server
socket.on('message', message => {
    outputMessage(message);
    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});


// Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg);

    const chatTab = document.getElementById('chat-tab');
    chatTab.click();


    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Game features




// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.userName} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
      ${users.map(user => `<li>${user.userName}</li>`).join('')}
    `;
}