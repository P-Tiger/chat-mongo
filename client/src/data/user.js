import Axios from 'axios'
async function userPost(dataPost) {
    let data = await Axios.post(process.env.REACT_APP_API_URL + "/users", dataPost)
    return data
}

export {
    userPost
}