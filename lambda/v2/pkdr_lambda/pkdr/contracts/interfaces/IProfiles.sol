// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

interface IProfiles {
    struct User {
        address userPubAddress;
        bytes32 multiSig;
        bool verificationStatus_I;
        bool verificationStatus_II;
        bool isStatusRevoked;
    }

    function createProfile(address _user) external;

    function retainVerification(address _user) external;

    function revokeVerifiedUser(address _user) external;

    function getVerifiedUser(address _user) external view returns (bool);

    function getAdminAddress() external view returns (address);

    function getUser(address _user) external view returns (User memory);

    function getUsers() external view returns (address[] memory);
}
