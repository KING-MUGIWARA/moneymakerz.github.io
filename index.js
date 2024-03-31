document.addEventListener('DOMContentLoaded', function() {
  // Set currentBalance to zero whenever index.html is opened
  let currentBalance = 0;
  
  // Update the localStorage to reflect the new balance
  localStorage.setItem('currentBalance', currentBalance);

  // Function to update balance display
  function updateBalanceDisplay(balance) {
      document.getElementById('currentBalance').textContent = 'Current Balance: ₦' + balance.toFixed(2);
  }

  // Update balance display with stored balance
  updateBalanceDisplay(currentBalance);

  // Event listener for the Deposit button
  document.getElementById('de').addEventListener('click', function() {
      // Redirect to deposit page
      window.location.href = 'deposit.html';
  });

  // Event listener for the Invest button
  document.getElementById('in').addEventListener('click', function() {
      // Redirect to invest page
      window.location.href = 'invest.html';
  });

  // Event listener for the Game button
  document.getElementById('ga').addEventListener('click', function() {
      // Redirect to game page
      window.location.href = 'game.html';
  });

  // Event listener for the Withdrawal button
  document.getElementById('wi').addEventListener('click', function() {
      // Redirect to withdrawal page
      window.location.href = 'withdrawal.html';
  });
});
