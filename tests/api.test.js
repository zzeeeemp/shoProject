const request = require('supertest');
const app = require('../index');

describe('GET /api/products', () => {
    it('should get all products', async () => {
        const response = await request(app).get('/api/products');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
     
    });
});

describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
        const newUser = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword'
        };
        const response = await request(app)
            .post('/api/auth/register')
            .send(newUser);
        expect(response.status).toBe(201);
    });
});
