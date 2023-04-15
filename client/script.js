const pointsUser0 = document.getElementById("user-points-0")
const pointsUser1 = document.getElementById("user-points-1")
const form = document.getElementById("form")
const resetButton = document.getElementById("reset-button")

if(getCookie('password') == null) {
    document.cookie = 'password' + '=' + prompt("Passwort eingeben:")
}

function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    if(match) {
        return match[2];
    }
}
function setPoints(points) {
    pointsUser0.innerText = points[0]
    localStorage.setItem('points0', points[0])
    pointsUser1.innerText = points[1]
    localStorage.setItem('points1', points[1])
}
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    fetch("/api/user_points", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user: data.user, points: data.points, password: getCookie('password')})
    })
    fetch("/api/user_points").then((res) => {
        res.json().then((data) => {
            setPoints(data.points)
        })
    })
})
resetButton.addEventListener("click", (e) => {
    e.preventDefault()
    document.cookie = 'password='
    document.cookie = 'password' + '=' + prompt("Passwort eingeben:")
})

fetch("/api/user_points").then((res) => {
    res.json().then((data) => {
        setPoints(data.points)
    })
})

function showError() {

}
