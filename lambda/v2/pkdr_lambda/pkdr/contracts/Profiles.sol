// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

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

contract Profiles is OwnableUpgradeable{
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

    //events

    //modifier
    // modifier onlyOwner(){
    //     if(_iPkdrOrgAddresses[msg.sender]){

    //     }
    // require(bool(_iPkdrOrgAddresses[msg.sender]));
    // _;
    //     }

    // constructor
    constructor() {
        //set the owner of the contract into the array
        __Ownable_init();

        //
    }

    // receive

    // fallback

    // external
    function addAdmin(address newAdmin) external returns (bool) {}

    // public

    // internal

    // private

    // view or pure

    function getAdminAddresses() external view returns (address) {
        return _iPkdrOrgAddresses;
    }
}
