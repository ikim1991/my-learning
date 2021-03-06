import cors from 'cors';
import ApiError from '../error/ApiError.js';

const whitelist = new Set(['https://example.com'])
const corsConfig = {
    optionSuccessStatus: 200,
    origin: (origin, cb) => {
        if(whitelist.has(origin)){
            cb(null, true)
        } else{
            cb(ApiError.internal('Not allowed by CORS...'))
        }
    },
    methods: ['GET', 'POST'],
    credentials: true
}

export default cors(corsConfig);