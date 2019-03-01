# bamazon

Utilizing a combination of `MySQL` and `node`, this app will take in orders from customers and deplete stock from the Bamazon store's inventory.

Bamazon store managers will also be able to track their inventory, add to it, and create new listings in the Bamazon store.

To run this app, you'll need to utilize SQL database, node, and the MySQL and Inquirer packages of node.

## Take a look at the customer experience!

First, your customer will be given an option of stock to buy, along with the amount. Their total will be displayed and a confirmation message will be sent:

![Customer View 1](https://github.com/bullsean/bamazon/blob/master/assets/images/Capture%201%20customer.JPG?raw=true)


In the case that a customer request is unfillable, they will be given a message demonstrating that the stock is unavailable.

![Customer View 2](https://github.com/bullsean/bamazon/blob/master/assets/images/Capture%202%20customer.JPG?raw=true)


After stock is below '0' customers will still be able to view the stock listing, however, an additional message will be displayed to the right indicating '*Currently out of stock. Sorry for the inconvenience.'

![Customer View 3](https://github.com/bullsean/bamazon/blob/master/assets/images/Capture%203%20customer.JPG?raw=true)

## And as for managers...

When a manager logs in, they will be given a list of 4 choices: View Products for Sale, View Low Inventory, Add to Inventory, Add New Product.

![Manager View 1](https://github.com/bullsean/bamazon/blob/master/assets/images/Capture%201%20Manager.JPG?raw=true)

Selection 1: View Products for Sale

![Manager View 2](https://github.com/bullsean/bamazon/blob/master/assets/images/Capture%202%20Manager.JPG?raw=true)

Selection 2: View Low Inventory (any stock below 5)

![Manager View 3](https://github.com/bullsean/bamazon/blob/master/assets/images/Capture%203%20Manager.JPG?raw=true)

Selection 3: Add to Inventory - select your product and how much you would like to reorder.

![Manager View 4](https://github.com/bullsean/bamazon/blob/master/assets/images/Capture%204%20Manager.JPG?raw=true)

Selection 4: Add New Product - create your new listing in a few simple steps...

![Manager View 5](https://github.com/bullsean/bamazon/blob/master/assets/images/Capture%205%20Manager.JPG?raw=true)
