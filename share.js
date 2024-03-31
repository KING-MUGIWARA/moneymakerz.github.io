// Initial balance
var balance = 0.0;

// Function to update balance
function updateBalance(amount) {
  balance += amount;
  document.getElementById('balanceDisplay').innerText = ' ₦' + balance.toFixed(1);
}

document.getElementById('shareBtn').addEventListener('click', function() {
    var url = 'https://moneymakerz.github.io/'; // Your desired link here
    document.getElementById('linkInput').value = url;
    document.getElementById('shareOptions').style.display = 'block';
  });
  
  document.getElementById('whatsappShare').addEventListener('click', function() {
    // Update href attribute for WhatsApp share option
    var url = 'https://moneymakerz.github.io/'; // Your desired link here
    this.href = 'whatsapp://send?text=' + encodeURIComponent(url);
   // Update balance
   updateBalance(0.1);
});
  
  document.getElementById('instagramShare').addEventListener('click', function() {
    // Update href attribute for Instagram share option
    var url = 'https://moneymakerz.github.io/'; // Your desired link here
    this.href = 'https://www.instagram.com/share?url=' + encodeURIComponent(url);
      // Update balance
  updateBalance(0.1);

    
    // Show cash out button when Instagram share is clicked
    document.getElementById('cashOutBtn').style.display = 'block';
  });
  
  document.getElementById('cashOutBtn').addEventListener('click', function() {
    // Check if balance is at least 100 Naira
    if (balance >= 100) {
      // Redirect to deposit page
      window.location.href = 'deposit.html';
    } else {
      alert('You need at least 100 Naira to cash out.');
    }
  });
  