const signupForm = document.getElementById("signup")

const validaProd = (obj) => {
    if ((!obj.first_name) || (!obj.last_name) || (!obj.age) || (!obj.email)) {
        return false
    } else {
        return true
    }
}

signupForm.onsubmit = (e) => {
    e.preventDefault()
    let newUser = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        age: document.getElementById("age").value,
        email: document.getElementById("email").value,
    };
    if (validaProd(newUser)) {
        addNewUser(newUser)
    }
}

async function addNewUser(user) {
    try {
        const result = await fetch("http://localhost:8080/api/sessions/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        console.log(user)

    } catch (error) {
        error
    }
}