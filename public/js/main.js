const userName1 = document.getElementById('userName1');
const userName2 = document.getElementById('userName2');

const gameCode = document.getElementById('gameCode');
const createGame = document.getElementById('btnCreateGame');
const joinGame = document.getElementById('btnJoinGame');


createGame.addEventListener('click', e => {
    e.preventDefault();
    if (userName1.value != "") {
        const newGameCode = makeid(6);
        window.location.href = `/game.html?userName=${userName1.value}&&gameCode=${newGameCode}&&isHost=true`;
    }
});

joinGame.addEventListener('click', e => {
    e.preventDefault();
    if (userName2.value != "" && gameCode.value!="") {
        window.location.href = `/game.html?userName=${userName2.value}&&gameCode=${gameCode.value}&&isHost=false`;
    }
});

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}