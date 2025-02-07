import { Schema, model } from 'mongoose';

// TODO: change to uuids
export const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    schemaVersion: {
        type: Number,
        required: true
    }
});

export const User = model('User', userSchema);