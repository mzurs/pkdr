// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

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

contract Profiles is Ownable {
    //states variables
    // admins array who controlled the users contract
    address private _iPkdrOrgAddresses;

    // basic struct for users
    struct user {
        bool verificationStatus;
    }

    // mapping for address to a user struct
    mapping(address => user) users;

    //error
    error USER_EXISTS_AND_VERIFIED();

    //events
    event PROFILE_CREATED(address);
    event PROFILE_REVOKED(address);
    event PROFILE_RETAINED(address);

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
            revert USER_EXISTS_AND_VERIFIED();
        }
        _;
    }

    // constructor
    // set the owner of the contract into the Ownable contract
    constructor() Ownable() {}

    // receive

    // fallback

    // external
    function createProfile(address _user) external onlyOwner userExists(_user) {
        users[_user].verificationStatus = true;
        emit PROFILE_CREATED(_user);
    }

    // retain verification of a user
    function retainVerification(
        address _user
    ) external onlyOwner userExists(_user) {
        users[_user].verificationStatus = true;
        emit PROFILE_RETAINED(_user);
    }

    // revoke the verification status of a user
    function revokeVerifiedUser(
        address _user
    ) external onlyOwner userNotExists(_user) {
        users[_user].verificationStatus = false;
        emit PROFILE_REVOKED(_user);
    }

    // public

    // internal

    // private

    // view or pure

    function getAdminAddress() external view onlyOwner returns (address) {
        return owner();
    }
}
