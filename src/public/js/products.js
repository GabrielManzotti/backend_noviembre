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

window.addEventListener('click', function (e) {
    function detectButton(event) {
        let id = e.target.id
        let dom = e.target.closest("button").textContent
        if (dom === "More products") {
            console.log("antes de print");
            printMoreProducts(id)
        }
    }
    detectButton()
})

async function printMoreProducts(id) {
    console.log("dentro de print", id);
    try {
        const result = await fetch(`${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const response = await result.json();
        let moreProducts = response.Products.results
        let filteredProducts = []
        moreProducts.forEach(async (e) => {
            let title = e.title
            let description = e.description
            let price = e.price
            let _id = e._id.toString()
            let code = e.code
            let status = e.status
            let category = e.category
            let product = { title, description, code, price, _id, category, status }
            filteredProducts.push(product)
        })
        printProducts(moreProducts)
    } catch (error) {
        error
    }
}

function printProducts(obj) {
    const productsToPrint = obj.map(
        (product) => `
        <p>ID: ${product.title}</p> 
        <p>Title: ${product.description}</p> 
        <p>Description: ${product.code}</p> 
        <p>Price: ${product.price}</p> 
        <p>Code: ${product.status}</p> 
        <p>Category: ${product.category}</p>
        <input type="submit" id="${product._id}" value="Agregar al carrito" />
        <p>----------------------------</p>
    `
    )
        .join(" ");
    moreProducts.innerHTML = productsToPrint;
}