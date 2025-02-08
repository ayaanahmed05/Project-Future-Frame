import { Schema, model } from 'mongoose';

// TODO: change to uuids
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
    schemaVersion: { // development purposes
        type: Number,
        required: true
    }
});

export const User = model('User', userSchema);