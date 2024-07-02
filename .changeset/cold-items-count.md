---
'@epics-dao/solv': patch
---

# ⚠️ Security Patch

If you are using other than the 1:8.9p1-3ubuntu0.10 version of OpenSSH, you should update it to the latest version.
This version fixes a security vulnerability that allows an attacker to execute arbitrary code on the server.

## Update solv version

```bash
$ solv update
```

## Check/Update OpenSSH - solv update --ssh

This command will check the OpenSSH version and update it if necessary.
※ Recommended to run this command on the server to check the OpenSSH version.

```bash
$ solv update --ssh
```
