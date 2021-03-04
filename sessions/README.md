# Sessions in Node.js  

### Implementing sessions using Express (express-session), Redis, and CORS.  

## Server-side Lifecycle  

### Login Lifecycle  
1. Client Request for Login
2. Preflight Request, check CORS (cors middleware)
3. Initialize Session & Store Session on Redis (session middleware)
4. Check user credentials (controller)
5. Access Database via Service Wrapper function (service/data access object)
6. Validate Credentials
7. Send Response
8. Set Cookie if status code 200/204

### Get Profile Lifecycle  
1. Client Request for Profile
2. Access-Control-Allow-Credentials set to true (GET Requests are not preflighted)
3. Check CORS (cors middleware)
4. Check for Session on Redis (session middleware)
5. Check cookie to authenticate (authenticate middleware)
6. Send existing session in reponse
