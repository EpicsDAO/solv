import { ELSOL_TOKEN_MINT, SOL_TOKEN_MINT, USDC_TOKEN_MINT } from './constants'

export const TokenInfo = {
  SOL: {
    tokenMint: 'So11111111111111111111111111111111111111112',
    associationAccount: '4Vwkpk3DTVrTGnUQTazsgQ1wxtU9QwZTmAXDaQRHg9Ra',
    decimal: 9,
  },
  USDC: {
    tokenMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    associationAccount: 'J8sqx9ZEoPRqboFAXK3c1R38zm41tRNJgUn2FzyeYQDj',
    decimal: 6,
  },
  elSOL: {
    tokenMint: ELSOL_TOKEN_MINT,
    associationAccount: '',
    decimal: 9,
  },
  JitoSOL: {
    tokenMint: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn',
    associationAccount: 'HPj87TFMPZfm5nk1HmTH9a382RXn7h9oWftiFr3Xs12a',
    decimal: 9,
  },
  mSOL: {
    tokenMint: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
    associationAccount: '8CX5tE9KvJ59HcoXwWf6tCZoRuz2JFSmunnbKC1ryaK9',
    decimal: 9,
  },
  bSOL: {
    tokenMint: 'bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1',
    associationAccount: '782MdvLby3VfvKdfDYn9tX3DfNAtg7TcytNNFuepcoMH',
    decimal: 9,
  },
  EPCT: {
    tokenMint: 'CvB1ztJvpYQPvdPBePtRzjL4aQidjydtUz61NWgcgQtP',
    associationAccount: 'BhR2L6J5q3xF1TxReXyHjaUh4MF6qV99tMsipzPAKeB',
    decimal: 6,
  },
  JUP: {
    tokenMint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    associationAccount: '212yg3Ev7khq4p1mESFGenF4nWefmkbC8f7mHM68j4vg',
    decimal: 6,
  },
  BONK: {
    tokenMint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    associationAccount: '61Ndjv9392jPRVGALdYgjjxGYa6TT6Gn2WLDSsmugE6U',
    decimal: 5,
  },
  JTO: {
    tokenMint: 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL',
    associationAccount: '2c9qVh8RQ6j2E2VdAEcCrRXMrd6g1vvPNZvAR6sbaGWo',
    decimal: 9,
  },
}

export const TokenInfoByMint = {
  So11111111111111111111111111111111111111112: {
    symbol: 'SOL',
    tokenMint: SOL_TOKEN_MINT,
    associationAccount: '4Vwkpk3DTVrTGnUQTazsgQ1wxtU9QwZTmAXDaQRHg9Ra',
    decimal: 9,
  },
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
    symbol: 'USDC',
    tokenMint: USDC_TOKEN_MINT,
    associationAccount: 'J8sqx9ZEoPRqboFAXK3c1R38zm41tRNJgUn2FzyeYQDj',
    decimal: 6,
  },
  ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC: {
    symbol: 'elSOL',
    tokenMint: ELSOL_TOKEN_MINT,
    associationAccount: '',
    decimal: 9,
  },
  J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn: {
    symbol: 'jitoSOL',
    tokenMint: 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn',
    associationAccount: 'HPj87TFMPZfm5nk1HmTH9a382RXn7h9oWftiFr3Xs12a',
    decimal: 9,
  },
  mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So: {
    symbol: 'mSOL',
    tokenMint: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
    associationAccount: '8CX5tE9KvJ59HcoXwWf6tCZoRuz2JFSmunnbKC1ryaK9',
    decimal: 9,
  },
  bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1: {
    symbol: 'bSOL',
    tokenMint: 'bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1',
    associationAccount: '782MdvLby3VfvKdfDYn9tX3DfNAtg7TcytNNFuepcoMH',
    decimal: 9,
  },
  CvB1ztJvpYQPvdPBePtRzjL4aQidjydtUz61NWgcgQtP: {
    symbol: 'EPCT',
    tokenMint: 'CvB1ztJvpYQPvdPBePtRzjL4aQidjydtUz61NWgcgQtP',
    associationAccount: 'BhR2L6J5q3xF1TxReXyHjaUh4MF6qV99tMsipzPAKeB',
    decimal: 6,
  },
  JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN: {
    symbol: 'JUP',
    tokenMint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    associationAccount: '212yg3Ev7khq4p1mESFGenF4nWefmkbC8f7mHM68j4vg',
    decimal: 6,
  },
  DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263: {
    symbol: 'BONK',
    tokenMint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    associationAccount: '61Ndjv9392jPRVGALdYgjjxGYa6TT6Gn2WLDSsmugE6U',
    decimal: 5,
  },
  jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL: {
    symbol: 'JTO',
    tokenMint: 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL',
    associationAccount: '2c9qVh8RQ6j2E2VdAEcCrRXMrd6g1vvPNZvAR6sbaGWo',
    decimal: 9,
  },
}
