import Axios from 'axios'
async function auth(dataPost) {
    let data = await Axios.post(process.env.REACT_APP_API_URL + "/login", dataPost)
    return data
}


export {
    auth
}