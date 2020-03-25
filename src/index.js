const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const GAMES_URL = `${BASE_URL}/games`
const SCORES_URL = `${BASE_URL}/scores`

const loginButton = document.getElementById("login")
const currentUserDiv = document.getElementById("current-user")


document.addEventListener("DOMContentLoaded", () => {
    console.log("dom loaded")
})

loginButton.addEventListener("submit", (e) => {
    e.preventDefault();
    let userNameInput = e.target.name.value;
    findOrCreateUser(userNameInput);
    e.target.reset();
})

function findOrCreateUser(userNameInput) {
    fetch(USERS_URL, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          Accepts: 'application/json'
        },
        body: JSON.stringify({name: userNameInput})
      })
        .then(resp => resp.json())
        .then(user => displayName(user))
}

function displayName(user) {
    currentUserDiv.innerHTML = `<p id="display-user">Welcome, ${user.name}</p>`
}
// fetch(USERS_URL)
//     .then(resp => resp.json())
//     .then(users => {
//         users.forEach(user => {
//             const body = document.getElementById("user-list")
//             const userHTML = `<h1>${user.name}</h1>`
//             body.innerHTML += userHTML
//         });
        
//     })

// function fetchGame() {
//     fetch(GAMES_URL)
//     .then(resp => resp.json())
//     .then(games => {
//         games.forEach(game => {
//             console.log(game.main_image)
//         });
        
//     })
   
// }