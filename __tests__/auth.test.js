const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('auth routes', () => {
  let agent;
  let user;

  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

    agent = await request.agent(app);
    user = await UserService.create({
      email: 'test@test.com',
      password: 'password', 
      name: 'Name'
    });
  });

  afterAll(() => {
    pool.end();
  });

  it('allows the user to signup via POST', async() => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password', 
        name: 'Name'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          email: 'test@test.com',
          name: 'Name'
        });
      });
  });
});
