# SIGMAA Beans - E-Commerce Platform

SIGMAA Beans is a full-stack, responsive e-commerce web application built for an artisanal coffee shop.  
The application allows users to browse coffee products, add items to a shopping cart, view cart totals, and complete checkout using Stripe.

This project was built to practice full-stack web development, database integration, REST API development, and payment gateway integration.

---

## Features

### Dynamic Product Menu

Products are fetched from a MongoDB Atlas cloud database through a REST API.  
This makes the product menu dynamic and allows product data to be managed from the database instead of being hardcoded in the frontend.

### Interactive Shopping Cart

The application includes a custom shopping cart built using Vanilla JavaScript.

The cart supports:

- Adding products to the cart
- Updating item quantities
- Removing items from the cart
- Calculating subtotal and total price
- Dynamically updating the UI based on cart changes

### Secure Checkout

Stripe API is integrated to create secure checkout sessions for payment processing.  
The backend handles checkout session creation and redirects the user to Stripe Checkout.

### Responsive Design

The frontend is built using HTML5, CSS3, Flexbox, and CSS Grid.  
The layout is responsive and works across desktop, tablet, and mobile screen sizes.

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript ES6+

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Payments

- Stripe API

---

## Project Structure

```bash
sigmaa-beans/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── models/
│   └── Product.js
│
├── routes/
│   └── productRoutes.js
│
├── server.js
├── package.json
├── .env
└── README.md
```

---

## How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/sahil0322/sigmaa-beans.git
cd sigmaa-beans
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env` file in the root folder of the project.

Add the following environment variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_test_key
```

### 4. Start the Server

```bash
node server.js
```

### 5. Open in Browser

Open the following URL in your browser:

```bash
http://localhost:3000
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port number on which the server runs |
| `MONGO_URI` | MongoDB Atlas database connection string |
| `STRIPE_SECRET_KEY` | Stripe secret key used for checkout payment sessions |

---

## API Overview

### Product API

The backend provides API routes to fetch product data from MongoDB.

Example:

```bash
GET /api/products
```

This route returns the list of available coffee products stored in the database.

### Checkout API

The backend creates a Stripe checkout session for payment processing.

Example:

```bash
POST /create-checkout-session
```

This route sends cart data to the backend and creates a Stripe checkout session.

---

## What I Learned

Through this project, I learned and practiced:

- Building a full-stack web application
- Creating a backend server using Node.js and Express.js
- Connecting MongoDB Atlas with an Express application
- Using Mongoose for database models
- Creating REST API routes
- Fetching dynamic product data on the frontend
- Managing shopping cart state using Vanilla JavaScript
- Integrating Stripe Checkout for payments
- Building responsive layouts using CSS Grid and Flexbox
- Using environment variables to protect sensitive keys

---

## Future Improvements

- Add user authentication and login system
- Add admin dashboard for managing products
- Add product search and filtering
- Add order history for users
- Add product image upload feature
- Add loading states and better error handling
- Deploy the application online

---

## Author

**Sahil Kapse**

- GitHub: [sahil0322](https://github.com/sahil0322)
- Email: sahilkapse139@gmail.com

---

## Status

This project is functional and can be improved further with authentication, admin features, and deployment.
