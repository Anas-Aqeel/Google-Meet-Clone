var link = document.getElementById('link')
var anchor = document.getElementById('anchor')
var time = document.getElementById('time')
var day = document.getElementById('day')

function redirectUser() {
    anchor.setAttribute("href",link.value)
}
setInterval(() => {
    timer()
}, 60000);

function timer() {
    time.innerHTML=moment().format('h:mm a')
    day.innerHTML=moment().format('ddd') + " " +  moment().format('ll');
}

timer()