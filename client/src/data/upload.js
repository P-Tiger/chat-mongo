import Axios from 'axios'
import {
    GetToken
} from '../configs/'
async function uploadPost(dataPost) {
    let data = await Axios.post(process.env.REACT_APP_API_URL + "/uploads", dataPost, {
        headers: {
            'content-type': 'multipart/form-data',
            authorization: GetToken()
        }
    })
    return data
}

export {
    uploadPost
}