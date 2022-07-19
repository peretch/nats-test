import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('bti', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('listener connected to NATS');

  const options = stan
    .subscriptionOptions()
    // Manual Ack Mode will let us control when message was acceptable received
    // With this setted in 'true', we need to declare explicit where the message is received an processed OK
    .setManualAckMode(true);

  const subscription = stan.subscribe(
    'ticket:created',
    'listener-service-queue-group',
    options
  );

  subscription.on('message', (msg: Message) => {
    // Returns the data associated with the message payload. If the stanEncoding is not
    // set to 'binary', a string is returned.
    const data = msg.getData();

    // Returns the subject associated with this Message
    const channel = msg.getSubject();

    // Returns the sequence number of the message in the stream.
    const sequence = msg.getSequence();

    if (typeof data === 'string') {
      console.log(
        `Event received: \n  - number: #${sequence}\n  - channel: ${channel}\n  - data: ${data}`
      );
    }

    // Here we confirm that the event was processed OK
    msg.ack();
  });
});
