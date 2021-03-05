# Redis Caching  

### Using a lightweight database like Redis to cache data can greatly improve the application performance.

## Caching Use Cases

#### Storing non-real time data
#### Storing slow database queries

## Cache Lifecycle
1. HTTP Request from Client
2. Authenticate user
3. Check cache for requested data, cache middleware
4. If existing in cache, send Response to Client
5. If not in cache, handle HTTP Request, query data from main database, store data into cache, and send Response to Client