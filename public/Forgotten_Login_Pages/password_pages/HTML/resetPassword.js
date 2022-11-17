const protocol = window.location.protocol
const host = window.location.host
const dbURL = (host.split(":",1)[0] === "localhost") ? "http://localhost:3001" : "https://thebreadcrumbs-api.herokuapp.com"

const resetPasswordForm = document.querySelector("#resetUsernameForm") 
const emailInput = document.querySelector("#email")
const password = document.querySelector("#new_password")
const confirmPassword = document.querySelector("#confirm_new_username")
const sendButton = document.querySelector("#sendButton") 

sendButton.addEventListener("click", async(e) => {

    const email = emailInput.value
    const password = password.value
    const confirmNew = confirmPassword.value
    const data = { email, password }

    if (password != confirmNew){
        const message = document.querySelector("#message")
        message.textContent = "usernames do not match. check again."
        return
    }

    const token = localStorage.getItem("token")
    const url = dbURL + '/users/me'

    const options = {
        method: 'PATCH',
        headers: {
            Authorizatrion: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options) 
    
    //if email not found
    if (response.status === 400) {
        const message = document.querySelector("#message")
        message.textContent = "Invalid email."
    } 
    //found account with email
    else if (response.status === 200) {
        const data = await response.json()
        
        //localStorage.setItem("token", data.token)
        alert("updates implemented")

        const newUrl = `${protocol}//${host}`
        window.location.replace(newUrl)
    }

})
