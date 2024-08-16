import express from 'express';
import { setupBullMQ } from './taskScheduler';

const app = express();
const PORT = process.env.PORT || 3000;

// Start the task scheduler
setupBullMQ();

app.get('/', (req, res) => {
    res.send('Email automation tool is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

