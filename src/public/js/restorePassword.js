const error = document.getElementById("error")
const checkEmail = document.getElementById("checkEmail")
const email = document.getElementById("email")

let splitEmail = email.textContent.split(' ')[1]

checkEmail.onsubmit = (e) => {
    e.preventDefault()
    let password = document.getElementById("newPassword").value
    const body = {
        password: document.getElementById("newPassword").value,
        email: splitEmail
    }
    const newPassword = document.getElementById("newPasswordCheck").value
    if (password !== newPassword) {
        return error.innerHTML = '<p>Passwords entered do not match</p>'
    } else {
        updatePassword(body)
    }
}

async function updatePassword(body) {
    try {
        const result = await fetch(`http://localhost:8080/api/sessions/restorePassword`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const response = await result.json();
        if (response.message === true) {
            return error.innerHTML = '<p>Password update. Please login again</p>'
        } else {
            return error.innerHTML = '<p>The password entered is equal to the saved one. Please try with another</p>'
        }
    } catch (error) {
        error
    }
}