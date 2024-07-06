const DARK_MODE_KEY = 'dark-mode';
const SIGNUP_EMAIL_KEY = 'signupEmail';
const RESET_EMAIL_KEY = 'resetEmail';
const TOKEN_KEY = 'token';
const USER_ID_KEY = 'userId';

if (localStorage.getItem(DARK_MODE_KEY) === 'enabled') {
    document.body.classList.add('dark-mode');
}

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem(DARK_MODE_KEY, document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
});

// Helper Functions
async function sendRequest(url, method, body) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Request failed');
        }
        return data;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
        throw error;
    }
}

// LOGIN TO ACCOUNT

// Function to update the login link to "Account"
function updateLoginLink() {
    const loginLink = document.getElementById('login-link');
    if (loginLink) {
        loginLink.innerText = 'Account';
        loginLink.href = '../ACCOUNT/account.html';
        loginLink.addEventListener('click', function() {
            // Display account menu or redirect to account page
            displayAccountMenu();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const accountPopup = document.getElementById('account-popup');
    const closePopup = document.getElementById('close-popup');
    const updateBtn = document.getElementById('update-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const logoutBtn = document.getElementById('logout-btn');

    const updatePopup = document.getElementById('update-popup');
    const closeUpdatePopup = document.getElementById('close-update-popup');
    const sendOtpBtn = document.getElementById('send-otp-btn');
    const submitUpdateBtn = document.getElementById('submit-update-btn');

    const deletePopup = document.getElementById('delete-popup');
    const closeDeletePopup = document.getElementById('close-delete-popup');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');

    const TOKEN_KEY = 'token';
    const USER_ID_KEY = 'userId';

    // Function to display account menu
    function displayAccountMenu() {
        accountPopup.style.display = 'block';
        fetchUserDetails();
    }

    // Function to fetch user details
    async function fetchUserDetails() {
        const userId = localStorage.getItem(USER_ID_KEY);
        try {
            const response = await fetch(`http://localhost:3000/api/auth/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            document.getElementById('user-name').innerText = data.name;
            document.getElementById('user-email').innerText = data.email;
            document.getElementById('user-address').innerText = data.address;
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    // Function to close the account popup
    closePopup.addEventListener('click', () => {
        accountPopup.style.display = 'none';
    });

    // Function to display the update popup
    function displayUpdatePopup() {
        updatePopup.style.display = 'block';
    }

    // Function to close the update popup
    closeUpdatePopup.addEventListener('click', () => {
        updatePopup.style.display = 'none';
    });

    /*// Function to display the delete popup
    function displayDeletePopup() {
        deletePopup.style.display = 'block';
    }*/
   // Function to open delete popup
   deleteBtn.addEventListener('click', () => {
    deletePopup.style.display = 'block';
});

    // Function to close the delete popup
    closeDeletePopup.addEventListener('click', () => {
        deletePopup.style.display = 'none';
    });

    // Handle update button click
    updateBtn.addEventListener('click', () => {
        displayUpdatePopup();
    });

 // Function to handle send OTP button click
 sendOtpBtn.addEventListener('click', async () => {
    const userEmail = document.getElementById('user-email').innerText;
    try {
        await fetch('http://localhost:3000/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userEmail }),
        });
        alert('OTP sent to your email.');
    } catch (error) {
        console.error('Error sending OTP:', error);
        alert('Error sending OTP. Please try again.');
    }
});

// Function to handle submit update button click
submitUpdateBtn.addEventListener('click', async () => {
    const userId = localStorage.getItem(USER_ID_KEY);
    const name = document.getElementById('new-user-name').value;
    const email = document.getElementById('new-user-email').value;
    const address = document.getElementById('new-user-address').value;
    const otp = document.getElementById('otp').value;

    try {
        const response = await fetch(`http://localhost:3000/api/auth/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, address, otp }),
        });

        if (response.ok) {
            alert('Details updated successfully.');
            updatePopup.style.display = 'none';
            fetchUserDetails(); // Refresh the account details
        } else {
            const data = await response.json();
            alert(data.message || 'Update failed.');
        }
    } catch (error) {
        console.error('Error updating details:', error);
        alert('Error updating details. Please try again.');
    }
});

// Function to handle confirm delete button click
confirmDeleteBtn.addEventListener('click', async () => {
    const userId = localStorage.getItem(USER_ID_KEY);
    const deleteConfirmation = document.getElementById('delete-confirmation').value;

    if (deleteConfirmation === 'DELETE') {
        try {
            const response = await fetch(`http://localhost:3000/api/auth/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Account deleted successfully.');
                deletePopup.style.display = 'none';
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(USER_ID_KEY);
                window.location.href = './index.html';
            } else {
                const data = await response.json();
                alert(data.message || 'Delete failed.');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Error deleting account. Please try again.');
        }
    } else {
        alert('Please type DELETE to confirm.');
    }
});

    // Handle logout button click
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_ID_KEY);
        alert('Logged out successfully');
        window.location.href = '../LOGIN/login.html';
    });

    // Update login link to account link
    function updateLoginLink() {
        const loginLink = document.getElementById('login-link');
        if (loginLink) {
            loginLink.innerText = 'Account';
            loginLink.addEventListener('click', function(event) {
                event.preventDefault();
                displayAccountMenu();
            });
        }
    }

    // Call updateLoginLink if user is already logged in
    if (localStorage.getItem(TOKEN_KEY)) {
        updateLoginLink();
    }
});
// Signup Form Submission
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const address = document.getElementById('address').value;

        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, address }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('OTP sent to your email. Please verify your account.');
                localStorage.setItem('signupEmail', email);
                window.location.href = '../OTP/otp.html';
            } else {
                alert(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
}
// OTP Verification Form Submission
const verifyOtpForm = document.getElementById('verify-otp-form');
if (verifyOtpForm) {
    verifyOtpForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = localStorage.getItem(SIGNUP_EMAIL_KEY);
        const otp = document.getElementById('otp').value;
        try {
            await sendRequest('http://localhost:3000/api/auth/verify-otp', 'POST', { email, otp });
            alert('Account verified successfully. You can now log in.');
            window.location.href = '../LOGIN/login.html';
        } catch (error) {
            alert(error.message);
        }
    });
}

// Forgot Password Form Submission
const forgotPasswordForm = document.getElementById('forgot-password-form');
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;

        try {
            const response = await sendRequest('http://localhost:3000/api/auth/forgot-password', 'POST', { email });
            alert('OTP sent to your email. Please verify to reset your password.');
            localStorage.setItem(RESET_EMAIL_KEY, email);
            window.location.href = '../NEWPASS/newpass.html';
        } catch (error) {
            alert(error.message);
        }
    });
}

// Reset Password Form Submission
const resetPasswordForm = document.getElementById('reset-password-form');
if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = localStorage.getItem('resetEmail');
        const otp = document.getElementById('otp').value;
        const newPassword = document.getElementById('new-password').value;

        console.log(`resetPasswordForm: email=${email}, otp=${otp}, newPassword=${newPassword}`);

        try {
            const response = await fetch('http://localhost:3000/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Password reset successfully. You can now log in.');
                window.location.href = '../LOGIN/login.html';
            } else {
                alert(data.message || 'Password reset failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
}
// Login Form Submission
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const { email, password } = Object.fromEntries(new FormData(loginForm));
        try {
            const data = await sendRequest('http://localhost:3000/api/auth/login', 'POST', { email, password });
            alert('Login successful');
            localStorage.setItem(TOKEN_KEY, data.token);
            localStorage.setItem(USER_ID_KEY, data.userId);
            window.location.href = '../INDEX/index.html'; // Redirect to home page
        } catch (error) {
            alert(error.message);
        }
    });
}

