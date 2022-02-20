/*
 * @Descripttion: 
 * @version: 
 * @@Company: 
 * @Author: FY01
 * @Date: 2022-02-20 13:45:24
 * @LastEditors: 
 * @LastEditTime: 2022-02-20 14:22:23
 */
import io from 'socket.io-client'

const socket = io('ws://localhost:4000')

socket.on('receiveMsg', (data) => {
    console.log('浏览器接收到的消息', data)
})
socket.emit('sendMsg', { name: 'sun' })