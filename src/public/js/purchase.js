const delete_bottom = document.querySelectorAll(".delete")
const elementIdCart = document.getElementsByClassName("idCart")

const cartId = elementIdCart[0].id

window.addEventListener('click', function (e) {
    function detectButton(event) {
        e.preventDefault()
        let id = e.target.id
        let dom = e.target.value
        console.log(dom);
        if (dom === "DELETE") {
            deleteProductById(id)
        }
    }
    detectButton()
})

async function deleteProductById(product) {
    try {
        const result = await fetch(`http://localhost:8080/api/cart/${cartId}/product/${product}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        error
    }
}
