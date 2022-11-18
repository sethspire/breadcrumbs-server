const protocol = window.location.protocol
const host = window.location.host
const dbURL = (host.split(":",1)[0] === "localhost") ? "http://localhost:3001" : "https://thebreadcrumbs-api.herokuapp.com"


//send email button
const sendButton = document.querySelector("#requestLink")
const emailInput = document.getElementById('email_address')

sendButton.addEventListener("click", async(e) => {
    e.preventDefault()

    const email = emailInput.value;
    let data = {email}

    const url = dbURL + '/user/pwReset/sendEmail'

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options)

    if (response.status === 400) {
        data = await response.json()
        message.textContent = data.message
    } 
    else if (response.status === 201) {
        alert("link to reset password will work for next 15 minutes")
        const newUrl = `${protocol}//${host}`
        window.location.replace(newUrl)
    }
})
