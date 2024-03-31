document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the current balance from localStorage
    let depositBalance = parseFloat(localStorage.getItem('currentBalance'));
    // If depositBalance is not available, default to 100
    let balance = depositBalance ;

    // Update the balance display
    document.getElementById('balance').textContent = `₦${balance}`;

    // Function to play the game
    function playGame() {
        const guess = document.getElementById("guess").value;
        let betAmount = parseInt(document.getElementById("betAmount").value);
        const randomNumber1 = Math.floor(Math.random() * 100) + 1;
        const randomNumber2 = Math.floor(Math.random() * 100) + 1;
        const productIsEven = (randomNumber1 * randomNumber2) % 2 === 0;

        let resultText = "";

        // Check if bet amount is less than 100
        if (betAmount < 100 || isNaN(betAmount)) {
            resultText = "Minimum bet amount is ₦100.";
        } else if (betAmount > balance) {
            resultText = "You cannot bet more than your current balance.";
        } else {
            // Make it extremely hard for the player to win by basing the guess on the product of two random numbers
            if ((guess === "even" && productIsEven) || (guess === "odd" && !productIsEven)) {
                balance += betAmount / 100; // Increased win amount
                resultText = `Congratulations! You won ₦${betAmount / 20}.`;
            } else {
                balance -= betAmount; // Increased loss amount
                resultText = `Sorry, you lost ₦${betAmount}.`;
            }
        }

        // Update balance display and store in localStorage
        document.getElementById("balance").textContent = `₦${balance}`;
        localStorage.setItem('currentBalance', balance);

        // Display result message
        document.getElementById("result").textContent = resultText;
    }

    // Event listener for the play button
    document.getElementById('playGame').addEventListener('click', playGame);
});
