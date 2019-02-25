DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('laptop', 'Electronics', 750, 5)
, ('diapers', 'Baby', 35, 100)
, ('books', 'Home', 10, 1000)
, ('earrings', 'Jewelery', 5, 50)
, ('nintendo', 'Electronics', 150, 17)
, ('formula', 'Baby', 18, 3000)
, ('dining table', 'Home', 500, 2)
, ('rolex', 'Jewelery', 240, 240)
, ('speaker', 'Electronics', 300, 90)
, ('diaper bag', 'Baby', 24, 330)
, ('bed sheets', 'Home', 50, 60)
, ('engagement ring', 'Jewelery', 10000, 1);

SELECT * FROM products;