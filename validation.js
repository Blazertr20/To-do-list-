const form = document.getElementById('form')
const username_input = document.getElementById('username-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const error_message = document.getElementById('error-message')

/*  Checks each form submission (ur job is to prevent reload if errors)   */
form.addEventListener('submit', (e) => {
    e.preventDefault();

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
    error_message.innerText = errors.join('. ')

} // sends us to to do list (hopefully T_T)
    else {
    error_message.innerText = ''

      if(!username_input){
        // goes to login
            window.location.href = "todo.html"
      
      } else{
        //we go to the todo list
    window.location.href = "Login.html"
        }
    }
});


/* Display based on form error(failed like 3 times pmo) */

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



function getLoginFormErrors(email,password){
      let errors = []

    if (email === '') {
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }

    if (password === '') {
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }
    else if(password.length< 8){
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
].filter(input => input != null)

allInputs.forEach(input => {
    if (input) {
        input.parentElement.classList.remove('incorrect')

        // Remove error styling when the user starts typing
        input.addEventListener('input', () => {
            input.parentElement.classList.remove('incorrect')
        })
    }
})
