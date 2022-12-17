const { ethers, waffle } = require("hardhat");
const { expect } = require("chai");
const { BigNumber, utils } = require("ethers");

describe("Attack", function () {
  it("Should be able to guess the exact number", async () => {
    // Deploy the Game contract
    const Game = await ethers.getContractFactory("Game");
    const _game = await Game.deploy({ value: utils.parseEther("0.1") });
    await _game.deployed();
    console.log("Game Contract's Address:", _game.address);

    // Deploy the Attack contract
    const Attack = await ethers.getContractFactory("Attack");
    const _attack = await Attack.deploy(_game.address);
    await _attack.deployed();
    console.log("Attack Contract's Address:", _attack.address);

    // Attack the Game contract
    let tx = await _attack.attack();
    const balanceGame = await _game.getBalance();

    // Balance of the Game contract should be 0
    expect(balanceGame).to.be.equal(BigNumber.from("0"));
  });
});
