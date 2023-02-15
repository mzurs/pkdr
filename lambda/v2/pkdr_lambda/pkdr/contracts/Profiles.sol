// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import "./interfaces/IProfiles.sol";

// import "./IProfiles.sol";
// import "./PKDR.sol";
//states variables
//error
//events
//modifier
// constructor
// receive
// fallback
// external
// public
// internal
// private
// view or pure

//createProfile
//getVerifiedUser
// revokeVerifiedUser
// retainVerification
contract Profiles is
    IProfiles,
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    //states variables
    // admins array who controlled the users contract
    uint256 private _contractValue = 0;
    address private _iPkdrOrgAddresses;
    address[] private _userAddresses;
    bytes32 private multiSig = keccak256(abi.encodePacked("APPROVED"));
    bytes32 private revokeMultiSig = keccak256(abi.encodePacked("NULL"));
    // basic struct for users
    // struct User   {
    //     address userPubAddress;
    //     bool verificationStatus;
    // }

    // mapping for address to a user struct
    mapping(address => User) private users;

    //error
    error USER_EXISTS_AND_VERIFIED();
    error USER_NOT_EXISTS();

    //events
    event PROFILE_CREATED(address indexed user);
    event PROFILE_REVOKED(address indexed user);
    event PROFILE_RETAINED(address indexed user);
    event AMOUNT_RECEIVED_THROUGH_FALLBACK(uint256 fallbackAmount);
    event AMOUNT_RECEIVED_THROUGH_RECEIVE(uint256 receiveAmount);

    //modifier

    // check user Exists in mapping variable
    modifier userExists(address _user) {
        if (users[_user].verificationStatus == true) {
            revert USER_EXISTS_AND_VERIFIED();
        }
        _;
    }
    modifier userNotExists(address _user) {
        if (users[_user].verificationStatus == false) {
            revert USER_NOT_EXISTS();
        }
        _;
    }

    // constructor
    constructor() {
        _disableInitializers();
    }

    // receive
    receive() external payable {
        _contractValue += msg.value;
        emit AMOUNT_RECEIVED_THROUGH_RECEIVE(msg.value);
    }

    // fallback
    fallback() external payable {
        _contractValue += msg.value;
        emit AMOUNT_RECEIVED_THROUGH_FALLBACK(msg.value);
    }

    // external

    //create the profile of a given address in a mapping of a struct
    function createProfile(address _user) external onlyOwner userExists(_user) {
        users[_user] = User(_user, multiSig, true);
        _userAddresses.push(_user);
        emit PROFILE_CREATED(_user);
    }

    // retain verification of a user
    function retainVerification(
        address _user
    ) external onlyOwner userExists(_user) {
        users[_user].verificationStatus = true;
        users[_user].multiSig = multiSig;
        emit PROFILE_RETAINED(_user);
    }

    // revoke the verification status of a user
    function revokeVerifiedUser(
        address _user
    ) external onlyOwner userNotExists(_user) {
        users[_user].verificationStatus = false;
        users[_user].multiSig = revokeMultiSig;

        emit PROFILE_REVOKED(_user);
    }

    // public

    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    // internal

    // private
    function _getContractValue() private view returns (uint256) {
        return _contractValue;
    }

    // view or pure

    function getAdminAddress() external view onlyOwner returns (address) {
        return owner();
    }

    function getUser(address _user) external view returns (User memory) {
        return users[_user];
    }

    function getUsers() external view onlyOwner returns (address[] memory) {
        address[] memory _users = _userAddresses;
        return _users;
    }

    //retuns only the verification status for a user Address not other data present in struct
    function getVerifiedUser(address _user) external view returns (bool) {
        return users[_user].verificationStatus;
    }

    function getMultiSig(address _user) external view returns (bytes32) {
        return users[_user].multiSig;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
