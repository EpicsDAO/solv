---
'@epics-dao/solv': patch
---

## Update - solv relayer

- Added solv relayer setup to setup separate Jito Relayer
- Added solv relayer set:url to set Relayer URL on Validator
  This command will set the Relayer URL on the Validator
  Equivalent to `solana-validator --ledger /mnt/ledger set-relayer-config --relayer-url <relayer_url>` command
- Added solv relayer log to show Relayer logs

```bash
Usage: solv relayer [options] [command]

Jito Relayer Commands

Options:
  -h, --help         Display help for solv commands

Commands:
  setup              Show Relayer Status
  status             Show Relayer Status
  start              Start Relayer
  stop               Stop Relayer
  log [options]      Show Relayer Logs
  restart            Restart Relayer
  set:url [options]  Set Relayer URL on Validator
  help [command]     display help for command
```

## Update - solv switch

Testnet switch command is now available.
Also, added validation of Validator keys before switching.

```bash
Usage: solv switch [options]

Switch Validator Identity with No Downtime

Options:
  --ip <ip>                  IP Address of the New Validator (default: "")
  --switchType <switchType>  Switch Type (default: "")
  -h, --help                 Display help for solv commands
```
