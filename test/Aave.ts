import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import LendingPoolAbi from "../abis/LendingPool.json";
import USDCAbi from "../abis/USDC.json";
import { USDC } from "../typechain-types";
import { LendingPool } from "../typechain-types/LendingPool";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

// hh node --fork https://eth-mainnet.g.alchemy.com/v2/TDkb5d4PAS74xENcL11MQKUUaAYMxxeu 
describe("AAVE", function () {

  const addressToImpersonate = "0xF977814e90dA44bFA03b6295A0616a897441aceC";
  const lendingPoolAddress = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";
  const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const ausdcAddress = "0xBcca60bB61934080951369a648Fb03DF4F96263C";


  let lendingPool: LendingPool; 
  let usdc: USDC; 
  let ausdc: USDC; // This is lazy but they are both ERC20 tokens
  let richieRich: SignerWithAddress

  // [owner ] = await ethers.getSigners();

  before(async function () {
      // Fork Network
      // await helpers.reset(rpc, blockNumber);

    lendingPool = await ethers.getContractAt(LendingPoolAbi, lendingPoolAddress) as LendingPool;
    usdc = await ethers.getContractAt(USDCAbi, usdcAddress) as USDC;
    ausdc = await ethers.getContractAt(USDCAbi, ausdcAddress) as USDC;
    richieRich = await ethers.getImpersonatedSigner(addressToImpersonate);

  });

  describe("1. Deposit USDC into Lending Pool", function () {
    it("Should deposit", async function () {
      const amount = ethers.utils.parseUnits("1000", 6);
      await usdc.connect(richieRich).approve(lendingPoolAddress, ethers.constants.MaxUint256);
      await lendingPool.connect(richieRich).deposit(usdcAddress, amount, richieRich.address, 0);
      const balance = await ausdc.balanceOf(richieRich.address);
      expect(balance).to.equal(amount);
    });

  });

});
