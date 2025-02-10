import { Schema, model } from 'mongoose';

export const holdingSchema = new Schema({
    currency: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    averagePrice: { // average price of the currency at the time of purchase
        type: Number,
        required: true
    },
    value: { // value of the holding in USD (average price * quantity)
        type: Number,
        required: true
    }
});
