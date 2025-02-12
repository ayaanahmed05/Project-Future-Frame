import { randomUUID } from 'crypto';

import express from 'express';
import jwt from 'jsonwebtoken';

import { Order } from '../schemas/orderSchema';
import { User } from '../schemas/userSchema';

const router = express.Router();

/**
 * Create a market order
 * 
 * @param {string} side - "buy" or "sell"
 * @param {string} pair - currency pair (e.g. BTC/USD)
 * @param {number} quantity - quantity of the currency being bought/sold
 * @param {number} price - price of 1 unit of currency at the time of the order // TODO: get the price of the currency from exchange API\
 * 
 * @cookie token - JWT token
 */
router.post('/order/create/market', async (req: any, res: any) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { id: string; username: string, role: string };
    const userUuid = decoded.id;

    // TODO: get the price of the currency from exchange API
    const { side, pair, quantity, price } = req.body;

    const user = await User.findOne({ uuid: userUuid }) as { balance: number; holdings: { currency: string; quantity: number; averagePrice: number; value: number; }[]; };

    const cost = quantity * price; // cost of the order
    const bSufficientFunds: boolean = user.balance >= cost; // check if user has sufficient funds

    if (!bSufficientFunds) {
        return res.status(400).json({ error: "Insufficient funds" });
    }

    const base = pair.split('/')[0]; // currency being bought/sold
    // TODO: properly handle the quote currency (eg. if user isn't buying/selling USD)
    const quote = pair.split('/')[1]; // currency used to buy/sell

    let holdingExists = false; // check if user already has holdings of the currency in db

    // TODO handle different quote currencies
    user.holdings = user.holdings.map(holding => {
        if (holding.currency === base) {
            holdingExists = true;
            if (side === "buy") {
                holding.quantity += quantity;
                holding.value += cost;
                holding.averagePrice = (holding.averagePrice + price) / holding.quantity; // calculate new average price
                user.balance -= cost;
            } else if (side === "sell") {
                holding.quantity -= quantity;
                holding.value -= cost;
                if (holding.quantity === 0) {
                    holding.averagePrice = 0;
                } else {
                    // TODO: Verify against edge cases (e.g., very large/small quantities)
                    holding.averagePrice = ((holding.averagePrice * (holding.quantity - quantity)) + (price * quantity)) / holding.quantity;
                }
                user.balance += cost; 
            }
        }
        return holding;
    });

    // if user doesn't have a "waller" for the currency, create one
    if (!holdingExists) {
        if (side === "buy") {
            user.holdings.push({
                currency: base,
                quantity: quantity,
                averagePrice: price,
                value: cost
            });
            user.balance -= cost;
        } else if (side === "sell") {
            return res.status(400).json({ error: "You don't have any holdings to sell" });
        }
    }

    let uuid = randomUUID();
    while(await Order.findOne({ uuid })) { // prevent duplicate uuids
        uuid = randomUUID();
    }

    const order = new Order({
        uuid,
        userUuid,
        side,
        orderType: "market",
        pair,
        quantity,
        cost,
        price,
        filled: true
    });

    try {
        await order.save(); // store transaction
        await User.updateOne({ uuid: userUuid }, user); // update user's balance and holdings
        return res.status(200).json({ message: "Order created", order });
    } catch (err) {
        return res.status(500).json({ error: err });
    }
});

// TODO: add limit orders
// 1. store the limit order in the database with "pending" status
// 2. execute when market conditions match limit price
// 3. implement the buy/sell queue


export default router;