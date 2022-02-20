/*
 * @Descripttion: 
 * @version: 
 * @@Company: 
 * @Author: FY01
 * @Date: 2022-02-20 13:45:24
 * @LastEditors: 
 * @LastEditTime: 2022-02-20 14:22:29
 */


export default function getRedirectTo(type, header) {
    let path = ''
    if (type === 'assassin') {
        path += 'assassin'
    } else {
        path += 'leader'
    }
    if (!header) {
        path += 'Info'
    }
    return path
}