/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace IProfiles {
  export type UserStruct = {
    userPubAddress: PromiseOrValue<string>;
    multiSig: PromiseOrValue<BytesLike>;
    verificationStatus_I: PromiseOrValue<boolean>;
    verificationStatus_II: PromiseOrValue<boolean>;
    isStatusRevoked: PromiseOrValue<boolean>;
  };

  export type UserStructOutput = [string, string, boolean, boolean, boolean] & {
    userPubAddress: string;
    multiSig: string;
    verificationStatus_I: boolean;
    verificationStatus_II: boolean;
    isStatusRevoked: boolean;
  };
}

export interface ProfilesInterface extends utils.Interface {
  functions: {
    "createProfile(address)": FunctionFragment;
    "getAdminAddress()": FunctionFragment;
    "getMultiSig(address)": FunctionFragment;
    "getUser(address)": FunctionFragment;
    "getUsers()": FunctionFragment;
    "getUsersCount()": FunctionFragment;
    "getVerifiedUser(address)": FunctionFragment;
    "initialize()": FunctionFragment;
    "owner()": FunctionFragment;
    "proxiableUUID()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "retainMultiSignature(address)": FunctionFragment;
    "retainVerification(address)": FunctionFragment;
    "retainZkVerification(address)": FunctionFragment;
    "revokeMultiSignature(address)": FunctionFragment;
    "revokeVerifiedUser(address)": FunctionFragment;
    "revokeZkVerification(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "upgradeTo(address)": FunctionFragment;
    "upgradeToAndCall(address,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createProfile"
      | "getAdminAddress"
      | "getMultiSig"
      | "getUser"
      | "getUsers"
      | "getUsersCount"
      | "getVerifiedUser"
      | "initialize"
      | "owner"
      | "proxiableUUID"
      | "renounceOwnership"
      | "retainMultiSignature"
      | "retainVerification"
      | "retainZkVerification"
      | "revokeMultiSignature"
      | "revokeVerifiedUser"
      | "revokeZkVerification"
      | "transferOwnership"
      | "upgradeTo"
      | "upgradeToAndCall"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createProfile",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAdminAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getMultiSig",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUser",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "getUsers", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getUsersCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVerifiedUser",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "retainMultiSignature",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "retainVerification",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "retainZkVerification",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeMultiSignature",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeVerifiedUser",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeZkVerification",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeTo",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "createProfile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAdminAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMultiSig",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getUser", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getUsers", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getUsersCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVerifiedUser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "retainMultiSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "retainVerification",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "retainZkVerification",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeMultiSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeVerifiedUser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "revokeZkVerification",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "upgradeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;

  events: {
    "AMOUNT_RECEIVED_THROUGH_FALLBACK(uint256)": EventFragment;
    "AMOUNT_RECEIVED_THROUGH_RECEIVE(uint256)": EventFragment;
    "AdminChanged(address,address)": EventFragment;
    "BeaconUpgraded(address)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "MULTISIG_RETAINED(address)": EventFragment;
    "MULTISIG_REVOKED(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "PROFILE_CREATED(address)": EventFragment;
    "PROFILE_RETAINED(address)": EventFragment;
    "PROFILE_REVOKED(address)": EventFragment;
    "Upgraded(address)": EventFragment;
    "ZK_VERIFICATION_RETAINED(address)": EventFragment;
    "ZK_VERIFICATION_REVOKED(address)": EventFragment;
  };

  getEvent(
    nameOrSignatureOrTopic: "AMOUNT_RECEIVED_THROUGH_FALLBACK"
  ): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "AMOUNT_RECEIVED_THROUGH_RECEIVE"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "BeaconUpgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MULTISIG_RETAINED"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MULTISIG_REVOKED"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PROFILE_CREATED"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PROFILE_RETAINED"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PROFILE_REVOKED"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Upgraded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ZK_VERIFICATION_RETAINED"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ZK_VERIFICATION_REVOKED"): EventFragment;
}

export interface AMOUNT_RECEIVED_THROUGH_FALLBACKEventObject {
  fallbackAmount: BigNumber;
}
export type AMOUNT_RECEIVED_THROUGH_FALLBACKEvent = TypedEvent<
  [BigNumber],
  AMOUNT_RECEIVED_THROUGH_FALLBACKEventObject
>;

export type AMOUNT_RECEIVED_THROUGH_FALLBACKEventFilter =
  TypedEventFilter<AMOUNT_RECEIVED_THROUGH_FALLBACKEvent>;

