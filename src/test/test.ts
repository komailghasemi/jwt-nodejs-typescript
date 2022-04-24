import app from '../app'
import request from 'supertest'
import mongoose from 'mongoose'

test('test', () => {
    expect(1).toBe(1)
})

test('Auth Router [ SignUp Test ]', (done) => {

    request(app).post('/auth/signup')
        .send({
            name: 'test',
            username: 'testuser',
            password: '123456'

        })
        .expect('Content-Type', /text/)
        .expect(200, done)
})


test('Auth Router [ SignIn Test ]', (done) => {

    request(app).post('/auth/signin')
        .send({
            username: 'testuser',
            password: '123456'

        })
        .expect('Content-Type', /json/)
        .expect(200, done)
})

afterAll(async () => {
    await mongoose.connection.close();
  });
