import mongoose from 'mongoose';
import config from '../config';

mongoose.connect(
    config.mongoose.uri,
    config.mongoose.options
)

mongoose.connection.on('open', () => {
    console.log('Connected to MongoDB...')
})

mongoose.connection.on('error', err => {
    console.error(`${err.name} - ${err.message}`)
})