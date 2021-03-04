import { userLogin } from '../service/auth.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Perform payload validation (validation libary - joi)
    if(!email || !password){
        return res.status(400).json('Bad Request - Must provide email and password...')
    }

    // check credentials
    try{
        const user = await userLogin(email, password)
        req.session.user = user;
        res.sendStatus(204);
    } catch(err){
        // Do not use console.log or console.error in production. Sync will slow down performance (Logging libary - winston)
        console.error(err)
        res.status(401).json(err)
    }
}

export const profile = (req, res) => {
    res.json(req.session)
}