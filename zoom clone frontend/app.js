let username;
const socket = io();
var videoGrid = document.getElementById("video")
var input = document.getElementById("input")
let ul = document.getElementById('users')
var chatBox = document.getElementById("chatBox")
var chatpar = document.getElementById("chatpar")
var sweetBtn = document.getElementsByClassName('confirm')
do {
  username=prompt("Enter Your Name")
} while (!username);

let timer ;
const myPeer = new Peer(undefined, {
  host: '/', 
  port: 443,
  path:"/peerjs"
})

const peers = {}
const users = []












// ==== joining message ====== 

  myPeer.on('open', id => {
          users.push(username)
          socket.emit("room-joined", username, ROOM_ID, id)
          appendUser()
          console.log(users)
  
  })

  


// ==== get new user data ========

function getUserData(userdata,joined) {
  const { name } = userdata
  let data = {
    class: "left",
    message: `${name} ${joined}`,
    username: "Admin",
    date: moment().format("MMM D YYYY")
  }
  appendMessage(data)
}

// ========= get message ==========

const getMessage = () => {

if (input.value != '') {
  
  let data = {
    date: moment().format("MMM D YYYY"),
    message: input.value,
    username,
    class: "right",
    ROOM_ID
  }

  appendMessage(data)

  // ====== send message to the server =======

  socket.emit('message', data)

  // ==== clearing the textarea ======
  input.value = ''
}

}

// ====== send message ===========

input.addEventListener("keyup", (keyup) => {
  if (keyup.keyCode === 13) {
    getMessage()
  }
})

// ==== listening for a new message =======

socket.on('new-message', (data) => {
  data.class = "left",
    appendMessage(data)
})


// ========= append Message =========

const appendMessage = (data) => {

  chatBox.insertAdjacentHTML(`beforeend`, `<div class="chat ${data.class}">
  <span>${data.username}</span>${data.message} <small>${data.date}</small></div>`)
  scrollToBottom()
}


//  ======== calling to a client =======

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })

  call.on('close', () => {
    console.log('hello')
    video.remove()
  })

  peers[userId] = call
}

// === answering the call ====
myPeer.on('call', call => {
  navigator.mediaDevices.getUserMedia({  audio: { autoGainControl: false, channelCount: 2, echoCancellation: false, latency: 0, noiseSuppression: false, sampleRate: 48000, sampleSize: 16, volume: 1.0 } , 
                      video: {
                        mandatory: {
                               maxWidth: 640,
                               maxHeight: 360,
                               // maxAspectRatio:4/3,
                               // maxFrameRate:1
                              },
                        quality: 7,
                        width: { ideal: 320 },
                        height: { ideal: 240 }
                      }
                    }).then((stream) => {
    call.answer(stream)
    let video = document.createElement('video')
    call.on('stream', videoStream => {
      addVideoStream(video, videoStream)
    })
  })
})

function appendUser() {
  ul.innerHTML=''
  timer = 0
  users.map((user)=>{
      
      const firstChat = user.split('')
      ul.insertAdjacentHTML('beforeend',` <li class="data-item"><span>${firstChat[0].toUpperCase()}</span>
      ${timer == 0 ? user + ' ' + ' ( you ) '   :  user}
      
      </li>`)
      timer++
  })
}

// ====== removing a user =======

socket.on('user-disconnected', data => {
  if (peers[data.userId]) peers[data.userId].close()
  getUserData(data,"left.")
})

// ==== append video ====

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  video.classList.add('item')
  videoGrid.appendChild(video)
}


const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
}

const playStop = () => {
  let enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideo()
  } else {
    setStopVideo()
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
}

function scrollToBottom() {
  chatpar.scrollTop = chatpar.scrollHeight
}
