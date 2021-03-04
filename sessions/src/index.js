import express from 'express';
import router from './routes/router.js';
import sess from './middleware/sess.js';
import cors from './middleware/cors.js';


const app = express();

// if running behind a proxy (e.g. nginx)
// app.set('trust proxy', 1)

// Setup CORS logic
app.options('*', cors)
app.use(cors)

// JSON Parse
app.use(express.json())

// Session Middleware
app.use(sess)

// Routes
app.use(router)

app.listen(3001, () =>{
    console.log("Server running on PORT 3001...")
})