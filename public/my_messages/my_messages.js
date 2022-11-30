const protocol = window.location.protocol
const host = window.location.host
//const dbURL = "https://thebreadcrumbs-api.herokuapp.com"
const dbURL = (host.split(":",1)[0] === "localhost") ? "http://localhost:3001" : "https://thebreadcrumbs-api.herokuapp.com"

const messageText = document.querySelector('.message-text')

const contact1Name = document.querySelector('.contact1')
const contact2Name = document.querySelector('.contact2')
const contact3Name = document.querySelector('.contact3')

const contact1Email = document.querySelector('.contact1-email')
const contact2Email = document.querySelector('.contact2-email')
const contact3Email = document.querySelector('.contact3-email')

const messageDate = document.querySelector('.date1')

window.addEventListener('load', async(e) => {
    e.preventDefault()
            
    const token = localStorage.getItem('token')
    url =  dbURL + "/users/me"

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let response = await fetch (url, options)
    
    //retrieves information about message if user is logged
    if(response.ok) {
        if (response.status === 200) {
            url = dbURL + "/messages"

            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            //fetches the messages 
            let response = await fetch (url, options)

            if(response.ok) {
                if (response.status === 200) {
                    const data = await response.json()

                    //displays message1 in page
                    msg1 = data[0]
                    messageText.textContent = msg1.messageText
                    contact1Name.textContent = msg1.contacts[0].name
                    contact1Email.textContent = msg1.contacts[0].email
                    if (msg1.contacts.length >= 2) {
                        contact2Name.textContent = msg1.contacts[1].name
                        contact2Email.textContent = msg1.contacts[1].email
                    }
                    if (msg1.contacts.length >= 3) {
                        contact3Name.textContent = msg1.contacts[2].name
                        contact3Email.textContent = msg1.contacts[2].email
                    }
                    messageDate.textContent = msg1.sendDatetime
                }
            } 
            else {
                //redirects user to craft a message if no messages where found
                console.log("HTTP-Error: " + response.status)
                alert("No messages found")
            }
        }
    }
    else {
        console.log("HTTP-Error: " + response.status)
        alert("Please Sign In")
        const newUrl = `${protocol}//${host}/login.html`
        window.location.replace(newUrl)
    }
})
