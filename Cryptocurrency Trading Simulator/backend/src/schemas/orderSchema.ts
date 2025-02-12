import {Schema, model} from 'mongoose';

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
        enum: ['buy', 'sell'],
        required: true
    },
    orderType: { // market orders for now TODO: add limit orders -> COMPLETED but check over
        type: String,
        enum: ['market', 'limit'],
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
        required: function (this: any) { return this.orderType === 'market'; }
    },
    price: { // price of the currency at the time of the order
        type: Number,
        required: function(this: any) { return this.orderType === 'limit'; }
    },
    filled: { // market order execute immediately
        type: Boolean,
        default: function (this:any) { return this.orderType === 'market'; }
    },
    status: { // tracks whether order is still active or completed (pending, filled, or canceled for limit orders)
        type: String,
        enum: ['pending', 'filled', 'canceled'],
        default: function (this:any) { return this.orderType === 'market' ? 'filled' : 'pending'; }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const Order = model('Order', orderSchema);