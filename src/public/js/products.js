const cart = document.getElementById("cart")
const cartText = cart.textContent
const idCart = cartText.split(' ')[1]

console.log(idCart);

window.addEventListener('click', function (e) {
    function detectButton(event) {
        let id = e.target.id
        let dom = e.target.nodeName
        let obj = { quantity: 1 }
        if (dom === "INPUT") {
            addNewProductToCart(id, obj)
        }
    }
    detectButton()
})

async function addNewProductToCart(product, obj) {
    try {
        const result = await fetch(`http://localhost:8080/api/cart/${idCart}/product/${product}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        });
        window.location.replace(`http://localhost:8080/api/cart/${idCart}`)
    } catch (error) {
        error
    }
}

