
class ApiError extends Error{
    constructor(public code: number, message: string){
        super(message)
        this.code = code
        
    }

    static badRequest(msg: string){
        return new ApiError(400, msg)
    }

    static unauthorized(msg: string){
        return new ApiError(401, msg)
    }

    static forbidden(msg: string){
        return new ApiError(403, msg)
    }

    static notFound(msg: string){
        return new ApiError(404, msg)
    }

    static internal(msg: string){
        return new ApiError(500, msg);
    }

}

export default ApiError;