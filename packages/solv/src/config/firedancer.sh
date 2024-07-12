#!/bin/bash
git clone --recurse-submodules https://github.com/firedancer-io/firedancer.git
cd firedancer
git checkout v0.106.11814
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
. "$HOME/.cargo/env"
sudo apt install - y gcc - 13 g++ - 13
sudo apt install -y clang git make
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-13 60 --slave /usr/bin/g++ g++ /usr/bin/g++-13
sudo update-alternatives --config gcc
export CC=/usr/bin/gcc-13
export CXX=/usr/bin/g++-13
sudo apt install -y libudev-dev pkg-config
echo "performance" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
./deps.sh
make -j fdctl solana