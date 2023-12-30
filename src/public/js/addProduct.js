let products = []
const productsList = document.getElementById("list")
const addToCartForm = document.getElementById("addToCartForm")
const error = document.getElementById("error")
const idCart = JSON.parse(localStorage.getItem("idCart"))
const product = JSON.parse(localStorage.getItem("producto elegido"))

async function getProduct() {
    try {
        const result = await fetch(`http://localhost:8080/api/products/${product}`)
        const body = await result.json();
        if (body) {
            products = body.Product;
            productsList.innerHTML = `<div>
            <li>
                <p>Title: ${products.title}</p> 
                <p>Description: ${products.description}</p> 
                <p>Price: ${products.price}</p> 
                <p>Category: ${products.category}</p>
              </li>
              `
        };
    } catch (error) {
        error
    }
}
getProduct()


addToCartForm.onsubmit = (e) => {
    e.preventDefault()
    let quantity = {
        quantity: document.getElementById("addToCart").value,
    }
    addProductInCart(quantity)

}

async function addProductInCart(quantity) {
    try {
        const result = await fetch(`http://localhost:8080/api/cart/${idCart}/product/${product}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(quantity),
        })
        const body = await result.json();
        console.log("cart", body.cart)
        console.log("mess", body.message);;
        if (body.Cart === "no stock") {
            error.innerHTML = "We don't have stock for this quantity"
        }
        if (body.message === "you are the owner of this product") {
            error.innerHTML = body.message
        }
        else {
            error.innerHTML = "Product added succesfully"
        }
    } catch (error) {
        error
    }
}