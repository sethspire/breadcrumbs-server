const protocol = window.location.protocol
const host = window.location.host
const dbURL = (host.split(":",1)[0] === "localhost") ? "http://localhost:3001" : "https://thebreadcrumbs-api.herokuapp.com"

//gets elements from the form 
const createMessageForm = document.querySelector('#createMessageForm')

const contactFirstName1 = document.getElementById('contactFirstName-1')
const contactFirstName2 = document.getElementById('contactFirstName-2')
const contactFirstName3 = document.getElementById('contactFirstName-3')

const contactLastName1 = document.getElementById('contactLastName-1')
const contactLastName2 = document.getElementById('contactLastName-2')
const contactLastName3 = document.getElementById('contactLastName-3')

const phone1 = document.getElementById('phone-1')
const phone2 = document.getElementById('phone-2')
const phone3 = document.getElementById('phone-3')

const message = document.getElementById('messageInput')

const cityInput = document.getElementById('city')
const stateInput = document.getElementById('state')
const streetInput = document.getElementById('street')

const timeInput = document.getElementById('time')

const dbMessageDiv = document.getElementById('dbMessage')

createMessageForm.addEventListener('submit', async(e) => {
    e.preventDefault()

    //obtains the user's token for being logged in 
    const token = localStorage.getItem("token")

    //stores the full name of the contacts (first + last)
    const contact1FullName = `${contactFirstName1.value} ${contactLastName1.value}`
    const contact2FullName = `${contactFirstName2.value} ${contactLastName2.value}`
    const contact3FullName = `${contactFirstName3.value} ${contactLastName3.value}`

    //stores the phone numbers of the contacts
    const phoneNumber1 = phone1.value
    const phoneNumber2 = phone2.value
    const phoneNumber3 = phone3.value

    //stores the information of the contacts into array
    const contacts = [
        {name: contact1FullName, phoneNumber: phoneNumber1},
        {name: contact2FullName, phoneNumber: phoneNumber2},
        {name: contact3FullName, phoneNumber: phoneNumber3}
    ]

    //stores the message crafted by user
    const messageText = message.value

    //stores the geolocation of the user 
    const state = stateInput.value
    const city = cityInput.value
    const street = streetInput.value
    const geoLocation = {
        state: state, 
        city: city, 
        street: street
    }

    //stores the time indicating when to send the text
    const time = timeInput.value
    
    let data = {messageText, time, contacts, geoLocation}

    const url = dbURL + '/messages'

    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options)
    data = await response.json()

    if (response.status === 400) {
        dbMessageDiv.textContent = data.message
    } 
    else if (response.status === 201) {
        // localStorage.setItem("token", data.token)
        alert("Message was created successfully!")

        const newUrl = `${protocol}//${host}`
        window.location.replace(newUrl)
    }
})

