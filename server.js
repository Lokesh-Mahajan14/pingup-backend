import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';

import { inngest, functions } from './inngest/index.js';
import { serve } from 'inngest/express';

const app = express();

// Connect DB
await connectDB();

app.use(express.json());
app.use(cors());

// Health check
app.get('/', (req, res) => res.send('server is running'));

// Inngest route (FIXED)
app.use('/inngest', serve({ client: inngest, functions }));
// or: app.use('/api/inngest', ...)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
