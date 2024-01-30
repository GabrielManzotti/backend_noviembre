const error = document.getElementById("error")
const getOrders = document.getElementById("getOrders")


const validaDate = (obj) => {
    if ((!obj.since) || (!obj.to)) {
        return false
    } else {
        return true
    }
}

getOrders.onsubmit = (e) => {
    e.preventDefault()
    let dates = {
        since: document.getElementById("since").value,
        to: document.getElementById("to").value
    }
    console.log(dates);
    if (validaDate(dates)) {
        getAmountOrders(dates)
    } else {
        error.innerHTML = "<p>some data is missing</p>"
    }
}

async function getAmountOrders(obj) {
    try {
        const result = await fetch(`http://localhost:8080/api/orders/stadistics/totalAmountOrders/since/${obj.since}/to/${obj.to}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const response = await result.json();
        error.innerHTML = `The total amount orders is $${response.Total.toLocaleString()}`
    } catch (error) {
        error
    }
}