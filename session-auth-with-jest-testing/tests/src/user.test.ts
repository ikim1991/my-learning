import request from 'supertest';
import app from '../../src/App';
import { FLUSHALL_ASYNC } from '../../src/model/cache';
import User from '../../src/model/user';

describe('/register', () =>{

    describe('REGISTER USER TEST', () => {

        it('Registration Success', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    "email": "test@example.com",
                    "password": "test123",
                    "confirm": "test123",
                    "username": "tester"
                })
                .set('Origin', 'https://example.com')
            expect(res.status).toBe(201)
        })

        it('No Email Provided', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    "password": "test123",
                    "confirm": "test123",
                    "username": "tester"
                })
                .set('Origin', 'https://example.com')
            expect(res.status).toBe(400)
        })

        it('No Password Provided', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    "email": "test@example.com",
                    "confirm": "test123",
                    "username": "tester"
                })
                .set('Origin', 'https://example.com')
            expect(res.status).toBe(400)
        })

        it('Password Confirmation', async () => {
            const res = await request(app)
                .post('/register')
                .send({
                    "email": "test@example.com",
                    "password": "test123",
                    "confirm": "321test",
                    "username": "tester"
                })
                .set('Origin', 'https://example.com')
            expect(res.status).toBe(400)
        })

        it('Email already in use', async () => {
            let res = await request(app)
                .post('/register')
                .send({
                    "email": "test@example.com",
                    "password": "test123",
                    "confirm": "321test",
                    "username": "tester"
                })
                .set('Origin', 'https://example.com')
            
            res = await request(app)
                .post('/register')
                .send({
                    "email": "test@example.com",
                    "password": "test123",
                    "confirm": "321test",
                    "username": "tester"
                })
                .set('Origin', 'https://example.com')
            expect(res.status).toEqual(400)
        })

        afterEach(async () => {
            await User.deleteMany()
        })
    })
})

describe('/login', () =>{
    describe('LOGIN USER TEST', () => {

        beforeAll(async () => {
           await request(app)
                .post('/register')
                .send({
                    "email": "test@example.com",
                    "password": "test123",
                    "confirm": "test123",
                    "username": "tester"
                })
                .set('Origin', 'https://example.com')
        })

        it('Login Success', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    "email": "test@example.com",
                    "password": "test123"
                })
                .set('Origin', 'https://example.com')
            expect(res.status).toBe(200)
            expect(res.header['set-cookie']).toBeDefined()
        })

        it('Login with Wrong Credentials', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    "email": "test@example.com",
                    "password": "321test"
                })
                .set('Origin', 'https://example.com')
            expect(res.status).toBe(400)
            expect(res.header['set-cookie']).toBeUndefined()

        })

        it('Login with Wrong Email', async () => {
            const res = await request(app)
                .post('/login')
                .send({
                    "email": "tester@example.com",
                    "password": "test123"
                })
                .set('Origin', 'https://example.com')
            
            expect(res.status).toEqual(400)
            expect(res.header['set-cookie']).toBeUndefined()
        })

        afterEach(async () => {
            await User.deleteMany()
        })

    })
})

describe('/user', () =>{
    describe('GET USER TEST', () => {

        let setCookie: string;

        beforeAll(async () => {
            await request(app)
                .post('/register')
                .send({
                    "email": "test@example.com",
                    "password": "test123",
                    "confirm": "test123",
                    "username": "tester"
                })
                .set('Origin', 'https://example.com')
            await request(app)
                .post('/login')
                .send({
                    "email": "test@example.com",
                    "password": "test123"
                })
                .set('Origin', 'https://example.com')
                .then(res => {
                    setCookie = res.headers['set-cookie'][0].split(";")[0]
                })
        })

        it('Get User Successful', async () =>{
            const res = await request(app)
                .get('/user')
                .set("Origin", "https://example.com")
                .set("Cookie", setCookie)

            expect(res.status).toBe(200)
        })

        it('Get User Unauthorized', async () => {
            const res = await request(app)
                .get('/user')
                .set("Origin", "https://example.com")

            expect(res.status).toBe(401)
        })

        afterEach(async () => {
            await User.deleteMany()
            await FLUSHALL_ASYNC()
        })
    })
})

describe('/logout', () =>{
    

    let setCookie: string;

    beforeAll(async () => {
        await request(app)
            .post('/register')
            .send({
                "email": "test@example.com",
                "password": "test123",
                "confirm": "test123",
                "username": "tester"
            })
            .set('Origin', 'https://example.com')
        await request(app)
            .post('/login')
            .send({
                "email": "test@example.com",
                "password": "test123"
            })
            .set('Origin', 'https://example.com')
            .then(res => {
                setCookie = res.headers['set-cookie'][0].split(";")[0]
            })
    })

    it('Logout Successful', async () => {
        const res = await request(app)
            .post('/logout')
            .set('Origin', 'https://example.com')
            .set('Cookie', setCookie)
        expect(res.status).toBe(200)
    })

    it('Logout Unauthorized', async () => {
        const res = await request(app)
            .post('/logout')
            .set('Origin', 'https://example.com')
        expect(res.status).toBe(401)
    })

    afterEach(async () => {
        await User.deleteMany()
        await FLUSHALL_ASYNC()
    })
})