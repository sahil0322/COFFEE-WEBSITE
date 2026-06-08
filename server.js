require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Using the Stripe secret key you found!
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// CRITICAL: This line allows your server to read JSON data sent from your frontend cart!
app.use(express.json());

// 1. Database Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('🔥 Successfully connected to MongoDB Atlas!'))
    .catch((error) => console.error('❌ Error connecting to database:', error));

// 2. Define the Product Schema (The Blueprint)
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    desc: String,
    img: String
});

// Create the Model
const Product = mongoose.model('Product', productSchema);

// 3. The Seed Data (Our starting menu)
const initialProducts = [
    {
        name: "Aura House Blend",
        price: 16.00,
        desc: "Our balanced, everyday blend. Notes of milk chocolate, citrus, and toffee.",
        img: "https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg"
    },
    {
        name: "Seasonal Single Origin",
        price: 18.50,
        desc: "Currently: Ethiopia Yirgacheffe. Bright, floral, and tea-like.",
        img: "https://i.pinimg.com/736x/ff/8c/eb/ff8ceb124036a9176942a4101e1a50ab.jpg"
    },
    {
        name: "Aura Beans Mug",
        price: 22.00,
        desc: "12oz ceramic mug. Minimalist design to start your day right.",
        img: "https://images.unsplash.com/photo-1625242662341-5e92c5101338?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29sZCUyMGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        name: "Pour Over Kit",
        price: 45.00,
        desc: "Everything you need to start brewing: dripper, filters, and a guide.",
        img: "https://source.unsplash.com/random/400x400/?coffee,filter"
    }
];

// 4. Seeding Function (Runs automatically when server starts)
async function seedDatabase() {
    try {
        const count = await Product.countDocuments();
        
        if (count === 0) {
            console.log("📦 Database is empty. Uploading initial products...");
            await Product.insertMany(initialProducts);
            console.log("✅ Products successfully uploaded to the cloud!");
        } else {
            console.log(`☕ Database already has ${count} products. Ready to serve.`);
        }
    } catch (error) {
        console.error("Error seeding database:", error);
    }
}

// Run the seed function
seedDatabase();

// Tell Express to serve the public folder
app.use(express.static('public'));

// 5. The Updated API Endpoint for pulling products
app.get('/api/products', async (req, res) => {
    try {
        const productsFromCloud = await Product.find();
        res.json(productsFromCloud);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products from database" });
    }
});

// 6. NEW: The Stripe Checkout Endpoint
app.post('/create-checkout-session', async (req, res) => {
    try {
        // Grab the cart array sent from the frontend
        const { cart } = req.body; 

        // Convert your cart format into Stripe's required format
        const lineItems = cart.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: { name: item.name },
                // Stripe requires the price in CENTS, so we multiply by 100
                unit_amount: Math.round(item.price * 100), 
            },
            quantity: 1, 
        }));

        // Tell Stripe to create a secure checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            // Where to send the user after paying (or cancelling)
            success_url: `http://localhost:${PORT}/?success=true`,
            cancel_url: `http://localhost:${PORT}/?canceled=true`,
        });

        // Send the secure Stripe URL back to the frontend
        res.json({ url: session.url });

    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 SIGMAA Beans server is running live at http://localhost:${PORT}`);
});