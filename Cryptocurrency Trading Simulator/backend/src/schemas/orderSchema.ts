import { Schema, model } from 'mongoose';

export const orderSchema = new Schema({
    uuid: {
        type: String,
        required: true
    },
    userUuid: {
        type: String,
        required: true
    },
    side: { // buy or sell
        type: String,
        required: true
    },
    orderType: { // market orders for now TODO: add limit orders
        type: String,
        required: true
    },
    pair: { // pairs are the two cryptocurrencies that are being traded (e.g. BTC/USD)
        type: String,
        required: true
    },
    quantity: { 
        type: Number,
        required: true
    },
    cost: { // cost of the order (quantity * price)
        type: Number,
        required: true
    },
    price: { // price of the currency at the time of the order
        type: Number,
        required: true
    },
    filled: {
        type: Boolean,
        required: true
    },
    date: {
        type: { type: Date, default: Date.now }
    }
});

export const Order = model('Order', orderSchema);