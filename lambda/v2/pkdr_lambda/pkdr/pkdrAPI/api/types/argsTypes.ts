type mintInfo = {
  address: string;
  amount: string;
};
type TransferParams = {
  to: string;
  amount: string;
};

type TransferFromParams = {
  from: string;
  to: string;
  amount: string;
};

type BurnFromParams = {
  address: string;
  amount: string;
};

type WithdrawParams = {
  IBAN: string;
  accountHolderName: string;
  amount: number;
  id:string;
  address: string;
  userName: string;
};
export { mintInfo, TransferParams, TransferFromParams, BurnFromParams,WithdrawParams };
