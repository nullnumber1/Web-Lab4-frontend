const restApiServerUrl = "https://lab4web.herokuapp.com";
const registerUrl =  restApiServerUrl + "/api/v1/auth/register";
const loginUrl = restApiServerUrl + "/api/v1/auth/login";



export function register(user, onOK, onErr) {
    credentialsRequest(registerUrl, user, onOK, onErr);
}

export function login(user, onOK, onErr) {
    credentialsRequest(loginUrl, user, onOK, onErr);
}

function credentialsRequest(url, user, onOK, onErr) {
    fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(onOK)
        .catch(onErr);
}