import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('bti', 'clientIdB', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('listener connected to NATS');

  const subscription = stan.subscribe('ticket:created');

  subscription.on('message', (msg) => {
    console.log('message arrived', msg);
  });
});
