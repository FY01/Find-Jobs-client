
/**
 * validate username
 * @param username
 * @returns {boolean}
 */
export const validateUsername = (username) => {
    if (!username || username.length > 12 || !/^[a-zA-Z0-9_]+$/.test(username)){
        return false
    }else {
        return true
    }
}
/**
 * validate password
 * @param password
 * @returns {boolean}
 */
export const validatePassword = (password) => {
    if (!password || password.length < 4 || password.length > 12 || !/^[a-zA-Z0-9_]+$/.test(password)){
        return false
    }else {
        return true
    }
}