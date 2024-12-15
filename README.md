<p align="center">
  <a aria-label="npm version" href="https://www.npmjs.com/package/@vsx-labs/solv">
    <img alt="" src="https://badgen.net/npm/v/@vsx-labs/solv">
  </a>
  <a aria-label="License" href="https://github.com/vsx-labs/solv/blob/master/LICENSE.txt">
    <img alt="" src="https://badgen.net/badge/license/Apache/blue">
  </a>
    <a aria-label="Code of Conduct" href="https://github.com/vsx-labs/solv/blob/master/CODE_OF_CONDUCT.md">
    <img alt="" src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg">
  </a>
</p>

> NOTE: this is a fork of https://github.com/EpicsDAO/solv monorepo, rebranded
> to avoid confusion with upstream, with defaults changed (e.g., do not default
> to EpicsDAO vote accounts), and with several features not related to core
> validator operation removed.  We plan to stay reasonably current with the
> upstream and contribute back bugfixes and new features.

## CLI Tool for Managing Solana Validators - "solv"

## 📖 Server Spec

- Linux Ubuntu 20.04 LTS
- Linux Ubuntu 22.04 LTS
- Linux Ubuntu 24.04 LTS

## Solana Validator Setup

Setup node:
```bash
nvm ls-remote
nvm install v22.12.0 # latest LTS
node --version
v22.12.0
```

Setup pnpm (ensure up-to-date):
```bash
brew upgrade pnpm
pnpm --version
9.15.0
```

Setup project:
```bash
pnpm install
```

When you run the `solv setup` command, a prompt like the following will appear.
Select the network, node type, and either RPC type or validator type.

Example: For an RPC node

![](https://storage.googleapis.com/epics-bucket/solv/assets/setup-rpc.png)

Example: For a Validator

![](https://storage.googleapis.com/epics-bucket/solv/assets/setup-jito-v.png)

For the validator type, you can also set options like commission here.

Once the setup is complete, the snapshot download will automatically begin,
and your Solana validator will start 🎊

If the snapshot download doesn't complete, press Ctrl + C to stop,
and then run the `solv restart --rm` command again.

Starting a new Solana validator can take anywhere from several minutes to several hours.
You can check the logs using the following command:

```bash
solv log
```

or

```bash
solv m
```

`m` is an alias for the `monitor` command.

※`solv monitor` does not work until the snapshot download is complete.

## solv setup Options

solv setup command has the following options:

```
solv setup --help
Usage: solv setup [options]

Setup Solana Validator

Options:
  --vote              Setup Vote Account (default: false)
  --key               Setup Validator Keypairs (default: false)
  --relayer           Setup Jito Relayer (default: false)
  --jupiter           Setup Jupiter Swap API (default: false)
  --geyser            Setup Geyser (default: false)
  --firedancer        Setup Firedancer (default: false)
  --skip-init-config  Skip Initial Config (default: false)
  --skip-mount        Skip Mount (default: false)
  -h, --help          Display help for command
```

## Update - solv get snapshot v4.6.15

Version control for snapshot-finder

https://github.com/EpicsDAO/solv/pull/331

## Website

VSX Labs: https://vsx.dev

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/vsx-labs/solv This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## Dependencies for Development

- pnpm - Package Manager
- aws-cli - To upload install script to cloud bucket
- tsup - To build the package

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the solv project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/vsx-labs/solv/blob/master/CODE_OF_CONDUCT.md).
