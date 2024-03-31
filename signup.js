document.addEventListener('DOMContentLoaded', function() {
    const signUpBtn = document.getElementById('signUpBtn');
    signUpBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const dobInput = document.getElementById('dob').value;
        const currentDate = new Date();
        const inputDate = new Date(dobInput);
        const minAgeDate = new Date(currentDate.getFullYear() - 13, currentDate.getMonth(), currentDate.getDate());
        
        if (inputDate > currentDate || inputDate > minAgeDate) {
            alert('Please enter a valid date of birth.');
            return;
        }

        // Proceed with sign-up if validation passes
        // Here you can add code to submit the form data to your server or perform further actions
        // For now, let's just log the form data
        const formData = {
            name: document.getElementById('name').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            email: document.getElementById('email').value,
            dob: dobInput,
            gender: document.querySelector('input[name="gender"]:checked').value,
            country: document.getElementById('country').value,
            state: document.getElementById('state').value,
            city: document.getElementById('city').value,
            address: document.getElementById('address').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        console.log(formData);

        // Redirect to welcome page after sign-up
        window.location.href = 'welcome.html';
    });
});
