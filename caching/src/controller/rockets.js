import fetch from 'node-fetch';
import { setRocketById, setRockets } from '../service/rockets.js';

export const fetchRocketsController = async (req, res, next) => {
    try{

        console.log('Fetching Rockets from API...')
        const response = await fetch(`https://api.spacexdata.com/v3/rockets`)
        const data = await response.json()

        setRockets(data)

        return res.send(data)
        
    } catch(err){
        console.error(err)
    }
}

export const fetchOneRocketController = async (req, res, next) => {
    try{
        const { id } = req.params

        console.log('Fetching New Rocket from API...')
        const response = await fetch(`https://api.spacexdata.com/v3/rockets/${id}`)
        const data = await response.json()

        setRocketById(id, data)

        return res.send(data)


    } catch(err){
        console.error(err)
    }
}