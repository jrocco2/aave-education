pragma solidity ^0.6.0;

contract ChainlinkOracle {
    uint256 public latestAnswer;

    constructor(uint256 _latestAnswer) public {
        latestAnswer = _latestAnswer;
    }
    function setLatestAnswer(uint256 amount) public returns (uint256) {
        latestAnswer = amount;
    }

}
