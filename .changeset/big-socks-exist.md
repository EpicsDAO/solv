---
'@epics-dao/solv': patch
---

## New Features - solv v4.6.x Release

Now you can easily setup Yellowstone Geyser plugin and Firedancer!

### Yellowstone Geyser gRPC Interface Support

```bash
solv setup --geyser
```

- Yellowstone Geyser Doc - [https://github.com/rpcpool/yellowstone-grpc](https://github.com/rpcpool/yellowstone-grpc)

### Firedancer Setup Support (Frankendancer)

```bash
solv setup --firedancer
```

Please update the VALIDATOR_TYPE value to `frankendancer` in the `solv4.config.json` file.
solv start will automatically read firedancer.service instead of solv.service.

- Firedancer Doc - [https://firedancer-io.github.io/firedancer/](https://firedancer-io.github.io/firedancer/)
