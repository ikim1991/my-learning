import cors from 'cors';

const whitelist = new Set(['https://example1.com', 'https://example2.com'])
const corsConfig = {
    optionSuccessStatus: 200,
    origin: (origin, cb) => {
        if(whitelist.has(origin)){
            cb(null, true)
        } else{
            cb(new Error("Not allowed by CORS"))
        }
    },
    credentials: true // Allows Cookies to be accepted from Cross Origin Domains. Sets Access-Control-Allow-Credentials header to true
}

export default cors(corsConfig);