const protocol = window.location.protocol
const host = window.location.host
//const dbURL = "https://thebreadcrumbs-api.herokuapp.com"
const dbURL = (host.split(":",1)[0] === "localhost") ? "http://localhost:3001" : "https://thebreadcrumbs-api.herokuapp.com"

const cur_messageText = document.querySelector('#cur-msg-text')
const cur_contacts = document.querySelector('#cur-msg-contacts')
const cur_messageDate = document.querySelector('#cur-msg-sendDatetime')
const cur_geo_state =  document.querySelector("#cur-msg-state")
const cur_geo_city =  document.querySelector("#cur-msg-city")
const cur_geo_street =  document.querySelector("#cur-msg-street")

const old_messageText = document.querySelector('#old-msg-text')
const old_contacts = document.querySelector('#old-msg-contacts')
const old_messageDate = document.querySelector('#old-msg-sendDatetime')
const old_geo_state =  document.querySelector("#old-msg-state")
const old_geo_city =  document.querySelector("#old-msg-city")
const old_geo_street =  document.querySelector("#old-msg-street")

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
                    num_msgs = data.length

                    for (let i = num_msgs-1; i>=0; i--) {
                        if (data[i].completed === false) {
                            displayCurMessage(data[i])
                            i = -1
                        }
                    }

                    for (let i = num_msgs-1; i>=0; i--) {
                        if (data[i].completed === true) {
                            displayOldMessage(data[i])
                            i = -1
                        }
                    }
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


function displayCurMessage(msg) {
    cur_messageText.innerHTML += msg.messageText
    cur_messageDate.innerHTML += msg.sendDatetime
    contacts = ""
    for (contact of msg.contacts) {
        contacts += contact.name + "(" + contact.email + "),"
    }
    cur_contacts.innerHTML += contacts
    cur_geo_city.innerHTML += msg.geoLocation.city
    cur_geo_state.innerHTML += msg.geoLocation.state
    cur_geo_street.innerHTML += msg.geoLocation.street
}

function displayOldMessage(msg) {
    old_messageText.innerHTML += msg.messageText
    old_messageDate.innerHTML += msg.sendDatetime
    contacts = ""
    for (contact of msg.contacts) {
        contacts += contact.name + "(" + contact.email + "),"
    }
    old_contacts.innerHTML += contacts
    old_geo_city.innerHTML += msg.geoLocation.city
    old_geo_state.innerHTML += msg.geoLocation.state
    old_geo_street.innerHTML += msg.geoLocation.street
}