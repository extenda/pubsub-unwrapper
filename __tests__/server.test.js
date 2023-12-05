jest.mock('axios');
const supertest = require('supertest');
const axios = require('axios');

const { server } = require('../src/server');

const testSub = 'projects/test-project/subscriptions/test-subscription';

beforeEach(() => {
  process.env.TEST_SUBSCRIPTION = testSub;
  axios.post.mockImplementation(() => Promise.resolve({ status: 200 }));
});

afterEach(async () => {
  await server.close();
});

test('unwrap handling', async () => {
  const data = {
    subscription: testSub,
    message: {
      data: 'eyJkYXRhIjoiPFBPU0xvZy8+In0=',
      attributes: {
        'tenant-id': 'CIR7nQwtS0rA6t0S6ejd',
      },
    },
  };

  await supertest(server)
    .post('/unwrap')
    .send(data)
    .expect(200);
});
