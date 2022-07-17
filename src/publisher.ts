import nats from 'node-nats-streaming';

// "stan" is commonly used for nats instances (Is NATS written backwards)
// Could be "client" or something loke that.

// 'bti' is the clusterId specified with "-cid" parameter by using docker image nats-streaming:0.17.0
// 'abc' is
const stan = nats.connect('bti', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('publisher connected to NATS')
})
