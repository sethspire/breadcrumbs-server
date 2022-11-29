const protocol = window.location.protocol
const host = window.location.host
const dbURL = "https://thebreadcrumbs-api.herokuapp.com"

const message = document.querySelector('.message-text')

const contact1Name = document.querySelector('.contact1')
const contact2Name = document.querySelector('.contact2')
const contact3Name = document.querySelector('.contact3')

const contact1Email = document.querySelector('.contact1-email')
const contact2Email = document.querySelector('.contact2-email')
const contact3Email = document.querySelector('.contact3-email')

const messageDate1 = document.querySelector('.date1')
const messageDate2 = document.querySelector('.date2')
const messageDate3 = document.querySelector('.date3')

window.addEventListener('load', async(e) => {
    e.preventDefault()
            
    const token = localStorage.getItem('token')
    const url =  dbURL + "/users/me"

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

            url = dbURL + '/messages'

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

                    //displays message in page
                    message.innerHTML = `${data.messageText}`
                    console.log(message.innerHTML)

                }
            } 
            else {
                //redirects user to craft a message if no messages where found
                console.log("HTTP-Error: " + response.status)
                alert("No messages found")
                const newUrl = `${protocol}//${host}/craft_a_message_pages/index.html`
                window.location.replace(newUrl)
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
