---
'@epics-dao/solv': patch
---

Update Logrotate, RPC NODE firewall

## Update Logrotation

Recently, we have updated the logrotate configuration for Solana Validator.
To apply the changes, you need to run the following command.
(We recommend running this command if you are attending to TDS with Edgevana Server.)

```bash
$ solv update --logrotate
```

## Update RPC NODE Firewall

We have noticed that some users are facing issues with the RPC Node's performance.
We have updated the firewall configuration to improve the RPC Node's to prevent the DDoS attack.
Thank you @cryptoo_bear San for reporting the issue to us.
New solv setup command will ask you to enter your IP address to allow access to RPC NODE.
But you can also run the following command to update the firewall configuration.

```bash
$ solv update --firewall
? Enter your IP address to allow access to RPC NODE: (0.0.0.0)
```
