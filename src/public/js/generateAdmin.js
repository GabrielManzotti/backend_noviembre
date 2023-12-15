const update_role = document.getElementById("update")
const error = document.getElementById("error")

update_role.onsubmit = (e) => {
    e.preventDefault()
    let obj = {
        userId: document.getElementById("userId").value,
        role: document.getElementById("role").value
    }
    if (obj) {
        updateRole(obj)
    }
}

async function updateRole(obj) {
    try {
        const result = await fetch(`http://localhost:8080/api/users/updateRole`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        })
        if (result) {
            error.innerHTML = "User role modified succesfully"
        }
    } catch (error) {
        error
    }
}

// "/api/users/updateRole"