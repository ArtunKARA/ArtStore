// Step 1: Add event listener to the button
const button = document.getElementById('forgotMailButton');
button.addEventListener('click', sendEmail);

// Step 2: Event listener function to send the email
function sendEmail() {
    // Retrieve the user's email input value
    const email = document.getElementById('fMail').value;

    if(document.getElementById('alert')){
        document.getElementById('alert').remove();
    }
    // Step 3: Send a POST request to the PHP page
    fetch('/path/to/your-php-page.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => {
        // Step 4: Handle the response if needed
        if (response.ok) {
            console.log('Email sent successfully');
            // Step 5: Add a div element if the email is sent successfully
            const successDiv = document.createElement('div');
            successDiv.textContent = 'E-Posta Başarıyla Gönderildi';
            document.body.appendChild(successDiv);
        } else {
            console.error('Failed to send email');
            const errDiv = document.createElement('div');
            errDiv.className = 'alert alert-danger';
            errDiv.setAttribute('role', 'alert');
            errDiv.innerHTML = '<button class="close" type="button" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-exclamation-triangle"></i><strong>Hata!</strong> E-Posta Bulunamadı.';
            var targetBody = document.body;
            targetBody.appendChild(errDiv);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const errDiv = document.createElement('div');
        errDiv.className = 'alert alert-danger';
        errDiv.id = 'alert';
        errDiv.setAttribute('role', 'alert');
        errDiv.innerHTML = '<button class="close" type="button" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-info"></i><strong>Hata!</strong> E-Posta Gönderilirken Hata İle Karşılaşıldı.';
        var targetBody = document.forms[0];
        targetBody.appendChild(errDiv);
    });
}
