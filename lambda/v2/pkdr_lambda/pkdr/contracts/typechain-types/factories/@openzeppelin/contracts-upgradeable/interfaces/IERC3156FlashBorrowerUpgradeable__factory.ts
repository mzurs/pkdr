/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IERC3156FlashBorrowerUpgradeable,
  IERC3156FlashBorrowerUpgradeableInterface,
} from "../../../../@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashBorrowerUpgradeable";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "initiator",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onFlashLoan",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IERC3156FlashBorrowerUpgradeable__factory {
  static readonly abi = _abi;
  static createInterface(): IERC3156FlashBorrowerUpgradeableInterface {
    return new utils.Interface(
      _abi
    ) as IERC3156FlashBorrowerUpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC3156FlashBorrowerUpgradeable {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IERC3156FlashBorrowerUpgradeable;
  }
}
