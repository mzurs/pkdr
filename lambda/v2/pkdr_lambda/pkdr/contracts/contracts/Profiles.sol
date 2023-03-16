// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
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
    uint256 private _usersCount=0;
    address private _iPkdrOrgAddresses;
    address[] private _userAddresses;
    bytes32 private immutable _multiSig =
        keccak256(abi.encodePacked("APPROVED"));
    bytes32 private immutable _revokeMultiSig =
        keccak256(abi.encodePacked("NULL"));

    // mapping for address to a user struct
    mapping(address => User) private users;

    //error

    error USER_EXISTS_AND_VERIFIED();
    error USER_NOT_EXISTS();
    error USER_STATUS_NOT_REVOKED();
    error USER_STATUS_ALREADY_REVOKED();

    //events

    event PROFILE_CREATED(address indexed user);
    event PROFILE_REVOKED(address user);
    event PROFILE_RETAINED(address user);
    event AMOUNT_RECEIVED_THROUGH_FALLBACK(uint256 fallbackAmount);
    event AMOUNT_RECEIVED_THROUGH_RECEIVE(uint256 receiveAmount);
    event MULTISIG_RETAINED(address user);
    event MULTISIG_REVOKED(address user);
    event ZK_VERIFICATION_REVOKED(address _user);
    event ZK_VERIFICATION_RETAINED(address _user);

    //modifier

    // check user Exists in mapping variable
    modifier userExists(address _user) {
        if (users[_user].verificationStatus_I) {
            revert USER_EXISTS_AND_VERIFIED();
        }
        _;
    }

    modifier userNotExists(address _user) {
        if (!users[_user].verificationStatus_I) {
            revert USER_NOT_EXISTS();
        }
        _;
    }

    modifier isStatusNotRevoked(address _user) {
        if (!users[_user].isStatusRevoked) {
            revert USER_STATUS_NOT_REVOKED();
        }
        _;
    }

    modifier isStatusRevoked(address _user) {
        if (users[_user].isStatusRevoked) {
            revert USER_STATUS_ALREADY_REVOKED();
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
        users[_user] = User(_user, _multiSig, true, false, false);
        _userAddresses.push(_user);
        _usersCount++;
        emit PROFILE_CREATED(_user);
    }

    // retain verification of a user
    function retainVerification(
        address _user
    ) external onlyOwner userNotExists(_user) isStatusNotRevoked(_user) {
        users[_user].isStatusRevoked = false;

        emit PROFILE_RETAINED(_user);
    }

    // revoke the verification status of a user
    function revokeVerifiedUser(
        address _user
    ) external onlyOwner userNotExists(_user) isStatusRevoked(_user) {
        users[_user].isStatusRevoked = true;

        emit PROFILE_REVOKED(_user);
    }

    function retainMultiSignature(
        address _user
    ) external onlyOwner userNotExists(_user) {
        require(
            users[_user].multiSig == _revokeMultiSig,
            "MULTI_SIGNATURE ALREADY RETAINED "
        );
        users[_user].multiSig = _multiSig;
    }

    function revokeMultiSignature(
        address _user
    ) external onlyOwner userNotExists(_user) {
        require(
            users[_user].multiSig == _multiSig,
            "MULTI_SIGNATURE ALREADY REVOKED "
        );
        users[_user].multiSig = _revokeMultiSig;
        emit MULTISIG_REVOKED(_user);
    }

    function revokeZkVerification(
        address _user
    ) external onlyOwner userNotExists(_user) {
        require(
            users[_user].verificationStatus_II,
            "ZK_VERIFICATION ALREADY REVOKED "
        );
        users[_user].verificationStatus_II = false;
        emit ZK_VERIFICATION_REVOKED(_user);
    }

    function retainZkVerification(
        address _user
    ) external onlyOwner userNotExists(_user) {
        require(
            !users[_user].verificationStatus_II,
            "ZK_VERIFICATION ALREADY RETAINED"
        );
        users[_user].verificationStatus_II = true;
        emit ZK_VERIFICATION_RETAINED(_user);
    }

    // public

    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    // internal

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    // private
    function _getContractValue() private view returns (uint256) {
        return _contractValue;
    }

    // view or pure

    function getAdminAddress() external view onlyOwner returns (address) {
        return owner();
    }

    function getUser(
        address _user
    ) external view userNotExists(_user) returns (User memory) {
        return users[_user];
    }

    function getUsers() external view onlyOwner returns (address[] memory) {
        address[] memory _users = _userAddresses;
        return _users;
    }

    //retuns only the verification status for a user Address not other data present in struct
    function getVerifiedUser(
        address _user
    ) external view userNotExists(_user) returns (bool) {
        if (users[_user].isStatusRevoked) {
            return false;
        } else {
            return users[_user].verificationStatus_I;
        }
    }

    function getMultiSig(
        address _user
    ) external view userNotExists(_user) returns (bytes32) {
        return users[_user].multiSig;
    }
    function getUsersCount() external view onlyOwner returns (uint256){
        return _usersCount;
    }
}
