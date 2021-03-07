const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const agent = request.agent(app);

describe('testing plant static methods', () => {
  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));

    await UserService.create({
      email: 'test@test.com',
      password: 'password',
      name: 'name'
    });

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password',
        name: 'name'
      });
  });

  afterAll(() => {
    pool.end();
  });


  it('creates a plant with /POST', async() => {
    expect('1').toEqual('1');
  });

});
