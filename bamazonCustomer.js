var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "$eaN3119",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connection is good.')
    // run the start function after the connection is made to prompt the user
    currentInventory();
});

function currentInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log('| ID: ' + res[i].item_id + ' | ' + 'Product: ' + res[i].product_name + ' | ' + 'Price: $' + res[i].price + ' | ');
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
                        purchase();
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
            console.log('Updated quantity');
            purchase();
        }
    );
}

// 5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.