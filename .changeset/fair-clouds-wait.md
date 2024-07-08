---
'@epics-dao/solv': patch
---

update solv setup for cpu governor/sysctl.conf

## Update - solv setup for cpu governor/sysctl.conf

### CPU Governor

The CPU governor is a driver that manages how the CPU scales frequency and voltage. The CPU governor can be set to performance, powersave, ondemand, conservative, schedutil, and userspace.
solv setup will set the CPU governor to performance.

- performance: The CPU runs at the maximum frequency.
- powersave: The CPU runs at the minimum frequency.
- ondemand: The CPU runs at the maximum frequency when the system is busy and at the minimum frequency when the system is idle.
- conservative: The CPU runs at the maximum frequency when the system is busy and at the minimum frequency when the system is idle. It is more aggressive than ondemand.
- schedutil: The CPU runs at the maximum frequency when the system is busy and at the minimum frequency when the system is idle. It is more aggressive than ondemand.

If you are already running node,
you can set the CPU governor to performance by running the following command.

```bash
echo "performance" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
```

Then, delete the existing ledger and snapshot files and restart the node.

```bash
$ solv restart --rm
```

### Socket buffer sizes and TCP congestion control

Depends on the kernel version, the sysctl.conf settings can be different.
solv setup will set the following sysctl.conf settings if it's not set.

```bash
# set default and maximum socket buffer sizes to 128MB
net.core.rmem_default=134217728
net.core.wmem_default=134217728
net.core.rmem_max=134217728
net.core.wmem_max=134217728

# set minimum, default, and maximum tcp buffer sizes (10k, 87.38k (linux default), 128MB resp)
net.ipv4.ttcp_rmem=10240 87380 134217728
net.ipv4.tcp_wmem=10240 87380 134217728

# Enable TCP westwood for kernels greater than or equal to 2.6.13
net.ipv4.tcp_congestion_control=westwood
```
