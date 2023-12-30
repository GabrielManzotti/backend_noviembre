
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
        console.log(body.user);
        const obj = {
            email: body.user.email,
            name: body.user.first_name
        }
        if (body.message == "User not found") {
            return errorEmail.innerHTML = `<p>Email not found</p>`
        } else {

            return errorEmail.innerHTML = `<p>We send you a email to restore your password. </p>`
        }
    } catch (error) {
        error
    }
}



