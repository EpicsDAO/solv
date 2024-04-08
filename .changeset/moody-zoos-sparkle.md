---
'@epics-dao/solv': patch
---

Add - solv setup --swap

※ This is for mainnet only.

Added solv setup --swap to create `/swapfile` and enable swap on the system.
This command will check if the current system has enough memory to create a swap file.
If the system has enough memory, it will skip creating the swap file.
If not, it will create a swap file and enable swap on the system.

```bash
$ solv update
$ solv -V
3.3.14
$ solv setup --swap
```

Please check `/etc/fstab` to make sure the `/swapfile` is enabled on boot.
Usually, no need to do anything as the default setup will enable the swap file on boot.

```bash
cat /etc/fstab
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/vda2 during curtin installation
/dev/disk/by-uuid/00f0ec87-743a-44b8-907a-418bbde80cab / ext4 defaults 0 1
# /boot/efi was on /dev/vda1 during curtin installation
/dev/disk/by-uuid/3BD4-D1A7 /boot/efi vfat defaults 0 1
/swapfile swap swap defaults 0 0
/dev/nvme1n1        /mnt/ledger     ext4 auto 0 0
/dev/nvme0n1        /mnt/accounts     ext4 auto 0 0
```
