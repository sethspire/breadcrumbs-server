const protocol = window.location.protocol
const host = window.location.host
const dbURL = "https://thebreadcrumbs-api.herokuapp.com"

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

//prompts the user to login if token is not found
window.addEventListener('load', async(e) => {
    e.preventDefault()

    //retrieves user's token 
    const token = localStorage.getItem('token')
    const url = dbURL + '/messages'

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
                const phoneNumber1 = phone1.value
                const phoneNumber2 = phone2.value
                const phoneNumber3 = phone3.value
            
                //stores the contacts that were actually created
                if (phoneNumber1 && contactFirstName1.value && contactLastName1.value){
                    contacts.push({name: contact1FullName, phoneNumber: phoneNumber1})
                }
                if (phoneNumber2 && contactFirstName2.value && contactLastName2.value){
                    contacts.push({name: contact2FullName, phoneNumber: phoneNumber2})
                }
                if (phoneNumber3 && contactFirstName3.value && contactLastName3.value){
                    contacts.push({name: contact3FullName, phoneNumber: phoneNumber3})
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
                const today = new Date()
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                const yyyy = today.getFullYear();
                const sendDatetime = yyyy + "-" + mm + "-" + dd + "T" + time
                
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



// createMessageForm.addEventListener('submit', async(e) => {
//     e.preventDefault()

//     //obtains the user's token for being logged in 
//     const token = localStorage.getItem("token")

//     //stores the information of the contacts into array
//     const contacts = []

//     //stores the full name of the contacts (first + last)
//     const contact1FullName = `${contactFirstName1.value} ${contactLastName1.value}`
//     const contact2FullName = `${contactFirstName2.value} ${contactLastName2.value}`
//     const contact3FullName = `${contactFirstName3.value} ${contactLastName3.value}`

//     //stores the phone numbers of the contacts
//     const phoneNumber1 = phone1.value
//     const phoneNumber2 = phone2.value
//     const phoneNumber3 = phone3.value

//     //stores the contacts that were actually created
//     if (phoneNumber1 && contactFirstName1.value && contactLastName1.value){
//         contacts.push({name: contact1FullName, phoneNumber: phoneNumber1})
//     }
//     if (phoneNumber2 && contactFirstName2.value && contactLastName2.value){
//         contacts.push({name: contact2FullName, phoneNumber: phoneNumber2})
//     }
//     if (phoneNumber3 && contactFirstName3.value && contactLastName3.value){
//         contacts.push({name: contact3FullName, phoneNumber: phoneNumber3})
//     }

//     //stores the message crafted by user
//     const messageText = message.value

//     //stores the geolocation of the user 
//     const state = stateInput.value
//     const city = cityInput.value
//     const street = streetInput.value
//     const geoLocation = {
//         state: state, 
//         city: city, 
//         street: street
//     }

//     //stores the time indicating when to send the text
//     const time = timeInput.value
//     const today = new Date()
//     const dd = String(today.getDate()).padStart(2, '0');
//     const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     const yyyy = today.getFullYear();
//     const sendDatetime = yyyy + "-" + mm + "-" + dd + "T" + time
    
//     let data = {messageText, sendDatetime, contacts, geoLocation}

//     const url = dbURL + '/messages'

//     const options = {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     }

//     let response = await fetch(url, options)
//     data = await response.json()

//     if (response.status === 400) {
//         dbMessageDiv.textContent = data.message
//     } 
//     else if (response.status === 201) {
//         // localStorage.setItem("token", data.token)
//         alert("Message was created successfully!")

//         const newUrl = `${protocol}//${host}`
//         window.location.replace(newUrl)
//     }
// })

