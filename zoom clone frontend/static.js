var myAlert = document.getElementById("alert")
var right = document.getElementById("right")
var left = document.getElementById("left")
var input = document.getElementById("input")
var chatBox = document.getElementById("chatBox")
var ChatTab = document.getElementById('Chat')
var UsersTab = document.getElementById('Users')
var Userstab = document.getElementById('Users-tab')
var Chattab = document.getElementById('Chat-tab')
var alertBtn = document.getElementById('sweetAlert')

// ========= for showing chatbot ========

function showChat(id) {
  
  if (id == "Chat") {
    UsersTab.classList.add('hide')
    ChatTab.classList.remove('hide')
    ChatTab.classList.add('show','active')
    Userstab.classList.remove("active")
    Chattab.classList.add("active")
  }
  else{
    ChatTab.classList.add('hide')
    UsersTab.classList.remove('hide')
    UsersTab.classList.add('show','active')
    Userstab.classList.add("active")
    Chattab.classList.remove("active")
  }
  
  if (left.classList.contains('left__grow')) {
    
    left.classList.replace('left__grow', 'left__shrink')
    right.classList.replace('right__shrink', 'right__grow')
    
  }
}
function closeChat() {
  left.classList.replace('left__shrink', 'left__grow')
  right.classList.replace('right__grow', 'right__shrink')
}

function sideBar() {
  var classItem = document.getElementsByClassName('show').classList.remove('show','active')
}

// ======== for copying link =========

const linkCopy = () => {
  var link = document.getElementById("link")
  link.select()
  document.execCommand("copy");
  myAlert.classList.replace('hide', 'show')
  setTimeout(() => {
    myAlert.classList.replace('show', 'hide')
  }, 800);
}



// ========= name alert box ===========



const myVideo = document.createElement('video')
let myVideoStream;

navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
  addVideoStream(myVideo, stream)
  myVideoStream = stream

  // ==== listening for a new user that joins the meeting =======

  socket.on('user-joined', (userdata) => {
    const { userId } = userdata
    connectToNewUser(userId, stream)
    getUserData(userdata,"joined.")
    console.log(userdata.name)
    users.push(userdata.name)
    console.log(users)
    appendUser()
  })
})






//==== setting mute button ====== 

const setMuteButton = () => {
  const html = `
      <i class="fas fa-microphone"></i>
      <span>Mute</span>
    `
  document.querySelector('.main__mute_button').innerHTML = html;
}

//==== setting unmute button ====== 

const setUnmuteButton = () => {
  const html = `
      <i class="unmute fas fa-microphone-slash"></i>
      <span>Unmute</span>
    `
  document.querySelector('.main__mute_button').innerHTML = html;
}

//==== setting stop video button ====== 

const setStopVideo = () => {
  const html = `
      <i class="fas fa-video"></i>
      <span>Stop Video</span>
    `
  document.querySelector('.main__video_button').innerHTML = html;
}

//==== setting start video button ====== 

const setPlayVideo = () => {
  const html = `
    <i class="stop fas fa-video-slash"></i>
      <span>Play Video</span>
    `
  document.querySelector('.main__video_button').innerHTML = html;
}  

function showAlert() {
  alertBtn.click()
}