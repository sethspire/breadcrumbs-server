window.protocol = window.location.protocol
window.host = window.location.host
window.dbURL = (host.split(":",1)[0] === "localhost") ? "http://localhost:3001" : "https://thebreadcrumbs-api.herokuapp.com"

const messageDisplayArea = document.querySelector("#messageDisplayArea")
const saveMessageUpdateBtn = document.querySelector("#saveMessageUpdateButton")

let displayedMessages = []
let selectedMessage = null

// display active messages
async function displayMessages(e) {
    const token = localStorage.getItem("token")

    let url = `${dbURL}/messages`

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
            displayedMessages = []
            for (msgNum in data) {
                if (data[msgNum].completed === false) {
                    displayedMessages.push(data[msgNum])
                }
            }
            if (displayedMessages.length) {
                console.log(messageDisplayArea)
                messageCards = messageDisplayArea.children
                for (card of messageCards) {
                    console.log(card)
                    await card.remove()
                }
                messageDisplayArea.innerHTML = ''
                for (let i = 0; i < displayedMessages.length; i++) {
                    // format date and time
                    datetime = new Date(displayedMessages[i].sendDatetime)
                    timeString = (datetime.getMonth()+1) + "/" + datetime.getDate() + "/" + datetime.getFullYear() + " " + datetime.getHours()%12 + ":" + datetime.getMinutes()
                    if (datetime.getHours() >= 12) {
                        timeString += " PM"
                    } else {
                        timeString += " AM"
                    }

                    // format contacts
                    allContacts = ""
                    for (contactNum in displayedMessages[i].contacts) {
                        contact = displayedMessages[i].contacts[contactNum]
                        allContacts += contact.name + " (" + contact.email + "), "
                    }

                    messageDisplayArea.innerHTML += 
                        `<div class="card message-card" data-_id="${displayedMessages[i]._id}">
                            <div class="card-header">
                                <h5 class="card-title" style="display: inline-block">Message ${i}.</h5>
                                <div style="float: right">
                                    <button type="button" class="btn btn-success message-mod-btn edit-message-btn" data-bs-toggle="modal" data-bs-target="#modifyMessageModal">&#9998;&#xFE0E;</button>
                                    <button type="button" class="btn btn-danger message-mod-btn disable-message-btn"> &#128465;&#xFE0E; </button>
                                </div>
                            </div>
                            <div class="card-body">
                                <p class="card-text"><strong>Text: </strong>${displayedMessages[i].messageText}</p>
                                <p class="card-text"><strong>Send Datetime: </strong>${timeString}</p>
                                <p class="card-text" style="margin: 0"><strong>Geographical Location: </strong></p>
                                <div style="margin: 0 0 0.5em 2em">
                                    <p class="card-text" style="margin: 0"><strong>City: </strong>${displayedMessages[i].geoLocation.city}</p>
                                    <p class="card-text" style="margin: 0"><strong>State: </strong>${displayedMessages[i].geoLocation.state}</p>
                                    <p class="card-text" style="margin: 0"><strong>Street: </strong>${displayedMessages[i].geoLocation.street}</p>
                                </div>
                                <p class="card-text"><strong>Contacts: </strong>${allContacts}</p>
                            </div>
                        </div>
                        <br>`
                }

                const modMessageBtns = messageDisplayArea.getElementsByClassName("edit-message-btn")
                for(i = 0; i < modMessageBtns.length; i++) {
                    modMessageBtns[i].addEventListener("click", showModMessageModal)
                }
                const disMessageBtns = messageDisplayArea.getElementsByClassName("disable-message-btn")
                for(i = 0; i < modMessageBtns.length; i++) {
                    disMessageBtns[i].addEventListener("click", disableMessages)
                }
            } else {
                messageDisplayArea.replaceChildren()
                messageDisplayArea.innerHTML = "<p>no current messages</p>"
            }
        }
    } else {
        console.log("HTTP-Error: " + response.status)
        if (response.status === 401) {
            const newUrl = `${protocol}//${host}/login`
            window.location.replace(newUrl)
        }
    }
}

// disable message
async function disableMessages(e) {
    const token = localStorage.getItem("token")

    const url = `${dbURL}/messages/disable`
    
    const messageCard = e.target.parentNode.parentNode.parentNode
    const _id = messageCard.dataset._id
    let sendData = {_id}

    const options = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData)
    }
    
    let response = await fetch(url, options)

    if (response.ok) {
        if (response.status === 200) {
            messageCard.remove()
            alert("did delete task")
        }
    } else {
        console.log("HTTP-Error: " + response.status)
        if (response.status === 401) {
            const newUrl = `${protocol}//${host}/login`
            window.location.replace(newUrl)
        }
    }
}

