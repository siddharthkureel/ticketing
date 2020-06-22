import request from 'supertest';
import { app } from '../../app';

it('fails when a email that does not exist is supplied', async () => {
  return request(app)
  .post('/api/users/signin')
  .send({
     email: 'test1@test.com',
     password: 'password'
  }).expect(400)
})

it('fails when a invalid password is supplied', async () => {
   await request(app).post('/api/users/signup')
   .send({
      email: 'test3@email.com',
      password: 'password'
   }).expect(201)

   const response = await request(app)
   .post('/api/users/signin')
   .send({
      email: 'test3@email.com',
      password: 'cads'
   }).expect(400)  
})

it('responds with a cookie when valid credentials', async () => {
   await request(app)
   .post('/api/users/signup')
   .send({
      email: 'test32@email.com',
      password: 'password'
   })
   .expect(201)

   const response = await request(app)
   .post('/api/users/signin')
   .send({
      email: 'test32@email.com',
      password: 'password'
   }).expect(200)
   expect(response.get('Set-Cookie')).toBeDefined();
}) 