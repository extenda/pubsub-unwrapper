const { mapToUrl } = require('../src/subscriptions');

it('can map a pubsub subscription', () => {
  process.env.TEST_SUBSCRIPTION = 'localhost:8080';
  const testSub = 'projects/test-project/subscriptions/test-subscription';
  const url = mapToUrl(testSub);
  expect(url).toEqual('localhost:8080');
});
