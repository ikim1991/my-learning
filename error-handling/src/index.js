import express from 'express';
import apiErrorHandler from './error/handler.js';
import cors from './mw/cors.js';
import sessions from './mw/sessions.js';
import userRouter from './router/user.js';

const app = express()

// CORS Check Middleware
app.options('*', cors)
app.use(cors)

// JSON Parse Middleware
app.use(express.json());

// Sessions Middleware
app.use(sessions)

// Routers Middleware
app.use(userRouter)

// Error Handler
app.use(apiErrorHandler)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})

