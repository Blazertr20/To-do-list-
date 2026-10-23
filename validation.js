const form = document.getElementById('form')
const username_input = document.getElementById('username-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const error_message = document.getElementById('error-message')


form.addEventListener('submit', (e) => {
    let errors = []

    if (username_input) {
        // If we have a username input, we are in signup
        errors = getSignupFormErrors(
            username_input.value.trim(),
            email_input.value.trim(),
            password_input.value
        )
    } else {
        // If we don't have a username input, we are in login
        errors = getLoginFormErrors(
            email_input.value.trim(),
            password_input.value
        )
    }

    if (errors.length > 0) {
        // If there are any errors
        e.preventDefault()
        error_message.innerText = errors.join(". ")
    }
})

function getSignupFormErrors(username, email, password) {
    let errors = []

    if (username === '') {
        errors.push('Username is required')
        username_input.parentElement.classList.add('incorrect')
    }

    if (email === '') {
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }

    if (password === '') {
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }
    if(password.length< 8){
        errors.push('Password must have at least 8 characters')
        password_input.parentElement.classList.add('incorrect')
    }

    return errors
}



// Remove error styling when the page first loads
const allInputs = [
    username_input,
    email_input,
    password_input
]

allInputs.forEach(input => {
    if (input) {
        input.parentElement.classList.remove('incorrect')

        // Remove error styling when the user starts typing
        input.addEventListener('input', () => {
            input.parentElement.classList.remove('incorrect')
        })
    }
})
