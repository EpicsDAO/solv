// This config is need to be added to /etc/sysctl.conf when error occurs in solana-validator
// run `sudo sysctl -p` to apply the changes
const sysconfig = `# set default and maximum socket buffer sizes to 128MB
net.core.rmem_default=134217728
net.core.wmem_default=134217728
net.core.rmem_max=134217728
net.core.wmem_max=134217728

# set minimum, default, and maximum tcp buffer sizes (10k, 87.38k (linux default), 128MB resp)
net.ipv4.tcp_rmem=10240 87380 134217728
net.ipv4.tcp_wmem=10240 87380 134217728

# Enable TCP westwood for kernels greater than or equal to 2.6.13
net.ipv4.tcp_congestion_control=westwood`
