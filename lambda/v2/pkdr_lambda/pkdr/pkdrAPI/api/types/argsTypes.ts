type mintInfo = {
  address: string;
  amount: string;
};
type TransferParams = {
  to: string;
  amount: string;
};

type TransferFromParams = {
  from:string;
  to: string;
  amount: string;
};
export { mintInfo, TransferParams ,TransferFromParams};
