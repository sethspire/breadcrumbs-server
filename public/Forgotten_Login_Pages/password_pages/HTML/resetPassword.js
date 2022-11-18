const protocol = window.location.protocol
const host = window.location.host
const dbURL = (host.split(":",1)[0] === "localhost") ? "http://localhost:3001" : "https://thebreadcrumbs-api.herokuapp.com"

const resetPasswordForm = document.querySelector("#resetUsernameForm") 
const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#new_password")
const confirmPasswordInput = document.querySelector("#confirm_new_password")
const sendButton = document.querySelector("#sendButton") 

sendButton.addEventListener("click", async(e) => {

    // form data
    const email = emailInput.value
    const password = passwordInput.value
    const confirmPw = confirmPasswordInput.value

    // get reset token
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const pwResetToken = urlParams.get('pwResetToken')

    const data = { email, password, confirmPw, pwResetToken}

    const url = dbURL + '/user/pwReset/reset'

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options) 
    
    //if email not found
    if (response.status === 400) {
        const data = await response.json()
        alert(data.message)
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
