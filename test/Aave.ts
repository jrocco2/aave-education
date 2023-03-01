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

  const addressToImpersonate = "0x55FE002aefF02F77364de339a1292923A15844B8";
  const lendingPoolAddress = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";
  const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  let lendingPool: LendingPool; 
  let usdc: USDC; 
  let richieRich: SignerWithAddress

  // [owner ] = await ethers.getSigners();

  before(async function () {
    lendingPool = await ethers.getContractAt(LendingPoolAbi, lendingPoolAddress) as LendingPool;
    usdc = await ethers.getContractAt(USDCAbi, usdcAddress) as USDC;
    richieRich = await ethers.getImpersonatedSigner(addressToImpersonate);

  });

  describe("1. Deposit USDC into Lending Pool", function () {
    it("Should deposit", async function () {
      await usdc.connect(richieRich).approve(lendingPoolAddress, 1000000000000);
      await lendingPool.connect(richieRich).deposit(usdcAddress, 1000000000000, 0);
      
    });

  });

});
