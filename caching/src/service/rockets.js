import { response } from "express"
import { GET_ASYNC, SET_ASYNC } from "../model/rocket.js"

export const setRockets = async (rockets) => {
    try{
        await SET_ASYNC('rockets', JSON.stringify(rockets), 'EX', 10)
        console.log("New Rockets Cached...")

    } catch(err){
        console.error(err)
    }
}

export const getRockets = async () => {
    try{
        const results = await GET_ASYNC('rockets')

        return results

    } catch(err){
        console.error(err)
    }
}

export const setRocketById = async (id, rocket) => {
    try{
        await SET_ASYNC(id, JSON.stringify(rocket), 'EX', 10)
        console.log('New Rocket Cached...')

    } catch(err){
        console.error(err)
    }
}

export const getRocketById = async (id) => {
    try{
        const results = await GET_ASYNC(id)

        return results
    } catch(err){
        console.error(err)
    }
}