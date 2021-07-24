/**
 * @Description: req modules
 * @author:
 * @date 2021/7/23
*/
import ajax from "./ajax";

//register
// export const reqRegister = (user) => ajax('/register',user,'POST')
export const reqRegister = (user) => ajax('/register', user, 'POST')

//login
export const reqLogin = ({username,password}) => ajax('/login',{username,password},'POST')

//update user
export const reqUpdateUser = (user) => ajax('/update',user,'POST')

//get user
export const reqGetUser = () => ajax('/getUser')