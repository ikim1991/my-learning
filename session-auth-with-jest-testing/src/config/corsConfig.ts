
import { CorsOptions } from 'cors'
import ApiError from '../error/ApiError'

const whitelist = new Set(['https://example.com', 'https://example2.com'])
const corsConfig:CorsOptions = {
    origin: (origin, cb) => {
        if(whitelist.has(origin!)){
            cb(null, true)
        } else{
            cb(ApiError.internal('Not Allowed by CORS'))
        }
    },
    methods: ['GET', 'POST'],
    credentials: true

}

export default corsConfig;