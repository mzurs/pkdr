// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// import "./PriceConverter.sol";

contract topUp {
    // using PriceConverter for uint256;
    uint256 private TOPUP_AMOUNT_IN_PKR = 20;
    address private immutable i_pkdrOrgAddress;
    AggregatorV3Interface private s_priceFeed;

    //errors
    error ONLY_OWNER_CAN_CALL();
    error TOPUP_FAILED();

    //events
    event topUpCompleted(address to, uint256 amount);
    event amountDeposited(address from, uint256 amount);

    modifier onlyPkdrOrg() {
        if (msg.sender != i_pkdrOrgAddress) revert ONLY_OWNER_CAN_CALL();
        _;
    }

    //// constructor
    //// receive
    //// fallback
    //// external
    //// public
    //// internal
    //// private
    //// view / pure

    //1.constructor
    constructor(address priceFeed) {
        s_priceFeed = AggregatorV3Interface(priceFeed);

        i_pkdrOrgAddress = msg.sender;
    }

    //2.receive
    // This function is called for plain Ether transfers, i.e.
    // for every call with empty calldata.
    receive() external payable {
        emit amountDeposited(msg.sender, msg.value); //event to receive matic
    }

    //3. fallback
    // Any call with non-empty calldata to this contract will execute
    // the fallback function (even if Ether is sent along with the call).
    fallback() external payable {
        emit amountDeposited(msg.sender, msg.value);
    }

    //4.external
    //5.public
    function getPrice() public view returns (uint256) {
        (, int256 answer, , , ) = s_priceFeed.latestRoundData();
        // ETH/USD rate in 18 digit
        return uint256(answer * 10000000000);
    }

    function topUpAddress(address payable _to, uint256 amount)
        public
        onlyPkdrOrg
        returns (uint256)
    {
        (bool success, ) = _to.call{value: amount}("");

        require(success);

        emit topUpCompleted(_to, amount);

        return amount;
    }

    function topUpContract() public payable onlyPkdrOrg {
        emit amountDeposited(msg.sender, msg.value);
    }

    //6. internal

    //7.private

    // 8. View and pure functions

    function getPkdrAddress() public view onlyPkdrOrg returns (address) {
        return i_pkdrOrgAddress;
    }

    function getContractBalance() public view onlyPkdrOrg returns (uint256) {
        return address(this).balance;
    }
}
