document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the current balance from localStorage
    let depositBalance = parseFloat(localStorage.getItem('currentBalance'));
    // If depositBalance is not available, default to 100
    let balance = depositBalance ;

    // Update the balance display
    document.getElementById('balance').innerText = balance.toFixed(2);

    const randomNumber = Math.floor(Math.random() * 100) + 1;

    document.getElementById('guessBtn').addEventListener('click', function() {
        const userGuess = parseInt(document.getElementById('userGuess').value);
        const betAmount = parseInt(document.getElementById('betAmount').value);

        if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
            setMessage("Please enter a valid bet amount.");
            return;
        }

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
            setMessage("Please enter a valid number between 1 and 10.");
            return;
        }

        balance -= betAmount;

        if (userGuess === randomNumber) {
            balance += betAmount * 2;
            setMessage(`Congratulations! You guessed the number ${randomNumber} correctly and won ₦${betAmount * 2}! New balance: ₦${balance}`);
        } else {
            setMessage(`Sorry, the correct number was ${randomNumber}. You lost ₦${betAmount}. New balance: ₦${balance}`);
        }

        updateBalance();
    });

    function setMessage(message) {
        document.getElementById('message').innerText = message;
    }

    function updateBalance() {
        document.getElementById('balance').innerText = balance.toFixed(2);
        // Store the updated balance in localStorage
        localStorage.setItem('currentBalance', balance.toFixed(2));

        // Dispatch custom event to inform deposit page about the updated balance
        document.dispatchEvent(new CustomEvent('balanceUpdated', { detail: balance }));
    }
});

// Listen for custom event from deposit page to update balance
document.addEventListener('balanceUpdated', function(event) {
    let balance = event.detail;
    document.getElementById('balance').innerText = balance.toFixed(2);
});
