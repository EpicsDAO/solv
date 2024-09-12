---
id: quickstart-solv-swap
title: solv SWAP Command
description: Quickstart for open-source Solana Validator tool solv - SWAP Command
---

https://youtu.be/51c7BzvcBjk

The solv swap command is a tool that allows you to swap Solana tokens and SPL tokens in a simple and intuitive way.
You can select tokens interactively and execute swaps, or complete swaps quickly using a one-liner command, making token swap operations easy to integrate into your programs.

This solv swap is offered with _0% fees_ ,
and by utilizing the private RPC and Jupiter API endpoints provided by Validators Solutions, it ensures fast and reliable connectivity.

This enables a smooth and efficient trading experience.

## Initial setup of solv swap command

When you run the following command, a prompt will appear,

```bash
solv swap
? Enter Solana RPC URL https://rpc.validators.solutions/rpc?api-key=<YOUR_API_KEY>
? Enter Keypair Path /home/solv/mainnet-validator-keypair.json
? Enter Jupiter API Key(Optional)
```

By entering the following information, the settings will be saved in `solv4.config.json`, and you will be able to execute the swap.

- `RPC_URL` - Solana RPC URL

  This RPC URL is the Solana RPC URL used to connect to the Solana network.
  This URL is used to connect to the Solana node.

- `KEYPAIR_PATH` - Path to the Keypair file

  The Keypair file is the file path of the Solana Keypair used for token swaps.

- `API_KEY` - API Key to access Jupiter API (Optional)

  This API key is the Jupiter API key used to access the Jupiter API.
  It can be used even if it is blank, but obtaining an API key provides a faster and more reliable connection.

## Executing the solv swap command

When you run the following command, a prompt will appear,
and you can enter the information of the token to be swapped.

First, select the Input Mint, and

```bash
solv swap
? Select input mint
❯ SOL
  USDC
  elSOL
  JitoSOL
  mSOL
  bSOL
  EPCT
```

Then, select the Output Mint, and

```bash
solv swap
? Select output mint
  elSOL
  JitoSOL
  mSOL
  bSOL
  EPCT
  JUP
```

If you select Other, you can enter the Mint address directly.

```bash
? Enter output mint address (ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC)
```

next, enter the amount to swap.

```bash
? Enter input amount in LAMPORTS. e.g. 0.01 SOL 10000000
```

This value is entered in `lamports`.

Note: The decimal may vary depending on the token, so be careful.

Finally, a confirmation screen will appear, and you will be asked whether to execute the swap.
If you select Yes, the swap will be executed.

![solv-swap](/doc/swap-quote.png)

Once the transaction is sent, the swap is completed, and the transaction hash is displayed.

You can check the transaction status on the Solana Explorer or any other Solana block explorer.

![solv-swap](/doc/swap-tx-solscan.png)

## solv Swap One-liner Command

The command executed above can also be run as a one-liner command.

When you obtain an estimate, a one-liner command is also displayed.
By executing that command, you can perform the swap immediately without going through the interactive prompt.

```bash
solv swap --input So11111111111111111111111111111111111111112 --output EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v --amount 10000000 --skip-confirm
```

his command includes the `--skip-confirm` option, allowing the swap to be executed without a confirmation screen.

It is an effective option when automating tasks, such as BOT trading.

This solv swap operates with _0% fees_ , and by utilizing private RPC, it provides fast and reliable connectivity.

## 🎁 Free API Key Exclusive to the Validators DAO Community

We're excited to offer a free API key exclusively for the Validators DAO community 🎉
It's our way of supporting the community and empowering you with fast, reliable connections.

To get your free API key, simply join us through the link below:

🔗 Validators DAO:
https://discord.gg/8dhnZnvzuw

Unlock fast connections and elevate your experience with your very own API key 🚀

## How to Use the RPC API Key

You can use the RPC API key by adding it to the RPC URL as shown below:

Your RPC URL will look like this:

```bash
https://rpc.validators.solutions?api-key=<YOUR_API_KEY>
```

If you are using the Solana CLI, you can use it as follows by adding the `--url` option:

e.g.

```bash
solana balance --url https://rpc.validators.solutions?api-key=<YOUR_API_KEY>
```

## How to Use the Jupiter API Key

For the Jupiter API key, include it in the headers as a `Bearer` token when sending requests.

Jupiter Quote API endpoint:
GET: `https://jup.validators.solutions/v1/jup/quote`

Jupiter Swap API endpoint:
POST: `https://jup.validators.solutions/v1/jup/swap`

Example of Getting a Swap Quote:
To get a quote for swapping 0.01 SOL to USDC:

```bash
curl --location 'https://jup.validators.solutions/v1/jup/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=10000000' \
--header 'Authorization: Bearer <YOUR-API-KEY>'
```

In the example above, the `Authorization header` includes `Bearer <YOUR-API-KEY>`, and the request includes query parameters such as `inputMint`, `outputMint`, and `amount`.

The amount represents the input token quantity in `lamports`.

Please note that decimals differ depending on the token.

※The RPC API key and Jupiter API key are the same value, but they are used differently for each API.

## solv swap Command Options

```bash
solv swap --help
Usage: solv swap [options]

Swap tokens

Options:
  -i, --input <input>    Input token mint (default: "")
  -o, --output <output>  Output token mint (default: "")
  -a, --amount <amount>  Input amount in lamports (default: "0")
  -s, --skip-confirm     Skip confirmation (default: false)
  -h, --help             Display help for command
```
