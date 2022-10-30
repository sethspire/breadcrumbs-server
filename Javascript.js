function deleteSplashScreen() {
    let splashScreen = document.querySelector("#splash-screen")
    document.body.removeChild(splashScreen)

}

function createSplashScreen() {
    let splashElement = document.createElement("div")
    splashElement.setAttribute("id", "splash-screen")

    let closeButton = document.createElement("button")
    closeButton.setAttribute("id", "cancel-button")
    closeButton.setAttribute("type", "button")

    let sign1Button = document.createElement("a")
    sign1Button.setAttribute("id", "sign-in")
    sign1Button.setAttribute("type", "button")
    sign1Button.setAttribute("href", "login.html")

    let sign2Button = document.createElement("a")
    sign2Button.setAttribute("id", "sign-up")
    sign2Button.setAttribute("type", "button")
    sign2Button.setAttribute("href", "create_account.html")
    

    splashElement.appendChild(closeButton)
    splashElement.appendChild(sign1Button)
    splashElement.appendChild(sign2Button)
    document.body.appendChild(splashElement)

    splashElement.addEventListener("click", deleteSplashScreen)
}

createSplashScreen()
