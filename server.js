const express = require('express')
const app = express()
const http = require('http').createServer(app)
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(http, { debug: true })

app.use('/peerjs', peerServer);

const port = process.env.PORT || 8000
const io = require('socket.io')(http)
const path = require('path')

const { v4: uuidV4 } = require('uuid')

const ejs = require('ejs')
app.set("view engine", ejs)

const users = []

app.use(express.static('zoom clone frontend'))

app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.get('/meeting',(req,res)=>{
    res.redirect(`/${uuidV4()}`)
})
app.get('/api', (req, res) => {
    res.send(users)
})

app.get('/:room', (req, res) => {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const roomId = req.params.room;
    console.log(roomId)
    res.render('meeting.ejs', { room: roomId, url })
})


io.on('connection', socket => {
    socket.on('room-joined', (name, room, id) => {
        const user = {
            socketId: socket.id,
            userId: id,
            name,
            room
        }
        users.push(user)
        socket.join(room);
        socket.to(room).broadcast.emit('user-joined', user)

        // message

        socket.on('message', data => {
            socket.to(data.ROOM_ID).broadcast.emit('new-message', data)
        })
        socket.on('disconnect', () => {
            socket.to(room).broadcast.emit('user-disconnected', user)
            socket.leave(room)
            let index = users.findIndex(user => user.id == socket.id)
            if (index != -1) {
                users.splice(index, index + 1)
            }
        })
    })


})






http.listen(port, () => {
    console.log("server is listening at port " + port)
})
