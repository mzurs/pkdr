import { WithdrawParams } from "./argsTypes";

type mintResult = {
  message: string;
  result: boolean;
};

type approveResult = {
  message: string;
  result: boolean;
};

type SetPlatFormFeeResult = {
  message: string;
  result: boolean;
};

type TransferResult = {
  from: string;
  to: string;
  amount: string;
  message: string;
  result: boolean;
  hash?: string;
};

type TransferFromResult = {
  from: string;
  to: string;
  amount: string;
  message: string;
  result: boolean;
  hash?: string;
};

type BurnResult = {
  hash?: string;
  amount: string;
  result: boolean;
  message: string;
};

type BurnFromResult = {
  hash?: string;
  from: string;
  amount: string;
  result: boolean;
  message: string;
};
type WithdrawParam = {
  IBAN: string;
  accountHolderName: string;
  amount: number;
  id:string;
  address: string;
  userName: string;
};
type WithdrawParamsResult = {
  burnResult?: BurnFromResult;
  withdrawResult?: WithdrawParam;
  result: boolean;
  message: string;
  errorMessage: string;
};

export {
  mintResult,
  approveResult,
  SetPlatFormFeeResult,
  TransferResult,
  TransferFromResult,
  BurnResult,
  BurnFromResult,
  WithdrawParamsResult,
  WithdrawParam
};
