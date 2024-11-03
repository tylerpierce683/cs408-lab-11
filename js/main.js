document.getElementById("load-data").onclick = function () {
    let lambda = document.getElementById("data-table");
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
        lambda.innerHTML = "<tr><th>ID</th><th>Name</th><th>Price</th><th>Action</th></tr>";
        if (xhr.status !== 200) {
            lambda.innerHTML += "<tr><td>Error loading data</td></tr>";
        } else if (xhr.response === "[]") {
            lambda.innerHTML += "<tr><td>No data found</td><td>No data found</td><td>No data found</td><td>No data found</td></tr>";
        } else {
            var dataList = JSON.parse(xhr.response);
            for (var i = 0; i < dataList.length; i++) {
                var object = dataList[i];
                var tableRow = "<tr><td>" + object.id + "</td>";
                tableRow += "<td>" + object.name + "</td>";
                tableRow += "<td>" + object.price + "</td>";
                tableRow += "<td><button onclick='deleteItem(" + object.id + ")'>Delete</button></td></tr>";
                lambda.innerHTML += tableRow;
            }
        }
    });
    xhr.open("GET", "https://vsntawrfq9.execute-api.us-east-2.amazonaws.com/items");
    xhr.send();
}

function deleteItem(id) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "https://vsntawrfq9.execute-api.us-east-2.amazonaws.com/items/" + id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

document.getElementById("add-item").onclick = function () {
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://vsntawrfq9.execute-api.us-east-2.amazonaws.com/items");
    xhr.setRequestHeader("Content-Type", "application/json");
    var id = document.getElementById("id-field").value;
    var price = document.getElementById("price-field").value;
    var name = document.getElementById("name-field").value;
    xhr.send(JSON.stringify({
        "id": id,
        "price": price,
        "name": name
    }));
}
