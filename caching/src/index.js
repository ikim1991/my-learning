import express from 'express';
import rocketsRouter from './routers/rockets.js';
import responseTime from 'response-time';

const app = express()

app.use(responseTime())
app.use(express.json())
app.use(rocketsRouter)


app.listen(3001, () => {
    console.log('Running on PORT 3001...')
})