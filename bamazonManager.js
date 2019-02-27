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
            if(res[i].stock_quantity < 5) {
                console.log('| ID: ' + res[i].item_id + ' | ' + 'Product: ' + res[i].product_name + ' | ' + 'Price: $' + res[i].price + ' | ' + 'Quantity: ' + res[i].stock_quantity + ' | ');
            }
        }
    });
}

function addInventory() {
    console.log('Let\'s fill \'er back up!');
    //   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
}

function newProduct() {
    console.log('Let\'s prepare a new listing...');
    //   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store
}



// * Create a new Node application called `bamazonManager.js`. Running this application will:

//   * List a set of menu options:

//     * View Products for Sale

//     * View Low Inventory

//     * Add to Inventory

//     * Add New Product

//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store