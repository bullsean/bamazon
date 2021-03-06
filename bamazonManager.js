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
    console.log('Hello manager, welcome to Bamazon!')
    // run the start function after the connection is made to prompt the user
    choiceMenu();
});

var command = '';

function choiceMenu() {
    inquirer
        .prompt([
            {
                name: "commandOptions",
                type: "rawlist",
                message: "What would you like to do?",
                choices: [
                    'View Products for Sale',
                    'View Low Inventory',
                    'Add to Inventory',
                    'Add New Product'
                ]
            }
        ])
        .then(function (answer) {
            console.log(answer.commandOptions)
            command = answer.commandOptions
            //create a switch case based on the answer to run the different functions
            switch (command) {
                case 'View Products for Sale':
                    currentInventory();
                    break;
                case 'View Low Inventory':
                    lowInventory();
                    break;
                case 'Add to Inventory':
                    addInventory();
                    break;
                case 'Add New Product':
                    newProduct();
                    break;
            }
        });
}


function currentInventory() {
    console.log('Accessing the current product listings...');
    //   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log('| ID: ' + res[i].item_id + ' | ' + 'Product: ' + res[i].product_name + ' | ' + 'Price: $' + res[i].price + ' | ' + 'Quantity: ' + res[i].stock_quantity + ' | ');
        }
    });
}


function lowInventory() {
    console.log('Accessing current low inventory listings...');
    //   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log('| ID: ' + res[i].item_id + ' | ' + 'Product: ' + res[i].product_name + ' | ' + 'Price: $' + res[i].price + ' | ' + 'Quantity: ' + res[i].stock_quantity + ' | ');
            }
        }
    });
}

var answerQuant = '';
var productId = '';
var currentProduct = '';

function addInventory() {
    console.log('Let\'s fill \'er back up!');
    //   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
    currentInventory();
    inquirer
        .prompt([
            {
                name: "productAddId",
                type: "input",
                message: "Which product would you like to order inventory? (Please enter an ID)\n"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units would you like to restock?\n"
            },
        ])
        .then(function (answer) {
            connection.query(
                "SELECT * FROM products where ?",
                {
                    item_id: answer.productAddId
                },

                function (err, results) {
                    if (err) throw err;
                    answerQuant = parseInt(answer.quantity);
                    currentProduct = results[0].stock_quantity;
                    productId = answer.productAddId;
                    stockUpdate();

                }
            )
        });

}

function newProduct() {
    console.log('Let\'s prepare a new listing...');
    //   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store
    inquirer
        .prompt([
            {
                name: "productName",
                type: "input",
                message: "What's the name of the product you woud like to add to Bamazon stock?"
            },
            {
                name: "departmentName",
                type: "input",
                message: "Which department would you like this to be added to?"
            },
            {
                name: "price",
                type: "input",
                message: "What's the price per unit?"
            },
            {
                name: "stockQuantity",
                type: "input",
                message: "How many units would you like to stock?"
            },
        ]).then(function(answer) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.productName,
                    department_name: answer.departmentName,
                    price: answer.price,
                    stock_quantity: answer.stockQuantity
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " product inserted!\n");
                }
            );
        })
}

function stockUpdate() {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: (currentProduct + answerQuant)
            },
            {
                item_id: productId
            }
        ],

        function (err, results) {
            if (err) throw err;
            console.log("Stock has been updated.")
            currentInventory();
        }
    )
}