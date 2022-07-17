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

### Listener

### Publisher
