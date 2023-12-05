jest.mock('axios');
const supertest = require('supertest');
const axios = require('axios');

const { server } = require('../server');

const testSub = 'projects/test-project/subscriptions/test-subscription';

beforeEach(() => {
  process.env.TEST_SUBSCRIPTION = 'http://localhost:9999';
  axios.post.mockImplementation(() => Promise.resolve({ status: 200 }));
});

afterEach(async () => {
  await server.close();
});

const data = {
  subscription: testSub,
  message: {
    data: 'eyJkYXRhIjoiPFBPU0xvZy8+In0=',
    attributes: {
      'tenant-id': 'CIR7nQwtS0rA6t0S6ejd',
    },
  },
};

test('unwrap handling', async () => {
  await supertest(server)
    .post('/unwrap')
    .send(data)
    .expect(200);
});

test('failing request', async () => {
  axios.post.mockImplementation(() => Promise.reject({
    response: {
      status: 400,
      headers: {}
    }
  }));

  await supertest(server)
  .post('/unwrap')
  .send(data)
  .expect(400);
});

test('fail with no response', async () => {
  axios.post.mockImplementation(() => Promise.reject({}));

  await supertest(server)
  .post('/unwrap')
  .send(data)
  .expect(500);
});
