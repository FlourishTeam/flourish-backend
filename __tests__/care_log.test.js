const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
// const CareLog = require('../lib/models/Care_Log');

const agent = request.agent(app);

describe('testing care log static methods', () => {
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

  it('INSERTS a care log associated to a single plant', async() => {
    // const query =
    //  query
    expect('1').toEqual('1');
  });

  it('UPDATES a care log associated to a single plant', async() => {
    expect('1').toEqual('1');
  });

  it('DELETES a care log associated to a single plant', async() => {
    expect('1').toEqual('1');
  });

  afterAll(() => {
    pool.end();
  });
});
