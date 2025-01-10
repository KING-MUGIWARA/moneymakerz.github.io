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

      const depositButton = document.getElementById('deposit-button');
      depositButton.addEventListener('click', function () {
        const amount = parseFloat(document.getElementById('amount').value);
        const email = document.getElementById('email').value;

        if (isNaN(amount) || amount <= 0) {
          alert('Please enter a valid amount.');
          return;
        }

        const paymentParams = {
          email: email,
          amount: amount * 100, // Paystack amount is in kobo (smallest currency unit), so multiply by 100
          currency: "NGN",
          metadata: {
            custom_fields: [
              {
                display_name: "Account Number",
                variable_name: "account_number",
                value: document.getElementById('account').value
              },
              {
                display_name: "Bank Name",
                variable_name: "bank_name",
                value: document.getElementById('bank').value
              }
            ]
          },
          callback: function (response) {
            // Payment successful
            console.log('Payment successful. Response: ', response);
            alert('Payment successful!');
            updateBalance(amount);
            document.getElementById('deposit-form').reset();
          },
          onClose: function () {
            // Payment closed
            console.log('Payment closed without completion.');
            alert('Payment closed without completion.');
          }
        };

        // Initialize Paystack inline payment
        const paymentHandler = PaystackPop.setup({
          key: 'sk_live_49a01a6fbc1937bec000c1fe154be878cfe908fd', // Your Paystack public key
          ...paymentParams
        });

        // Open Paystack payment form
        paymentHandler.openIframe();
      });

      // Enable the Play Game button only when the correct code is entered
      const playGameButton = document.getElementById('ga');
      const investNowButton = document.getElementById('in');
      const codeInput = document.getElementById('code');
      codeInput.addEventListener('input', function() {
        codeEntered = (codeInput.value == '123LUFFYisAganJA890');
        playGameButton.disabled = !codeEntered;
        investNowButton.disabled = !codeEntered;
      });
    });
