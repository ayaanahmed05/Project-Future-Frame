import mongoose from 'mongoose';

import app from './app';

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.log("Error connecting to MongoDB", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
});

app.listen(1337, () => {
    console.log('Server is running on port 1337');
});