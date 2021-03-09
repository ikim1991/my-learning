import ApiError from "../error/ApiError";
import { GET_ASYNC } from "../model/cache";


const cache = {
    checkSessionCache: async (sessionId: string) => {
        try{

            const id = `sess:${sessionId}`

            const session = await GET_ASYNC(id)

            if(!session){
                return ApiError.unauthorized('Unauthorized Action...')
            }

            return JSON.parse(session)

        } catch(err){
            return ApiError.internal('Something went wrong...')
        }
    }
}

export default cache;