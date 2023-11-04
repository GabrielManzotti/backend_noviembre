const socketClient = io()
let products = [];

const productsList = document.getElementById("productsList")
const addProductForm = document.getElementById("addProductForm")
const updateProduct = document.getElementById("updateProduct")
const deleteForm = document.getElementById("deleteForm")
const error = document.getElementById("error")

socketClient.emit("getProducts");

const validaProd = (obj) => {
    if ((!obj.title) || (!obj.description) || (!obj.price) || (!obj.code) || (!obj.stock) || (!obj.category)) {
        return false
    } else {
        return true
    }
}

addProductForm.onsubmit = (e) => {
    e.preventDefault()
    let newProduct = {
        title: document.getElementById("newProductTitle").value,
        description: document.getElementById("newProductDescription").value,
        price: document.getElementById("newProductPrice").value,
        code: document.getElementById("newProductCode").value,
        stock: document.getElementById("newProductStock").value,
        category: document.getElementById("newProductCategory").value,
        status: true,
    };
    if (validaProd(newProduct)) {
        addNewProduct(newProduct)
        error.innerHTML = `<p></p>`
    }
    else {
        error.innerHTML = `<p class="error">--- ERROR: Data is missing ---</p>`
    }
}

async function addNewProduct(product) {
    try {
        const result = await fetch("http://localhost:8080/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });
        if (result) {
            socketClient.emit("getProducts");
        }
    } catch (error) {
        error
    }
}

const validaUpdate = (id, obj) => {
    if ((!id) || (!obj.title) || (!obj.description)) {
        return false
    }
    else {
        return true
    }
}

updateProduct.onsubmit = (e) => {
    e.preventDefault()
    let idUpdate = document.getElementById("updateProductId").value
    let updateProduct = {
        title: document.getElementById("updateProductTitle").value,
        description: document.getElementById("updateProductDescription").value,
        price: document.getElementById("updateProductPrice").value,
    }
    if (validaUpdate(idUpdate, updateProduct)) {
        updateProductFunc(idUpdate, updateProduct)
        error.innerHTML = `<p></p>`
    } else {
        error.innerHTML = `<p class="error">--- ERROR: Data is missing ---</p>`
    }


}

async function updateProductFunc(id, obj) {
    try {
        const result = await fetch(`http://localhost:8080/api/products/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        result ? socketClient.emit("getProducts") : null
    } catch (error) {
        error
    }
}

deleteForm.onsubmit = (e) => {
    e.preventDefault()
    let deleteProdID = document.getElementById("deleteProductId").value
    if (deleteProdID) {
        deleteProduct(deleteProdID);
        error.innerHTML = `<p></p>`
    }
    else {
        error.innerHTML = `<p class="error">--- ERROR: Data is missing ---</p>`
    }
}

async function deleteProduct(productId) {
    try {
        const result = await fetch(`http://localhost:8080/api/products/delete/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (result) {
            socketClient.emit("getProducts");
        };
    } catch (error) {
        error
    }
}

function printProducts() {
    const productsToPrint = products.map(
        (product) => `<li>
        <p>ID: ${product.id}</p> 
        <p>Title: ${product.title}</p> 
        <p>Description: ${product.description}</p> 
        <p>Price: ${product.price}</p> 
        <p>Code: ${product.code}</p> 
        <p>Stock: ${product.stock}</p>
        <p>Category: ${product.category}</p>
      </li>`
    )
        .join(" ");
    productsList.innerHTML = productsToPrint;
}

socketClient.on("updatedProducts", (_products) => {
    products = _products;
    printProducts()
});