const protocol = window.location.protocol
const host = window.location.host
const dbURL = (host.split(":",1)[0] === "localhost") ? "http://localhost:3001" : "https://thebreadcrumbs-api.herokuapp.com"

logoutBtn = document.getElementById("logoutBtn")
editBtn = document.getElementById("editBtn")
saveBtn1 = document.getElementById("saveBtn1")
saveBtn2 = document.getElementById("saveBtn2")
saveBtn3 = document.getElementById("saveBtn3")
cancelBtn = document.getElementById("cancelBtn")

//load the user's information
window.addEventListener('load', async(e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    const url = dbURL + "/users/me"

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await fetch(url, options)

    if (response.ok) {
        if (response.status === 200) {
            const data = await response.json()

            const contentArea = document.querySelector("#accountDisplayArea")
            contentArea.innerHTML = `Username: ${data.name} <br>Email: ${data.email} <br>Password: ${data.password}`
            
            //show logout button upon confirmed login
            document.getElementById("logoutBtn").style.display = "inline-block"
        }
    } /*else {
        console.log("HTTP-Error: " + response.status)
        alert("Please Sign In")
        const newUrl = `${protocol}//${host}/login.html`
        window.location.replace(newUrl)
    }*/
})

//logout of account
logoutBtn.addEventListener("click", async(e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    const url = `${dbURL}/users/logout`

    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    let response = await fetch(url, options)

    if (response.ok) {
        if (response.status === 200) {
            const newUrl = `${protocol}//${host}`
            window.location.replace(newUrl)
        }
    } else {
        console.log("HTTP-Error: " + response.status)
        if (response.status === 401) {
            const newUrl = `${protocol}//${host}/login`
            window.location.replace(newUrl)
        }
    }
})

//edit Button
editBtn.addEventListener("click", async(e) => {
    let editDiv =document.getElementById('editDiv')
    editDiv.style.display = "block"
})

//cancel Button
cancelBtn.addEventListener("click", async(e) => {
    let editDiv =document.getElementById('editDiv')
    editDiv.style.display = "none"
})

//save Button for username
saveBtn1.addEventListener("click", async(e) => {
    e.preventDefault()
    //data
    const username = usernameInput.value
    const data = { username }

    //close edit box
    let editDiv =document.getElementById('editDiv')
    editDiv.style.display = "none"
    
    //edit user's data first
    const token = localStorage.getItem("token")

    const url = `${dbURL}/users/me`

    const options = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options)

    if (response.ok) {
        if (response.status === 200) {
            const data = await response.json()
             alert("updates implemented")

            const newUrl = `${protocol}//${host}`
            window.location.replace(newUrl)
        }
    } else {
        console.log("HTTP-Error: " + response.status)
        if (response.status === 401) {
            const newUrl = `${protocol}//${host}/login`
            window.location.replace(newUrl)
        }
    } 
})

//save Button for email
saveBtn2.addEventListener("click", async(e) => {
    e.preventDefault()
    //data
    const email = emailInput.value
    const data = { email }

    //close edit box
    let editDiv =document.getElementById('editDiv')
    editDiv.style.display = "none"
    
    //edit user's data first
    const token = localStorage.getItem("token")

    const url = `${dbURL}/users/me`

    const options = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options)

    if (response.ok) {
        if (response.status === 200) {
            const data = await response.json()
             alert("updates implemented")

            const newUrl = `${protocol}//${host}`
            window.location.replace(newUrl)
        }
    } else {
        console.log("HTTP-Error: " + response.status)
        if (response.status === 401) {
            const newUrl = `${protocol}//${host}/login`
            window.location.replace(newUrl)
        }
    } 
})

//save Button for password
saveBtn3.addEventListener("click", async(e) => {
    e.preventDefault()
    //data
    const password = passwordInput.value
    const data = { password }

    //close edit box
    let editDiv =document.getElementById('editDiv')
    editDiv.style.display = "none"
    
    //edit user's data first
    const token = localStorage.getItem("token")

    const url = `${dbURL}/users/me`

    const options = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options)

    if (response.ok) {
        if (response.status === 200) {
            const data = await response.json()
             alert("updates implemented")

            const newUrl = `${protocol}//${host}`
            window.location.replace(newUrl)
        }
    } else {
        console.log("HTTP-Error: " + response.status)
        if (response.status === 401) {
            const newUrl = `${protocol}//${host}/login`
            window.location.replace(newUrl)
        }
    } 
})
