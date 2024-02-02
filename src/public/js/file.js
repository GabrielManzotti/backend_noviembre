
const fileForm = document.getElementById("fileForm")
const profileForm = document.getElementById("profileForm")
const productForm = document.getElementById("productForm")
const fileinput = document.getElementById('file');
const idSubmit = document.querySelector(".form-control-file").id

fileForm.onsubmit = (e) => {
    e.preventDefault()
    addNewFile()
}

async function addNewFile() {
    const fileinput = document.querySelector('.form-control-file');
    const archivo = fileinput.files[0];
    const formData = new FormData
    formData.append('documents', archivo);
    try {
        const result = await fetch(`http://localhost:8080/api/users/${idSubmit}/documents`, {
            method: "POST",
            body: formData
        });
    } catch (error) {
        error
    }
}

profileForm.onsubmit = (e) => {
    e.preventDefault()
    addNewProfile()
}

async function addNewProfile() {
    const fileinput = document.querySelector('.form-control-profile');
    const archivo = fileinput.files[0];
    const formData = new FormData
    formData.append('profileImage', archivo);
    try {
        const result = await fetch(`http://localhost:8080/api/users/${idSubmit}/profileImage`, {
            method: "POST",
            body: formData
        });
    } catch (error) {
        error
    }
}

productForm.onsubmit = (e) => {
    e.preventDefault()
    addNewProduct()
}

async function addNewProduct() {
    const fileinput = document.querySelector('.form-control-product');
    const archivo = fileinput.files[0];
    const formData = new FormData
    formData.append('productImage', archivo);
    try {
        const result = await fetch(`http://localhost:8080/api/users/${idSubmit}/productImage`, {
            method: "POST",
            body: formData
        });
    } catch (error) {
        error
    }
}
