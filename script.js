const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

const apiUrl = 'http://localhost:3000/users'; // Altere a URL conforme necessário

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
        // Real API request to check username and password
        const response = await fetch(`${apiUrl}?username=${username}&password=${password}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // User authenticated, store token in sessionStorage
            const data = await response.json();
            
            if (data.length > 0) {
                sessionStorage.setItem('token', data[0].token);
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                // Redirect to the main page or perform any other action
            } else {
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }
        } else {
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }
});
