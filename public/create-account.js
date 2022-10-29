const protocol = window.location.protocol
const host = window.location.host
const dbURL = (host.split(":",1)[0] === "localhost") ? "http://localhost:3001" : "https://thebreadcrumbs-api.herokuapp.com"

const createAccountForm = document.querySelector('#createAccountForm')
const emailInput = document.querySelector('#email')
const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const passwordRetypeInput = document.querySelector('#password-retype')
const message = document.querySelector("#message")

createAccountForm.addEventListener('submit', async(e) => {
    e.preventDefault()

    const email = emailInput.value;
    const name = usernameInput.value;
    const password = passwordInput.value;
    const passwordRetype = passwordRetypeInput.value;
    let data = { email, password, passwordRetype, name }

    const url = dbURL + '/users'

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options)
    data = await response.json()

    if (response.status === 400) {
        message.textContent = data.message
    } 
    else if (response.status === 201) {
        localStorage.setItem("token", data.token)
        alert("New Account Created")

        const newUrl = `${protocol}//${host}`
        window.location.replace(newUrl)
    }
})