const productsList = document.getElementById("productsList")
let products = []

async function getAllProducts() {
    console.log("getall");
    try {
        const response = await fetch("http://localhost:8080/api/products");
        const responseJson = await response.json();
        products = [...responseJson.Products];
        const prodMap = products
            .map((objMessage) => `<p>${objMessage.title}: $${objMessage.price}</p>`)
            .join(" ");
        productsList.innerHTML = prodMap;
    } catch (error) {
        error
    }
}
getAllProducts()