// display modify task modal
async function showModMessageModal(e) {
    const messageCard = e.target.parentNode.parentNode.parentNode
    const _id = messageCard.dataset._id
    selectedMessage = displayedMessages.find(item => item._id === _id)

    document.getElementById("contactName-1").value = selectedMessage.contacts[0].name
    if (selectedMessage.contacts.length >= 2) {
        document.getElementById("contactName-2").value = selectedMessage.contacts[1].name
    }
    if (selectedMessage.contacts.length >= 3) {
        document.getElementById("contactName-3").value = selectedMessage.contacts[2].name
    }

    document.getElementById("email-1").value = selectedMessage.contacts[0].email
    if (selectedMessage.contacts.length >= 2) {
        document.getElementById("email-2").value = selectedMessage.contacts[1].email
    }
    if (selectedMessage.contacts.length >= 3) {
        document.getElementById("email-3").value = selectedMessage.contacts[2].email
    }

    document.getElementById("messageInput").value = selectedMessage.messageText
    document.getElementById("city").value = selectedMessage.geoLocation.city
    document.getElementById("state").value = selectedMessage.geoLocation.state
    document.getElementById("street").value = selectedMessage.geoLocation.street

    datetime = new Date(selectedMessage.sendDatetime)
    timeString = datetime.getHours() + ":" + datetime.getMinutes()
    document.getElementById("time").value = timeString
}

// modify task
saveMessageUpdateBtn.addEventListener("click", async(e) => {
    const token = localStorage.getItem("token")

    const url = `${dbURL}/messages`
    
    // possibly updated values
    const contactName1 = document.getElementById('contactName-1').value
    const contactName2 = document.getElementById('contactName-2').value
    const contactName3 = document.getElementById('contactName-3').value
    const emailInput1 = document.getElementById('email-1').value
    const emailInput2 = document.getElementById('email-2').value
    const emailInput3 = document.getElementById('email-3').value
    let contacts = []
    if (emailInput1 && contactName1){
        contacts.push({name: contactName1, email: emailInput1})
    }
    if (emailInput2 && contactName2){
        contacts.push({name: contactName2, email: emailInput2})
    }
    if (emailInput3 && contactName3){
        contacts.push({name: contactName3, email: emailInput3})
    }
    let messageText = document.getElementById('messageInput').value
    const cityInput = document.getElementById('city').value
    const stateInput = document.getElementById('state').value
    const streetInput = document.getElementById('street').value
    let geoLocation = {
        city: cityInput,
        state: stateInput,
        street: streetInput
    }
    const time = document.getElementById('time').value
    const [hour, min] = time.split(":")
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    let sendDatetime = new Date(yyyy, mm, dd, hour, min)

    // previous values
    const _id = selectedMessage._id
    let old_contacts = selectedMessage.contacts
    const old_messageText = selectedMessage.messageText
    const old_geoLocation = selectedMessage.geoLocation
    let old_sendDatetime = selectedMessage.sendDatetime
    old_sendDatetime = new Date(old_sendDatetime)
    
    // check if values have been updated
    contacts = (compareContactArrays(contacts, old_contacts)) ? null : contacts
    messageText = (messageText === old_messageText) ? null : messageText
    geoLocation = (compareGeoJSON(geoLocation, old_geoLocation)) ? null : geoLocation
    sendDatetime = (sendDatetime === old_sendDatetime) ? null : sendDatetime

    // only include updated values
    const sendData = {_id, ...contacts && {contacts}, ...messageText && {messageText}, ...geoLocation && {geoLocation}, ...sendDatetime && {sendDatetime}}
    console.log(sendData)
    if (Object.keys(sendData).length > 1) {
        document.getElementById("saveModalErrorInfo").textContent=" "
        
        const options = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sendData)
        }
        
        let response = await fetch(url, options)

        if (response.ok) {
            if (response.status === 200) {
                const modal = document.querySelector("#modifyMessageModal")
                bootstrap.Modal.getInstance(modal).hide()
                displayMessages()
            }
        } else {
            console.log("HTTP-Error: " + response.status)
            if (response.status === 401) {
                const newUrl = `${protocol}//${host}/login`
                window.location.replace(newUrl)
            }
        }
        
    } else {
        document.getElementById("saveModalErrorInfo").textContent="no info has been changed"
    }
})

function compareContactArrays(newArr, oldArr) {
    if (newArr === oldArr) return true;
    if (newArr == null || oldArr == null) return false;
    if (newArr.length !== oldArr.length) return false;

    for (var i = 0; i < newArr.length; ++i) {
        if (newArr[i].name !== oldArr[i].name || newArr[i].email !== oldArr[i].email) return false;
    }
    return true;
}

function compareGeoJSON(newGeo, oldGeo) {
    if (newGeo.state !== oldGeo.state || newGeo.city !== oldGeo.city || newGeo.street !== oldGeo.street) {
        return false
    }
    return true
}

window.addEventListener('load', async(e) => {
    displayMessages()
})