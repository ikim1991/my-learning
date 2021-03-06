import ApiError from './ApiError.js';

const apiErrorHandler = (err, req, res, next) => {
    console.error(`${err.code}: ${err.message}`)

    if(err instanceof ApiError){
        return res.status(err.code).send({ error: err.message })
    }

    res.status(500).send({ error: 'Something went wrong...' })
}

export default apiErrorHandler