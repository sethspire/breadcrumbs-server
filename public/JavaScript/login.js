const submitButton = document.querySelector("#submit")

const submit = function () {

    const username = document.querySelector("#username")
    const value1 = username.value

    const password = document.querySelector("#password")
    const value2 = password.value
    
    //check if query sucessful- account found- use fetch and such
        //then go back to homepage with account logged in
    
    //if query not successful- tell user to reenter information 
    let alert = document.querySelector("#alert")
    alert.textContent = "Account not found. Reenter correct username or password"
    
}

submitButton.addEventListener("click", submit)