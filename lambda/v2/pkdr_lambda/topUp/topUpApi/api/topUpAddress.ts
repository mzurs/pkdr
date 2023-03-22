import { ethers } from "ethers";
import { contractAddress, contractABI } from "../../topUpConstants";
import getRateMaticToUsd from "./getRateMaticToUsd";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "./constants/constants";
import getRateUSDPKR from "./getRateUSDPKR";
import { TopUpAddressResult } from "./types/apiParamsTypes";

async function topUpAddress(address: string): Promise<TopUpAddressResult> {
  const res: TopUpAddressResult = {
    hash: "",
    message: "",
    result: false,
  };

  const PKDR_PRIVATE_KEY = _PKDR_PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(
    _JSON_RPC_PROVIDER_MUMBAI
  );
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  const wallet = new ethers.Wallet(PKDR_PRIVATE_KEY, provider);

  const connectedWallet = contract.connect(wallet);
  const PKRUSD = await getRateUSDPKR();
  try {
    //220;

    const MATICUSD = parseFloat(
      ethers.utils.formatEther(String(await connectedWallet.getPrice()))
    ); //0.8;

    const TOPUPAMOUNT = (20 / (MATICUSD * PKRUSD)).toFixed(3);

    const AMOUNT_DEPOSIT = ethers.utils.parseUnits(TOPUPAMOUNT);

    const tx = await connectedWallet.topUpAddress(address, AMOUNT_DEPOSIT);

    tx.wait();
    res.hash = tx.hash;
    res.message = String(
      `Amount  ${AMOUNT_DEPOSIT} TOPUP successfully to Address: ${address}:`
    );
    res.result = true;
    return res;
  } catch (error) {
    res.hash = String(`PKRUSD: ${PKRUSD}`);
    res.message = JSON.stringify((error as unknown as any).message);
    return res;
  }
}

export default topUpAddress;
