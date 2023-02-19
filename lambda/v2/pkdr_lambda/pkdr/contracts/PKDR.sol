// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20SnapshotUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import "./Profiles.sol";

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

/// @custom:security-contact zohaib10092001@gmail.com
contract PKDR is
    Initializable,
    ERC20Upgradeable,
    ERC20BurnableUpgradeable,
    ERC20SnapshotUpgradeable,
    OwnableUpgradeable,
    PausableUpgradeable,
    ERC20PermitUpgradeable,
    UUPSUpgradeable
{
    //states variables
    uint256 private _contractValue = 0;
        bytes32 private immutable _multiSig =
        keccak256(abi.encodePacked("APPROVED"));
    bytes32 private immutable _revokeMultiSig =
        keccak256(abi.encodePacked("NULL"));
    Profiles profiles;


    //error

    error USER_NOT_VERIFIED(address);
    error MULTISIG_REQUIRED(address);

    //events

    event AMOUNT_RECEIVED_THROUGH_FALLBACK(uint256 fallbackAmount);
    event AMOUNT_RECEIVED_THROUGH_RECEIVE(uint256 receiveAmount);
event TRANSFER_REQUIRED_MULTI_SIGNATURE(address);
event TRANSFER_REQUIRED_VERIFICATION_I(address);

    //modifier

    modifier isVerified(address _user) {
        require(_isVerified(_user), "USER_NOT_VERIFIED");
        _;
    }

    modifier isMultiSigApprove(address _user) {
        if(_getMultiSig(_user)==_revokeMultiSig){
            revert MULTISIG_REQUIRED(_user);
        }
        _;
    }

    // constructor

    /// @custom:oz-upgrades-unsafe-allow constructor
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

    // @dev function to initialize the Profile object as a storage in PKDR contract
    // @param _profiles is a address which is set to payable to fallback functions receiving ethers
    function setProfileAddress(address payable _profiles) external onlyOwner {
        profiles = Profiles(_profiles);
    }

    function mintTo(
        address to,
        uint256 amount
    ) external onlyOwner  {
        mint(to, amount);
    }

    function burn(
        uint256 amount
    ) public override onlyOwner {
        super.burn(amount);
    }

    function burnFrom(
        address account,
        uint256 amount
    ) public override onlyOwner {
        super.burnFrom(account, amount);
    }

    // public
    function initialize() public initializer {
        __ERC20_init("PKDR", "PKDR");
        __ERC20Burnable_init();
        __ERC20Snapshot_init();
        __Ownable_init();
        __Pausable_init();
        __ERC20Permit_init("PKDR");
        __UUPSUpgradeable_init();
    }

    function transfer(
        address to,
        uint256 amount
    ) public override returns (bool ) {

        require(_isVerified(msg.sender),"from: TRANSFER_REQUIRED_VERIFICATION_I");
        require(_isVerified(to),"to : TRANSFER_REQUIRED_VERIFICATION_I");
        require(_getMultiSig(msg.sender)==_multiSig,"from: TRANSFER_REQUIRED_MULTI_SIGNATURE");
        require(_getMultiSig(to)==_multiSig,"to: TRANSFER_REQUIRED_MULTI_SIGNATURE");

        return super.transfer(to, amount);
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override onlyOwner isVerified(from) isVerified(to) 
    isMultiSigApprove(from) isMultiSigApprove(to) 
    returns (bool) {
       return super.transferFrom(from, to, amount);
    }

    // internal
    function snapshot() internal onlyOwner {
        _snapshot();
    }

    function pause() internal onlyOwner {
        _pause();
    }

    function unpause() internal onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) internal onlyOwner {
        _mint(to, amount);
    }
    function _isVerified(address _user) internal view returns (bool) {
        bool status = profiles.getVerifiedUser(_user);
        return status;
    }


    function _getMultiSig(address _user)internal view returns(bytes32){
        return profiles.getMultiSig(_user);
    }


    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    )
        internal
        override(ERC20Upgradeable, ERC20SnapshotUpgradeable)
        whenNotPaused
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    // private

    // view or pure

    function getProfileAddress() external view onlyOwner returns (address) {
        return address(profiles);
    }

   
}
