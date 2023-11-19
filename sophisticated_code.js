/**
 * filename: sophisticated_code.js
 * This code is a demonstration of a sophisticated and complex JavaScript program.
 * It simulates a virtual online marketplace, including products, users, and transactions.
 * The program utilizes various advanced concepts such as classes, inheritance, closures, and async/await.
 */

class Product {
  constructor(name, price, stock) {
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  getDetails() {
    return `${this.name} - $${this.price}, Stock: ${this.stock}`;
  }

  sell(quantity) {
    if (this.stock >= quantity) {
      this.stock -= quantity;
      console.log(`${quantity} ${this.name}(s) sold successfully.`);
    } else {
      console.log(`Only ${this.stock} ${this.name}(s) available.`);
    }
  }
}

class Electronics extends Product {
  constructor(name, price, stock, brand) {
    super(name, price, stock);
    this.brand = brand;
  }

  getDetails() {
    return `${super.getDetails()}, Brand: ${this.brand}`;
  }
}

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
    this.cart = [];
  }

  addToCart(product, quantity) {
    this.cart.push({ product, quantity });
    console.log(`${quantity} ${product.name}(s) added to ${this.username}'s cart.`);
  }

  async checkout() {
    console.log(`Processing the cart for ${this.username}...`);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    for (const item of this.cart) {
      item.product.sell(item.quantity);
    }

    console.log(`${this.username}'s cart has been successfully processed.`);
    this.cart = [];
  }
}

// Demo code
console.log("Welcome to our virtual online marketplace!");

const product1 = new Product("Book", 10, 20);
const product2 = new Electronics("Smartphone", 500, 5, "Apple");

console.log(product1.getDetails());
console.log(product2.getDetails());

const user1 = new User("JohnDoe", "johndoe@example.com");
const user2 = new User("JaneSmith", "janesmith@example.com");

user1.addToCart(product1, 2);
user2.addToCart(product2, 1);

user1.addToCart(product2, 2);
user2.addToCart(product1, 1);

user1.checkout();
user2.checkout();

console.log("Thank you for shopping with us!");