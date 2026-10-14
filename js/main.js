const form = document.querySelector('#cyberForm')
const submitBtn = document.querySelector('#submitBtn')
const successScreen = document.querySelector('#successScreen')
const formContainer = document.querySelector('#regFormContainer')

const inputs = {
    username: document.querySelector('#username'),
    email: document.querySelector('#email'),
    password: document.querySelector('#password'),
    confirmPassword: document.querySelector('#confirmPassword')
};

const errors = {
    username: document.querySelector('#userError'),
    email: document.querySelector('#emailError'),
    password: document.querySelector('#passwordError'),
    confirmPassword: document.querySelector('#confirmdError')
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 


const isUserValid = () => inputs.username.value.trim().length >= 3;
const isEmailValid = () => emailRegex.test(inputs.email.value.trim());
const isPassValid = () => inputs.password.value.length >= 8;
const isConfirmValid = () => inputs.confirmPassword.value === inputs.password.value && inputs.confirmPassword.value.length > 0;

function validateUsername(){
    const val = inputs.username.value.trim()

    if (val.length < 3) {
        showError('username', true)
        return false    
    }
    showError('username', false)
    return true   
}

function validatePassword() {
    const val = inputs.password.value

    if (val.length < 8) {
        showError('password', true)
        return false
    }
    showError('password', false)
    
    if (inputs.confirmPassword.value.length > 0) {
        validateConfirmPassword()
    }
    return true
}

function validateEmail() {
    const val = inputs.email.value.trim()

    if (!emailRegex.test(val)) {
        showError('email', true)
        return false
    }
    showError('email', false)
    return true
}

function validateConfirmPassword() {
    const val = inputs.confirmPassword.value
    const basePassword = inputs.password.value

    if (val !== basePassword || val.length === 0) {
        showError('confirmPassword', true)
        return false
    }
    showError('confirmPassword', false)
    return true
}

function checkFormValidity() {
    if (isUserValid() && isEmailValid() && isPassValid() && isConfirmValid()) {
        submitBtn.disabled = false
    } else {
        submitBtn.disabled = true
    }
}

function showError(fieldKey, show) {
    const errorEl = errors[fieldKey]
    const inputEl = inputs[fieldKey]

    if (show) {
        errorEl.classList.add('visible')
        inputEl.style.borderColor = 'var(--error)'

        if (!inputEl.classList.contains('shake')) {
            inputEl.classList.add('shake')
            setTimeout(() => inputEl.classList.remove('shake'), 500)    
        }
    } else {
        errorEl.classList.remove('visible')
        inputEl.style.borderColor = 'var(--neon-blue)'
    }
}

inputs.username.addEventListener('input', () => { if(isUserValid()) showError('username', false); checkFormValidity(); });
inputs.email.addEventListener('input', () => { if(isEmailValid()) showError('email', false); checkFormValidity(); });
inputs.password.addEventListener('input', () => { if(isPassValid()) showError('password', false); checkFormValidity(); });
inputs.confirmPassword.addEventListener('input', () => { if(isConfirmValid()) showError('confirmPassword', false); checkFormValidity(); });


inputs.username.addEventListener('blur', () => { if(inputs.username.value.length > 0) validateUsername(); });
inputs.email.addEventListener('blur', () => { if(inputs.email.value.length > 0) validateEmail(); });
inputs.password.addEventListener('blur', () => { if(inputs.password.value.length > 0) validatePassword(); });
inputs.confirmPassword.addEventListener('blur', () => { if(inputs.confirmPassword.value.length > 0) validateConfirmPassword(); });


form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const isFormValid = validateUsername() && validateEmail() && validatePassword() && validateConfirmPassword();

    if (isFormValid) {
        const userName = inputs.username.value.trim()
        const selectedAvatar = document.querySelector('input[name="avatar"]:checked').value
        const successName = document.querySelector('#successName')

        
        successName.textContent = `${userName} ${selectedAvatar}`

        
        formContainer.style.opacity = '0'
        setTimeout(() => {
            formContainer.style.display = 'none'
        }, 500);
        
        
        successScreen.classList.add('active')
    }
});