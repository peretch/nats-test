import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('bti', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS Connection closed');
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    // Manual Ack Mode will let us control when message was acceptable received
    // With this setted in 'true', we need to declare explicit where the message is received an processed OK
    .setManualAckMode(true)
    // Configures the subscription to replay from first available message.
    .setDeliverAllAvailable()
    // Sets a durable subscription name that the client can specify for the subscription.
    // This enables the subscriber to close the connection without canceling the subscription and resume the subscription with same durable name.
    // Note the server will resume the subscription with messages that have not been acknowledged.
    .setDurableName('listener-service');

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

// Interrupt or terminate program (Ctrl + C for example) will call sopecified callback
// This will avoid NATS Streaming Server to keep trying to reach this listener
// This will be VERY IMPORTANT in our events, because each bad ended service will slow user expirience
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
