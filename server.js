/* =========================================================
   CART RESCUE AI - BACKEND NODE.JS SERVER
   File: server.js
========================================================= */

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-Memory Database Fallback for Local Dev & Real-Time Sync
const database = {
    otpSessions: new Map(),
    orders: [],
    abandonedCarts: [
        {
            id: "CR-10001",
            name: "Aarav Sharma",
            email: "aarav.sharma@example.com",
            product: "Premium Wireless Headphones",
            category: "Electronics",
            value: 12999,
            risk: 92,
            riskLevel: "high",
            reason: "Payment failure",
            device: "Mobile",
            channel: "WhatsApp",
            status: "At Risk",
            lastActivity: "2 min ago",
            recommendation: "Send payment recovery link"
        },
        {
            id: "CR-10002",
            name: "Priya Reddy",
            email: "priya.reddy@example.com",
            product: "Designer Handbag",
            category: "Fashion",
            value: 8499,
            risk: 84,
            riskLevel: "high",
            reason: "High shipping cost",
            device: "Desktop",
            channel: "Email",
            status: "At Risk",
            lastActivity: "4 min ago",
            recommendation: "Offer free shipping"
        }
    ],
    aiDecisionsCount: 128640,
    savedRevenue: 26840000
};

/* =========================================================
   01. HEALTH CHECK & API STATUS
========================================================= */
app.get("/api/health", (req, res) => {
    res.json({
        status: "online",
        system: "Cart Rescue AI Backend Service",
        timestamp: new Date().toISOString(),
        version: "1.0.0",
        database: {
            activeCarts: database.abandonedCarts.length,
            ordersCount: database.orders.length
        }
    });
});

/* =========================================================
   02. AUTHENTICATION & EMAIL VERIFICATION CODE (OTP) ROUTE
========================================================= */
app.post("/api/auth/send-code", (req, res) => {
    const { email, name } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Work email is required." });
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    database.otpSessions.set(email, {
        code,
        name: name || email.split("@")[0],
        expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    console.log(`[AUTH] Verification code for ${email}: ${code}`);

    res.json({
        success: true,
        message: `Verification code sent to ${email}`,
        demoCode: code
    });
});

app.post("/api/auth/verify-code", (req, res) => {
    const { email, code } = req.body;
    const session = database.otpSessions.get(email);

    if (!session) {
        return res.status(400).json({ error: "Verification code expired or not requested." });
    }

    if (session.code !== code) {
        return res.status(400).json({ error: "Invalid verification code. Please check your email." });
    }

    database.otpSessions.delete(email);

    res.json({
        success: true,
        user: {
            name: session.name,
            email: email,
            role: "Enterprise Admin",
            authenticatedAt: new Date().toISOString()
        },
        token: `cr_token_${Date.now()}`
    });
});

/* =========================================================
   03. CHECKOUT & ORDERS ROUTE
========================================================= */
const createCheckoutSessionHandler = require("./api/create-checkout-session.js");
app.post("/api/create-checkout-session", async (req, res) => {
    if (process.env.STRIPE_SECRET_KEY) {
        try {
            return await createCheckoutSessionHandler(req, res);
        } catch (e) {
            console.warn("[CHECKOUT] Stripe API call failed, falling back to local backend checkout:", e.message);
        }
    }

    // Local Backend Real-Time Checkout Fallback
    const cart = Array.isArray(req.body?.cart) ? req.body.cart : [];
    if (!cart.length) {
        return res.status(400).json({ error: "Cart is empty." });
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderId = `CR-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    database.orders.push({
        id: orderId,
        email: req.body?.email || "customer@example.com",
        total_inr: total,
        status: "paid",
        items: cart,
        createdAt: new Date().toISOString()
    });

    res.json({
        success: true,
        orderId,
        total,
        message: "Order created successfully on Cart Rescue AI backend!"
    });
});

/* =========================================================
   04. REAL-TIME CART ABANDONMENT & RECOVERY EVENTS ROUTE
========================================================= */
app.get("/api/events/abandoned", (req, res) => {
    res.json({
        success: true,
        count: database.abandonedCarts.length,
        customers: database.abandonedCarts
    });
});

app.post("/api/events/abandon", (req, res) => {
    const customer = req.body;
    if (!customer || !customer.name) {
        return res.status(400).json({ error: "Customer data required." });
    }

    const newEvent = {
        id: customer.id || `CR-${Math.floor(10000 + Math.random() * 90000)}`,
        name: customer.name,
        email: customer.email || "customer@example.com",
        product: customer.product || "AeroSound Pro",
        category: customer.category || "Electronics",
        value: Number(customer.value) || 12999,
        risk: customer.risk || 88,
        riskLevel: customer.riskLevel || "high",
        reason: customer.reason || "Payment intent drop",
        device: customer.device || "Mobile",
        channel: customer.channel || "WhatsApp",
        status: "At Risk",
        lastActivity: "Just now",
        recommendation: customer.recommendation || "Send instant 10% WhatsApp promo link"
    };

    database.abandonedCarts.unshift(newEvent);
    database.aiDecisionsCount++;

    console.log(`[EVENT] Cart Abandonment recorded for ${newEvent.name} (Value: ₹${newEvent.value})`);

    res.json({
        success: true,
        event: newEvent,
        totalAbandoned: database.abandonedCarts.length
    });
});

/* =========================================================
   05. AI STRATEGY GENERATION BACKEND ROUTE
========================================================= */
app.post("/api/ai/generate-recovery", (req, res) => {
    const { tone, channel, customerName, product } = req.body;
    const name = customerName || "Valued Customer";
    const prod = product || "your saved item";

    let template = "";
    if (channel === "WhatsApp") {
        template = `👋 Hi ${name}! We noticed you left ${prod} in your cart. Complete your order in the next 15 minutes to claim an exclusive 10% discount + Free Express Shipping! Click here to complete order: https://cartrescue.ai/pay`;
    } else if (channel === "SMS") {
        template = `Cart Rescue Alert: Hi ${name}, ${prod} is selling fast! Use promo code RESCUE10 at checkout to save 10%. Complete order now: https://cartrescue.ai/pay`;
    } else {
        template = `Subject: Don't miss out on ${prod}!\n\nHi ${name},\n\nWe noticed you left ${prod} in your cart. Items in your cart are in high demand and reserved for a limited time.\n\nEnjoy an exclusive 10% off your purchase with code SAVE10 at checkout.\n\nClick here to resume your order: https://cartrescue.ai/checkout`;
    }

    res.json({
        success: true,
        tone: tone || "Urgent & High Converting",
        channel: channel || "Email",
        template
    });
});

// Serve Static Web Frontend Files
app.use(express.static(path.join(__dirname)));

// Fallback to index.html for SPA page routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 CART RESCUE AI BACKEND SERVER IS RUNNING!`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log(`⚡ API Health: http://localhost:${PORT}/api/health`);
    console.log(`=================================================`);
});
