import io from 'socket.io-client'

const socket = io('ws://localhost:4000')

socket.on('receiveMsg',(data) => {
    console.log('浏览器接收到的消息',data)
})
socket.emit('sendMsg',{name:'sun'})