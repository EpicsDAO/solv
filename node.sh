# install the base app
git clone https://github.com/nodenv/nodenv.git ~/.nodenv

# add nodenv to system wide bin dir to allow executing it everywhere
sudo ln -vs ~/.nodenv/bin/nodenv /usr/local/bin/nodenv

# compile dynamic bash extension to speed up nodenv - this can safely fail
cd ~/.nodenv
src/configure && make -C src || true
cd ~/

# install plugins
mkdir -p "$(nodenv root)"/plugins
git clone https://github.com/nodenv/node-build.git "$(nodenv root)"/plugins/node-build
git clone https://github.com/nodenv/nodenv-aliases.git $(nodenv root)/plugins/nodenv-aliases

# install a node version to bootstrap shims
/usr/local/bin/nodenv install 18.17.1
/usr/local/bin/nodenv global 18.17.1

# Add nodenv init to your shell to enable shims and autocompletion
echo "$(nodenv init - zsh)" >> ~/.zshrc
source ~/.zshrc

# make sure everything is working
node --version
npm --version
npx --version