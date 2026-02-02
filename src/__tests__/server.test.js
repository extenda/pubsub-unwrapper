jest.mock('axios');
const supertest = require('supertest');
const axios = require('axios');

const { app } = require('../server');

const testSub = 'projects/test-project/subscriptions/test-subscription';

const data = {
  subscription: testSub,
  message: {
    data: `${Buffer.from('{"key":"value"}').toString('base64')}`,
    attributes: {
      'content-type': 'application/json',
      'tenant-id': 'CIR7nQwtS0rA6t0S6ejd',
    },
    message_id: '123',
    messageId: '123',
    publish_time: '2021-02-26T19:13:55.749Z',
    publishTime: '2021-02-26T19:13:55.749Z',
  },
};

describe('unwrap pubsub message', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    process.env.TEST_SUBSCRIPTION = 'http://localhost:9999';
    axios.post.mockImplementation(() => Promise.resolve({ status: 200 }));
  });

  it('should send json payloads', async () => {
    await supertest(app)
      .post('/unwrap')
      .send(data)
      .expect(200);
  });

  it('should send plain text payloads', async () => {
    const notJsonData = JSON.parse(JSON.stringify(data));
    notJsonData.message.attributes['content-type'] = 'text/plain';
    notJsonData.message.data = Buffer.from('not json').toString('base64');

    await supertest(app)
      .post('/unwrap')
      .send(notJsonData)
      .expect(200);

    expect(axios.post)
      .toHaveBeenCalledWith(
        'http://localhost:9999',
        'not json',
        {
          headers: expect.objectContaining({
            'content-type': 'text/plain',
            'tenant-id': 'CIR7nQwtS0rA6t0S6ejd',
            'x-goog-pubsub-subscription-name': 'projects/test-project/subscriptions/test-subscription',
            'x-goog-pubsub-message-id': '123',
          }),
        },
      );
  });

  it('should not verify content type header against request body type', async () => {
    const notJsonData = JSON.parse(JSON.stringify(data));
    notJsonData.message.data = Buffer.from('not json').toString('base64');

    await supertest(app)
      .post('/unwrap')
      .send(notJsonData)
      .expect(200);

    expect(axios.post)
      .toHaveBeenCalledWith(
        'http://localhost:9999',
        'not json',
        {
          headers: expect.objectContaining({
            'content-type': 'application/json',
            'tenant-id': 'CIR7nQwtS0rA6t0S6ejd',
            'x-goog-pubsub-message-id': '123',
          }),
        },
      );
  });

  it('fails on missing content-type attribute', async () => {
    const badData = JSON.parse(JSON.stringify(data));
    delete badData.message.attributes['content-type'];

    await supertest(app)
      .post('/unwrap')
      .send(badData)
      .expect(400)
      .expect((res) => expect(res.headers['tenant-id']).toBeUndefined());
  });

  it('fails with error response code', async () => {
    axios.post.mockImplementation(() => Promise.reject({
      response: {
        status: 400,
        headers: {},
      },
    }));

    await supertest(app)
      .post('/unwrap')
      .send(data)
      .expect(400);
  });

  it('fails with 500 on absent error response', async () => {
    axios.post.mockImplementation(() => Promise.reject({}));

    await supertest(app)
      .post('/unwrap')
      .send(data)
      .expect(500);
  });

  it('should accept Content-Type (case insensitive)', async () => {
    const mixedCaseData = JSON.parse(JSON.stringify(data));
    delete mixedCaseData.message.attributes['content-type'];
    mixedCaseData.message.attributes['Content-Type'] = 'application/json';

    await supertest(app)
      .post('/unwrap')
      .send(mixedCaseData)
      .expect(200);

    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'content-type': 'application/json',
        }),
      }),
    );
  });
});
