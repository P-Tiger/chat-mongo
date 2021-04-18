
function GetToken() {
    let _Auth = JSON.parse(localStorage.getItem("_Auth"))
    let dataReturn = ""
    if (_Auth.token) {
        dataReturn = _Auth.token
    }
    return 'Bearer ' + dataReturn
}

export {
    GetToken
}