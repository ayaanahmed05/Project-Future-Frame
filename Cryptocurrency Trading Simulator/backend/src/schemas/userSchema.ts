import { Schema, model } from 'mongoose';

import { holdingSchema } from './holdingSchema';

export const userSchema = new Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    holdings: {
        type: [holdingSchema], // array of holdings (currencies)
        required: true
    },
    schemaVersion: { // development purposes
        type: Number,
        required: true
    }
});

export const User = model('User', userSchema);