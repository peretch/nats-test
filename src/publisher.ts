import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

// "stan" is commonly used for nats instances (Is NATS written backwards)
// Could be "client" or something loke that.

// 'bti' is the clusterId specified with "-cid" parameter by using docker image nats-streaming:0.17.0
// 'abc' is
const stan = nats.connect('bti', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('publisher connected to NATS');

  const data = {
    id: '1emdf912me',
    title: 'Title',
    price: 20,
  };
  // We cannot emit events with data as JavaScript objects, we need to send plain text
  const message = JSON.stringify(data);
  stan.publish('ticket:created', message, () => {
    console.log('Event ticket:created was emmited');
  });
});
