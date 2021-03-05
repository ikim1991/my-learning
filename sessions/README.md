# Sessions in Node.js  

### Implementing sessions using Express, Redis, and CORS.  

## Sessions Use Cases

#### Stateful authentication (Cookies)
#### Session stored server-side in memory, cache, or databases
#### Cookie header used in session management, personalization, and tracking. Consists of name, value, optional attributes

### Session based authentication are exposed to Cross Side Request Forgery (CSRF)
### Mitigated with a CSRF token

## Session Lifecycle
1. Preflight Request from Client to validate and establish connection with server
2. HTTP Request Sent by Client
3. Check for Cross Origin Resource Sharing, CORS middleware
4. Check for session, express-session middleware
5. If login, validate credentials authorize, and initialize session
6. If existing session, pull from session store and authenticate
7. Handle HTTP Request
8. Send Response to Server