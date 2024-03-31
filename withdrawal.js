// withdrawal.js
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('withdrawal-form');

  // Retrieve the current balance from localStorage
  let currentBalance = parseFloat(localStorage.getItem('currentBalance')) || 0;

  // Update balance display
  document.getElementById('currentBalance').textContent = 'Current Balance: ₦' + currentBalance.toFixed(2);

  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission

      // Retrieve form values
      const account = document.getElementById('account').value;
      const amount = parseFloat(document.getElementById('amount').value); // Parse the amount to float
      const bank = document.getElementById('bank').value;
      const AccName = document.getElementById('AccName').value;

      // Check if withdrawal amount is valid
      if (isNaN(amount) || amount <= 0 || amount > currentBalance) {
          alert("Please enter a valid withdrawal amount.");
          return;
      }

      // Send withdrawal request via email
      sendWithdrawalEmail(account, amount, bank, AccName);

      // Update the current balance
      currentBalance -= amount;

      // Update the balance in localStorage
      localStorage.setItem('currentBalance', currentBalance.toFixed(2));

      // Update balance display
      document.getElementById('currentBalance').textContent = 'Current Balance: ₦' + currentBalance.toFixed(2);

      // Show confirmation message to the user
      alert('Withdrawal request submitted successfully!');

      // Reset the form fields
      form.reset();
  });

  // Listen for custom event from deposit page to update balance
  document.addEventListener('balanceUpdated', function(event) {
      currentBalance = event.detail;
      document.getElementById('currentBalance').textContent = 'Current Balance: ₦' + currentBalance.toFixed(2);
  });
});

function sendWithdrawalEmail(account, amount, bank, AccName) {
  // Replace 'YOUR_TEMPLATE_ID' with the ID of your custom template
  emailjs.send('service_d4iptss', 'template_a68zkc4', {
      to_name: 'Money_Maker', // Replace with the name of the recipient
      from_name: `Name - ${AccName}`,    // Replace with your name or sender's name
      message: `Withdrawal request: Account - ${account}, Amount - ${amount}, bank - ${bank}`
  }, 'wOjllSMIpDE4h_tl7')
  .then(function(response) {
      console.log('Email sent successfully:', response);
  }, function(error) {
      console.error('Failed to send email:', error);
  });
}
