const mongoose = require('mongoose');
const { type } = require('os');
const { title } = require('process');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    text: { type: String, required: true },
    amount: { type: Number, required: true },
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema, "transactions");

module.exports = Transaction;