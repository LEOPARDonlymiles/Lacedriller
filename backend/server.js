'use strict';

const express = require('express');
const admin = require('firebase-admin');
const Stripe = require('stripe');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const stripe = new Stripe('YOUR_STRIPE_SECRET_KEY');

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

// Middleware
app.use(bodyParser.json());

// User balance management with minimum activation requirement
const MINIMUM_ACTIVATION = 1000;

// Create a task
app.post('/tasks/create', async (req, res) => {
    const { userId, taskDetails } = req.body;
    const cost = 7000;
    const userRef = admin.firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists || userDoc.data().balance < cost) {
        return res.status(400).send('Insufficient balance for task creation.');
    }
    // Logic to create task...
    res.status(201).send('Task created successfully.');
});

// Complete a task
app.post('/tasks/complete', async (req, res) => {
    const { userId, taskId } = req.body;
    // Logic to mark task as complete...
    res.send('Task completed successfully.');
});

// User balance management
app.post('/users/balance', async (req, res) => {
    const { userId, amount } = req.body;
    const userRef = admin.firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists || userDoc.data().balance + amount < MINIMUM_ACTIVATION) {
        return res.status(400).send('Balance must be above minimum activation requirement.');
    }
    // Logic to update user balance...
    res.send('User balance updated successfully.');
});

// Stripe payment integration
app.post('/payment', async (req, res) => {
    const { amount, source } = req.body;
    try {
        const charge = await stripe.charges.create({
            amount:	amount,
            source,
            currency: 'usd'
        });
        res.send(charge);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
