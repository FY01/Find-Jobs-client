/*
 * @Descripttion: 
 * @version: 
 * @@Company: 
 * @Author: FY01
 * @Date: 2022-02-20 13:45:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-04 14:34:40
 */
import io from 'socket.io-client'

// 服务器端
const socket = io('ws://120.77.232.204:80')

socket.on('receiveMsg', (data) => {
    console.log('浏览器接收到的消息', data)
})
socket.emit('sendMsg', { name: 'sun' })