import express from 'express';
import middleware from './middleware';
import routes from './router';
import './db/mongoose';

const app = express()

// CORS Middleware
app.use(middleware.cors)

// JSON Parse Middleware
app.use(express.json())

// Sessions Middleware
app.use(middleware.session)

// User Router
app.use(routes.user)

// Error Handling Middleware
app.use(middleware.error)

export default app;