export interface AMOUNT_RECEIVED_THROUGH_RECEIVEEventObject {
  receiveAmount: BigNumber;
}
export type AMOUNT_RECEIVED_THROUGH_RECEIVEEvent = TypedEvent<
  [BigNumber],
  AMOUNT_RECEIVED_THROUGH_RECEIVEEventObject
>;

export type AMOUNT_RECEIVED_THROUGH_RECEIVEEventFilter =
  TypedEventFilter<AMOUNT_RECEIVED_THROUGH_RECEIVEEvent>;

export interface AdminChangedEventObject {
  previousAdmin: string;
  newAdmin: string;
}
export type AdminChangedEvent = TypedEvent<
  [string, string],
  AdminChangedEventObject
>;

export type AdminChangedEventFilter = TypedEventFilter<AdminChangedEvent>;

export interface BeaconUpgradedEventObject {
  beacon: string;
}
export type BeaconUpgradedEvent = TypedEvent<
  [string],
  BeaconUpgradedEventObject
>;

export type BeaconUpgradedEventFilter = TypedEventFilter<BeaconUpgradedEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface MULTISIG_RETAINEDEventObject {
  user: string;
}
export type MULTISIG_RETAINEDEvent = TypedEvent<
  [string],
  MULTISIG_RETAINEDEventObject
>;

export type MULTISIG_RETAINEDEventFilter =
  TypedEventFilter<MULTISIG_RETAINEDEvent>;

export interface MULTISIG_REVOKEDEventObject {
  user: string;
}
export type MULTISIG_REVOKEDEvent = TypedEvent<
  [string],
  MULTISIG_REVOKEDEventObject
>;

export type MULTISIG_REVOKEDEventFilter =
  TypedEventFilter<MULTISIG_REVOKEDEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface PROFILE_CREATEDEventObject {
  user: string;
}
export type PROFILE_CREATEDEvent = TypedEvent<
  [string],
  PROFILE_CREATEDEventObject
>;

export type PROFILE_CREATEDEventFilter = TypedEventFilter<PROFILE_CREATEDEvent>;

export interface PROFILE_RETAINEDEventObject {
  user: string;
}
export type PROFILE_RETAINEDEvent = TypedEvent<
  [string],
  PROFILE_RETAINEDEventObject
>;

export type PROFILE_RETAINEDEventFilter =
  TypedEventFilter<PROFILE_RETAINEDEvent>;

export interface PROFILE_REVOKEDEventObject {
  user: string;
}
export type PROFILE_REVOKEDEvent = TypedEvent<
  [string],
  PROFILE_REVOKEDEventObject
>;

export type PROFILE_REVOKEDEventFilter = TypedEventFilter<PROFILE_REVOKEDEvent>;

export interface UpgradedEventObject {
  implementation: string;
}
export type UpgradedEvent = TypedEvent<[string], UpgradedEventObject>;

export type UpgradedEventFilter = TypedEventFilter<UpgradedEvent>;

export interface ZK_VERIFICATION_RETAINEDEventObject {
  _user: string;
}
export type ZK_VERIFICATION_RETAINEDEvent = TypedEvent<
  [string],
  ZK_VERIFICATION_RETAINEDEventObject
>;

export type ZK_VERIFICATION_RETAINEDEventFilter =
  TypedEventFilter<ZK_VERIFICATION_RETAINEDEvent>;

export interface ZK_VERIFICATION_REVOKEDEventObject {
  _user: string;
}
export type ZK_VERIFICATION_REVOKEDEvent = TypedEvent<
  [string],
  ZK_VERIFICATION_REVOKEDEventObject
>;

export type ZK_VERIFICATION_REVOKEDEventFilter =
  TypedEventFilter<ZK_VERIFICATION_REVOKEDEvent>;

