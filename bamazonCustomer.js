var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Welcome to Bamazon! Take a look at our inventory below.')
    // run the start function after the connection is made to prompt the user
    currentInventory();
});

function currentInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            if(res[i].stock_quantity > 0) {
                console.log('| ID: ' + res[i].item_id + ' | ' + 'Product: ' + res[i].product_name + ' | ' + 'Price: $' + res[i].price + ' | ');
            } else {
                console.log('| ID: ' + res[i].item_id + ' | ' + 'Product: ' + res[i].product_name + ' | ' + 'Price: $' + res[i].price + ' | ' + '(*Currently out of stock. Check back later.)');
            }
        }

        purchase();
    });

}

var answerQuant = '';
var remainingStock = 0;
var productId = '';

function purchase() {
    inquirer
        .prompt([
            {
                name: "productPurchaseId",
                type: "input",
                message: "Which product would you like to purchase? (Please enter an ID)"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units would you like to purchase?"
            },
        ])
        .then(function (answer) {
            // using id, compare the quantity of database to the quantity entered, if quantity entered is less than quantity of database then run calculation
            connection.query(
                "SELECT * FROM products where ?",
                {
                    item_id: answer.productPurchaseId
                },

                function (err, results) {
                    if (err) throw err;
                    // console.log(results[0].stock_quantity)
                    // console.log(parseInt(answer.quantity))
                    answerQuant = parseInt(answer.quantity);
                    remainingStock = results[0].stock_quantity - answerQuant;
                    productId = answer.productPurchaseId;

                    if (answerQuant <= results[0].stock_quantity) {
                        console.log('Great! We are happy for your purchase. Fetching your total...')
                        //update quantity in database
                        stockUpdate();
                        //do calculation to determine how much money it will cost.
                        console.log('You\'re total will be: $' + (answerQuant * results[0].price))

                        // if the quantity entered is more than the quantity in database return the message
                    } else {
                        console.log('Oops, it looks like we don\'t have enough. We apologize for the inconvenience.\n\n\n');
                        currentInventory();
                    }
                }
            )
        });
}

function stockUpdate() {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: (remainingStock)
            },
            {
                item_id: productId
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log('\n\n\n');
            currentInventory();
        }
    );
}
