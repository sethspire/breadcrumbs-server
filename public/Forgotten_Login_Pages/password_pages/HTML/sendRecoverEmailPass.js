//send email button
const sendButton = document.querySelector("#requestLink")
const form = document.getElementById('email-form')

function sendEmail(){
    emailjs.sendForm('service_3p4kph8', 'reset_password', form)
                    .then(function() {
                        console.log('SUCCESS!');
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
}


sendButton.addEventListener("click", sendEmail)
