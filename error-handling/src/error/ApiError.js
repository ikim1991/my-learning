class ApiError extends Error{
    constructor(code, message){
        super(message)
        this.code = code
    }

    // Success Codes
    // Code 200 - OK
    // Code 201 - Created
    // Code 204 - No Content

    // Code 400 - Bad Request
    static badRequest(msg){
        return new ApiError(400, msg);
    }

    // Code 401 - Unauthorized
    static unauthorized(msg){
        return new ApiError(401, msg)
    }

    // Code 403 - Forbidden
    static forbidden(msg){
        return new ApiError(403, msg)
    }

    // Code 404 - Not Found
    static notFound(msg){
        return new ApiError(404, msg)
    }

    // Code 500 - Internal Server Error
    static internal(msg){
        return new ApiError(500, msg);
    }

}

export default ApiError;

