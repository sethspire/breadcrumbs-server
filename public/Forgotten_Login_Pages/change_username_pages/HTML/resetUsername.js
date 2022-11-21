const protocol = window.location.protocol
const host = window.location.host
const dbURL = (host.split(":",1)[0] === "localhost") ? "http://localhost:3001" : "https://thebreadcrumbs-api.herokuapp.com"

const resetUsernameForm = document.querySelector("#resetUsernameForm")
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password") 
const newUsernameInput = document.querySelector("#new_username")
const confirmNewUsernameInput = document.querySelector("#confirm_new_username")
const sendButton = document.querySelector("#sendButton")

sendButton.addEventListener("click", async(e) => {

    const email = emailInput.value
    const password = passwordInput.value
    const name = newUsernameInput.value
    const confirmNew = confirmNewUsernameInput.value
    const data = { email, name }
    const loginData = {email, password}
    //login first to be able to change stuff
    const url2 = dbURL + "/users/login"

    const options2 = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    }

    let response2 = await fetch(url2, options2)

    if (response2.status === 400) {
        const message = document.querySelector("#message")
        message.textContent = "Invalid email or password."
    } 
    else if (response2.status === 200) {
        const data = await response2.json()
        
        localStorage.setItem("token", data.token)
        alert("login correct")

        /*const newUrl = `${protocol}//${host}`
        window.location.replace(newUrl)*/
    }
    

    if (name != confirmNew){
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
