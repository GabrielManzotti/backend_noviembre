const cart = document.getElementById("cart")
const cartText = cart.textContent
const idCart = cartText.split(' ')[1]
localStorage.setItem("idCart", JSON.stringify(idCart))

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
    localStorage.setItem("producto elegido", JSON.stringify(product))
    window.location.replace('http://localhost:8080/api/addProduct')
}

