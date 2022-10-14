# @peretch/nats-test

## Summary

This repository contains an example connecting node applications with a NATS Streaming Server by using node-nats-streaming npm package

## Used Technologies

- [Skaffold](https://skaffold.dev/docs/install/) for managing kubernetes and docker images
- [NATS Docker Image](https://docs.nats.io/running-a-nats-service/nats_docker) as NATS Streaming Server
- npm package [node-nats-streaming](https://www.npmjs.com/package/node-nats-streaming) for interacting with NATS Streaming Server.
- Other libraries and types definitions (`ts-node-dev`, `typescript`, `@types/node`)

## Terminology

- **subject**: Is the _channel_ that where we are pushing an event
- **channel**: Is what we are subscribing to
- **subscription**: Is what is actually listening to the _channel_ and eventually receive some data

## Installation

1. `npm install`
2. If not isntalled, install skaffold from https://skaffold.dev/docs/install/
3. In one terminal, initialize nats image by using `skaffold dev`

## Usage

### Making NATS Service visible

For exposing our NATS Streaming Server, we will make a port forward to the running pod.

1. Check your pod name with command `kubectl get pods`
2. Copy your running pod name (for example `nats-depl-7c95b5f667-zw5cc`)
3. Fordward the port `4222` with command `kubectl port-forward nats-depl-7c95b5f667-zw5cc 4222:4222`
4. After doing this, in a third terminal, we can run `npm run publish` and check if connection is OK (We should receive `publisher connected to NATS` log)

### Publisher

Publisher script (`npm run publish`) will connect to nats server and create an example push of data to channel `ticket:created`.
### Listener

Listener script (`npm run listen`) will connect to nats server and listen for data in channel `ticket:created`.


### NATS Monitoring

To enable NATS monitoring, we need to forwar dpor `8222`.

1. Check your pod name with command `kubectl get pods`
2. Write command `kubectl port-forward nats-depl-7c95b5f667-zw5cc 8222:8222`

After doing this, you will be able to go to http://localhost:8222, here are some importante sites

#### Useful URLs

- http://localhost:8222/streaming/channelsz: List of channels
- http://localhost:8222/streaming/channelsz?subs=1 Extended list of channels



# Messages app

## Basic NestJS flow

![NestJS basic flow](https://user-images.githubusercontent.com/44510623/195880686-f88aa55d-1647-49e4-a429-2280e0998376.jpg)

