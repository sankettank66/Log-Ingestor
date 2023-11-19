const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGO_URI,{ useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true});

const logSchema = new mongoose.Schema({
    level: String,
    message: String,
    resourceId: String,
    timestamp: Date,
    traceId: String,
    spanId: String,
    commit: String,
    metadata: {
        parentResourceId: String,
    },
});

const Log = mongoose.model('Log', logSchema);

app.get('/logs',async (req, res) => {
try {
    const logs = await Log.find();
    res.status(200).json(logs);
} catch (error) {
    console.error(error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
}
}
);
// Ingest logs endpoint
app.post('/logs', async (req, res) => {
    try {
        let newLog = new Log(req.body);
        await newLog.save();
        res.status(201).json({ message: 'Log ingested successfully' });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});