export interface Profiles extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ProfilesInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createProfile(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAdminAddress(overrides?: CallOverrides): Promise<[string]>;

    getMultiSig(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getUser(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[IProfiles.UserStructOutput]>;

    getUsers(overrides?: CallOverrides): Promise<[string[]]>;

    getUsersCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    getVerifiedUser(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    initialize(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    proxiableUUID(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    retainMultiSignature(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    retainVerification(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    retainZkVerification(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revokeMultiSignature(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revokeVerifiedUser(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    revokeZkVerification(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  createProfile(
    _user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAdminAddress(overrides?: CallOverrides): Promise<string>;

  getMultiSig(
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getUser(
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<IProfiles.UserStructOutput>;

  getUsers(overrides?: CallOverrides): Promise<string[]>;

  getUsersCount(overrides?: CallOverrides): Promise<BigNumber>;

  getVerifiedUser(
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  initialize(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  proxiableUUID(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  retainMultiSignature(
    _user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  retainVerification(
    _user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  retainZkVerification(
    _user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revokeMultiSignature(
    _user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revokeVerifiedUser(
    _user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  revokeZkVerification(
    _user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeTo(
    newImplementation: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  upgradeToAndCall(
    newImplementation: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createProfile(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAdminAddress(overrides?: CallOverrides): Promise<string>;

    getMultiSig(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getUser(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<IProfiles.UserStructOutput>;

    getUsers(overrides?: CallOverrides): Promise<string[]>;

    getUsersCount(overrides?: CallOverrides): Promise<BigNumber>;

    getVerifiedUser(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(overrides?: CallOverrides): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    proxiableUUID(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    retainMultiSignature(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    retainVerification(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    retainZkVerification(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeMultiSignature(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeVerifiedUser(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeZkVerification(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AMOUNT_RECEIVED_THROUGH_FALLBACK(uint256)"(
      fallbackAmount?: null
    ): AMOUNT_RECEIVED_THROUGH_FALLBACKEventFilter;
    AMOUNT_RECEIVED_THROUGH_FALLBACK(
      fallbackAmount?: null
    ): AMOUNT_RECEIVED_THROUGH_FALLBACKEventFilter;

    "AMOUNT_RECEIVED_THROUGH_RECEIVE(uint256)"(
      receiveAmount?: null
    ): AMOUNT_RECEIVED_THROUGH_RECEIVEEventFilter;
    AMOUNT_RECEIVED_THROUGH_RECEIVE(
      receiveAmount?: null
    ): AMOUNT_RECEIVED_THROUGH_RECEIVEEventFilter;

    "AdminChanged(address,address)"(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;
    AdminChanged(
      previousAdmin?: null,
      newAdmin?: null
    ): AdminChangedEventFilter;

    "BeaconUpgraded(address)"(
      beacon?: PromiseOrValue<string> | null
    ): BeaconUpgradedEventFilter;
    BeaconUpgraded(
      beacon?: PromiseOrValue<string> | null
    ): BeaconUpgradedEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "MULTISIG_RETAINED(address)"(user?: null): MULTISIG_RETAINEDEventFilter;
    MULTISIG_RETAINED(user?: null): MULTISIG_RETAINEDEventFilter;

    "MULTISIG_REVOKED(address)"(user?: null): MULTISIG_REVOKEDEventFilter;
    MULTISIG_REVOKED(user?: null): MULTISIG_REVOKEDEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "PROFILE_CREATED(address)"(
      user?: PromiseOrValue<string> | null
    ): PROFILE_CREATEDEventFilter;
    PROFILE_CREATED(
      user?: PromiseOrValue<string> | null
    ): PROFILE_CREATEDEventFilter;

    "PROFILE_RETAINED(address)"(user?: null): PROFILE_RETAINEDEventFilter;
    PROFILE_RETAINED(user?: null): PROFILE_RETAINEDEventFilter;

    "PROFILE_REVOKED(address)"(user?: null): PROFILE_REVOKEDEventFilter;
    PROFILE_REVOKED(user?: null): PROFILE_REVOKEDEventFilter;

    "Upgraded(address)"(
      implementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;
    Upgraded(
      implementation?: PromiseOrValue<string> | null
    ): UpgradedEventFilter;

    "ZK_VERIFICATION_RETAINED(address)"(
      _user?: null
    ): ZK_VERIFICATION_RETAINEDEventFilter;
    ZK_VERIFICATION_RETAINED(_user?: null): ZK_VERIFICATION_RETAINEDEventFilter;

    "ZK_VERIFICATION_REVOKED(address)"(
      _user?: null
    ): ZK_VERIFICATION_REVOKEDEventFilter;
    ZK_VERIFICATION_REVOKED(_user?: null): ZK_VERIFICATION_REVOKEDEventFilter;
  };

  estimateGas: {
    createProfile(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAdminAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getMultiSig(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUser(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUsers(overrides?: CallOverrides): Promise<BigNumber>;

    getUsersCount(overrides?: CallOverrides): Promise<BigNumber>;

    getVerifiedUser(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    proxiableUUID(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    retainMultiSignature(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    retainVerification(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    retainZkVerification(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revokeMultiSignature(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revokeVerifiedUser(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    revokeZkVerification(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createProfile(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAdminAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getMultiSig(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUser(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUsers(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getUsersCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getVerifiedUser(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proxiableUUID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    retainMultiSignature(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    retainVerification(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    retainZkVerification(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revokeMultiSignature(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revokeVerifiedUser(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    revokeZkVerification(
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeTo(
      newImplementation: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    upgradeToAndCall(
      newImplementation: PromiseOrValue<string>,
      data: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
