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
        const result = await fetch(`http://localhost:8080/api/cart/652f3e21d09bf31d980b1049/product/${product}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        });
        window.location.replace("http://localhost:8080/api/cart/652f3e21d09bf31d980b1049")
    } catch (error) {
        error
    }
}

