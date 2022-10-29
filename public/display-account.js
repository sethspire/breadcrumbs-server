const protocol = window.location.protocol
const host = window.location.host
const dbURL = (host.split(":",1)[0] === "localhost") ? "http://localhost:3001" : "https://thebreadcrumbs-api.herokuapp.com"

logoutBtn = document.getElementById("logoutBtn")

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
            contentArea.innerHTML = `Username: ${data.name} <br>Email: ${data.email}`
            
            //show logout button upon confirmed login
            document.getElementById("logoutBtn").style.display = "inline-block"
        }
    } else {
        console.log("HTTP-Error: " + response.status)
        alert("Please Sign In")
        const newUrl = `${protocol}//${host}/login.html`
        window.location.replace(newUrl)
    }
})

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