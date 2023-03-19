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
export {
  mintResult,
  approveResult,
  SetPlatFormFeeResult,
  TransferResult,
  TransferFromResult,
};
