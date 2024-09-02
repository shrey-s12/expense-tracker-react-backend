const express = require('express');
const app = express();
const port = 3010;
const mongoose = require('mongoose');
const Transaction = require('./models/etrModel');

const cors = require('cors');
app.use(cors()); // This allows all origins. Configure as needed.

const USER_NAME = "shreys12";
const PASSWORD = "Shrey1210";
const DB_NAME = "expenseTrackerDB";

const dbURI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.lidry.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mernCluster`;

const promObj = mongoose.connect(dbURI);
promObj.then((result) => {
    app.listen(port, (req, res) => {
        console.log(`Server is listen on port no.: ${port}`);
    });
})
    .catch((error) => {
        console.log("Failed to connect to database", error);
        process.exit(1);
    })

app.get('/', (req, res) => {
    res.send("Hello Shrey!");
});

app.get('/transaction', (req, res) => {
    Transaction.find().sort({ _id: -1 })
        .then((etr) => {
            res.send(etr);
        })
        .catch((error) => {
            res.status(404).send("Error");
        })
});

app.use(express.json());
app.post('/transaction', (req, res) => {
    const text = req.body.text;
    const amount = Number(req.body.amount);
    Transaction.create({ text, amount })
        .then(() => {
            res.send("New blog added");
        })
        .catch((error) => {
            res.status(404).send(error);
        })
});

app.delete('/transaction/id/:id', (req, res) => {
    const etr = req.params.id;
    Transaction.findByIdAndDelete(etr)
        .then((result) => {
            if (result) {
                res.status(200).send("Blog Delete Successfully");
            } else {
                res.status(404).send("Transaction not found");
            }
        })
        .catch((error) => {
            res.status(404).send(error);
        })
});

app.use((req, res) => {
    res.status(404).render('error', { title: 'Error' });
});
