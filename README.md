# @peretch/nats-test

## Summary

This repository contains an example connecting node applications with a NATS Streaming Server by using node-nats-streaming npm package

## Used Technologies

- [Skaffold](https://skaffold.dev/docs/install/) for managing kubernetes and docker images
- [NATS Docker Image](https://docs.nats.io/running-a-nats-service/nats_docker) as NATS Streaming Server
- npm package [node-nats-streaming](https://www.npmjs.com/package/node-nats-streaming) for interacting with NATS Streaming Server.
- Other libraries and types definitions (`ts-node-dev`, `typescript`, `@types/node`)

## Installation

1. `npm install`
2. If not isntalled, install skaffold from https://skaffold.dev/docs/install/
3. In one terminal, initialize nats image by using `skaffold dev`

## Usage

### Listener

### Publisher
