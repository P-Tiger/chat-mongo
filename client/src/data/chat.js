import Axios from 'axios'
import {
    GetToken
} from '../configs'
async function chatList() {
    let data = await Axios.get(process.env.REACT_APP_API_URL + "/chats", {
        headers: { authorization: GetToken() }
    })
    return data
}

export {
    chatList
}