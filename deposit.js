let currentBalance = parseFloat(localStorage.getItem('currentBalance')) || 0;
let codeEntered = false; // Track if the correct code is entered

function updateBalance(amount) {
    currentBalance += amount;
    document.getElementById('currentBalance').textContent = 'Current Balance: ₦' + currentBalance.toFixed(2);
    // Store the updated balance in localStorage
    localStorage.setItem('currentBalance', currentBalance.toFixed(2));
}

document.addEventListener('DOMContentLoaded', function () {
    // Update balance on page load
    document.getElementById('currentBalance').textContent = 'Current Balance: ₦' + currentBalance.toFixed(2);

    const depositForm = document.getElementById('deposit-form');
    depositForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const email = document.getElementById('email').value;

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        // Prepare email parameters
        const emailParams = {
            to_name: 'MONEY-MAKERZ', // Change to the recipient's name
            amount: amount.toFixed(2), // Format amount to 2 decimal places
            message: `DEPOSITED AMOUNT: Amount - ${amount}, email- ${email}`
        };

        // Send email using EmailJS
        emailjs.send("service_d4iptss", "template_a68zkc4", emailParams)
            .then(function(response) {
                console.log('Email sent successfully:', response);
                alert('Confirmation email sent!');
                updateBalance(amount);
                depositForm.reset();
            }, function(error) {
                console.error('Email could not be sent:', error);
                alert('Failed to send confirmation email. Please try again later.');
            });
    });

    // Enable the Play Game button only when the correct code is entered
    const playGameButton = document.getElementById('ga');
    const codeInput = document.getElementById('code');
    codeInput.addEventListener('input', function() {
        codeEntered = (codeInput.value == '123LUFFYis');
        playGameButton.disabled = !codeEntered;
    });
});
