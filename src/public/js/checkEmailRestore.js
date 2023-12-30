const errorEmail = document.getElementById("errorEmail")
const emailForm = document.getElementById("checkEmail")

emailForm.onsubmit = (e) => {
    e.preventDefault()
    let email = document.getElementById("checkEmailInput").value
    if (email) {
        checkEmail(email)
    }

}

async function checkEmail(email) {
    try {
        const result = await fetch(`http://localhost:8080/api/users/find/findByEmail/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const body = await result.json();
        if (body.message == "User not found") {
            return errorEmail.innerHTML = `<p>Email not found</p>`
        } else {
            const obj = {
                email: body.user.email,
                first_name: body.user.first_name
            }
            sendEmail(obj)
            return errorEmail.innerHTML = `<p>We send you a email to restore your password. </p>`
        }
    } catch (error) {
        error
    }
}


async function sendEmail(obj) {
    try {
        const result = await fetch(`http://localhost:8080/api/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
    } catch (error) {
        error
    }
}


