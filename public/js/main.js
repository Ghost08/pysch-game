const user = document.getElementById("userName");

// Get username and room from URL
const {
    userName
} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

user.innerText = userName;

window.localStorage.setItem("userName",userName);