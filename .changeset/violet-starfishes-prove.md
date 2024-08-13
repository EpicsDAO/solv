---
'@epics-dao/solv': patch
---

## Add options - solv scp download/solv switch

Now you can use the argument `--switchType` and `--ip` to specify the switch type.

If this argument is not specified, the prompt will ask you to select the switch type.

```bash
$ solv switch --ip <IP address> --switchType <switch type>
```

Now you can use the argument `--ip` to specify the IP address of the node you want to download the SSH key from.

If this argument is not specified, the prompt will ask you to select the switch type.

```bash
$ solv scp download --ip <IP address>
```

```bash
$ solv scp upload --ip <IP address>
```

## Migrate to Validator Auto Operation Support Service

Discord: [EpicsDAO Discord](https://discord.gg/HDTy96Wr2W)
