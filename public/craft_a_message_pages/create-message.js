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

const emailInput1 = document.getElementById('email-1')
const emailInput2 = document.getElementById('email-2')
const emailInput3 = document.getElementById('email-3')

const message = document.getElementById('messageInput')

const cityInput = document.getElementById('city')
const stateInput = document.getElementById('state')
const streetInput = document.getElementById('street')

const timeInput = document.getElementById('time')

const dbMessageDiv = document.getElementById('dbMessage')

//prompts the user to login if token is not found
window.addEventListener('load', async(e) => {
    e.preventDefault()

    console.log(timeInput)

    //obtains the user's token for being logged in 
    const token = localStorage.getItem("token")
  
    const url = dbURL + '/users/me'

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let response = await fetch (url, options)
    if (response.ok) {
        if (response.status === 200) {
            
            //obtains user's input 
            createMessageForm.addEventListener('submit', async(e) => {
                e.preventDefault()
            
                //obtains the user's token for being logged in 
                const token = localStorage.getItem("token")
            
                //stores the information of the contacts into array
                const contacts = []
            
                //stores the full name of the contacts (first + last)
                const contact1FullName = `${contactFirstName1.value} ${contactLastName1.value}`
                const contact2FullName = `${contactFirstName2.value} ${contactLastName2.value}`
                const contact3FullName = `${contactFirstName3.value} ${contactLastName3.value}`
            
                //stores the phone numbers of the contacts
                const email1 = emailInput1.value
                const email2 = emailInput2.value
                const email3 = emailInput3.value
            
                //stores the contacts that were actually created
                if (email1 && contactFirstName1.value && contactLastName1.value){
                    contacts.push({name: contact1FullName, email: email1})
                }
                if (email2 && contactFirstName2.value && contactLastName2.value){
                    contacts.push({name: contact2FullName, email: email2})
                }
                if (email3 && contactFirstName3.value && contactLastName3.value){
                    contacts.push({name: contact3FullName, email: email3})
                }
            
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
                const [hour, min] = time.split(":")
                const today = new Date()
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                const yyyy = today.getFullYear();
                //const datetime = yyyy + "-" + mm + "-" + dd + "T" + time
                const sendDatetime = new Date(yyyy, mm, dd, hour, min)
                let data = {messageText, sendDatetime, contacts, geoLocation}
            
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
        }
    }
    else {
        console.log("HTTP-Error: " + response.status)
        alert("Please Sign In")
        const newUrl = `${protocol}//${host}/login.html`
        window.location.replace(newUrl)
    }
})
