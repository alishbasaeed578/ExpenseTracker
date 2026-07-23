const panelContent = {
    login: {
        title: 'Hello, Friend!',
        text: 'Enter your personal details and start your journey with us today'
    },
    signup: {
        title: 'Join FinFlow',
        text: 'Track income, manage expenses, and reach your financial goals with ease'
    },
    forgot: {
        title: 'Need help?',
        text: "We'll send you a secure link to reset your password in minutes"
    }
};

function updatePanel(mode) {
    const content = panelContent[mode];
    const titleEl = document.getElementById('panelTitle');
    const textEl = document.getElementById('panelText');
    if (titleEl && textEl && content) {
        titleEl.textContent = content.title;
        textEl.textContent = content.text;
    }
}

function showForm(formId, mode) {
    document.querySelectorAll('.form-container').forEach(f => f.classList.remove('active'));
    document.getElementById(formId).classList.add('active');
    updatePanel(mode);
}

function showLogin() { showForm('loginForm', 'login'); }
function showSignup() { showForm('signupForm', 'signup'); }
function showForgotPassword() { showForm('forgotForm', 'forgot'); }

function showToast(message, type) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3500);
}

function showSuccessMessage(msg) { showToast(msg, 'success'); }
function showErrorMessage(msg) { showToast(msg, 'error'); }

function socialLogin(provider) {
    showSuccessMessage(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login coming soon!`);
}

async function handleFormSubmit(form, loadingText) {
    const button = form.querySelector('.btn-primary');
    const loading = button.querySelector('.loading');
    const btnText = button.querySelector('.btn-text');
    const originalText = btnText.textContent;

    loading.classList.add('show');
    btnText.textContent = loadingText;
    button.disabled = true;

    try {
        let url = '';
        let data = {};

        if (form.id === 'loginFormSubmit') {
            const email = form.querySelector('input[type="email"]').value;
            const password = form.querySelector('input[type="password"]').value;
            url = '/api/login';
            data = { email, password };
        } else if (form.id === 'signupFormSubmit') {
            const inputs = form.querySelectorAll('input');
            const name = inputs[0].value;
            const email = inputs[1].value;
            const password = inputs[2].value;
            url = '/api/signup';
            data = { name, email, password };
        } else if (form.id === 'forgotFormSubmit') {
            showSuccessMessage('Reset instructions sent (demo)');
            return;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.text();

        if (result.toLowerCase().includes('success') || result.toLowerCase().includes('registered')) {
            showSuccessMessage(result);

            if (form.id === 'loginFormSubmit') {
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1000);
            }
        } else {
            showErrorMessage(result);
        }
    } catch (error) {
        showErrorMessage('Server connection failed!');
    } finally {
        loading.classList.remove('show');
        btnText.textContent = originalText;
        button.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginFormSubmit').addEventListener('submit', e => {
        e.preventDefault();
        handleFormSubmit(e.target, 'Signing in...');
    });

    document.getElementById('signupFormSubmit').addEventListener('submit', e => {
        e.preventDefault();
        handleFormSubmit(e.target, 'Creating account...');
    });

    document.getElementById('forgotFormSubmit').addEventListener('submit', e => {
        e.preventDefault();
        handleFormSubmit(e.target, 'Sending...');
    });
});
