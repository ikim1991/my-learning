import { getRocketById, getRockets } from "../service/rockets.js"
export const multipleCache = async (req, res, next) => {
    
    const reply = await getRockets()
    
    if(reply){
        console.log('Fetching Rockets from Cache...')
        return res.status(204).send(reply)
    }

    next()
}

export const singleCache = async (req, res, next) => {
    
    const { id } = req.params

    const reply = await getRocketById(id)
    
    if(reply){
        console.log('Fetching Rocket from Cache...')
        return res.status(204).send(reply)
    }

    next()
}