
const authenticate = (req, res, next) => {
    if(!req.session){
        const err = new Error('You shall not pass...')
        err.statusCode = 401
        next(err)
    }

    next()
}

export default authenticate;