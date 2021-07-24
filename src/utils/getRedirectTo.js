
/**
 * find what path to go :assassin/assassinInfo/leader/leaderInfo
 * @param type
 * @param header
 * @returns {string}
 */
export default function getRedirectTo(type,header){
    let path = ''
    if (type === 'assassin'){
        path += 'assassin'
    }else {
        path += 'leader'
    }
    if (!header){
        path += 'Info'
    }
    return path
}