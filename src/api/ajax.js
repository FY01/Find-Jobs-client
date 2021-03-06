/*
 * @Descripttion: 
 * @version: 
 * @@Company: 
 * @Author: FY01
 * @Date: 2022-03-01 22:17:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-02 20:22:24
 */


import axios from 'axios'
// 服务器地址
// const baseUrl = 'http://120.77.232.204:80'
const baseUrl = ''
/**
 *
 * @param url
 * @param data
 * @param method
 * @returns {Promise<AxiosResponse<any>>}
 */
export default function ajax(url = '', data = {}, method = 'GET') {
    url = baseUrl + url
    if (method === 'GET') {
        //{username:'assassin',password:'123'} => 'username=assassin&password=123'
        let queryString = ''
        if (data) {
            Object.keys(data).forEach(key => {
                queryString += key + '=' + data[key] + '&'
            })
        }
        if (queryString) {
            queryString = queryString.substring(0, queryString.length - 1)
        }
        //https://www.google.com/search?q=github&rlz=1C5CHFA_enTW960SG962
        return axios.get(url + '?' + queryString)
    } else {
        return axios.post(url, data)
    }
}




