import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import LendingPoolAbi from "../abis/LendingPool.json";
import USDCAbi from "../abis/USDC.json";
import WETHGatewayAbi from "../abis/WETHGateway.json";
import { USDC, WETHGateway } from "../typechain-types";
import { LendingPool } from "../typechain-types/LendingPool";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

// npx typechain --target ethers-v5 ./abis/WETHGateway.json --out-dir typechain-types
describe("AAVE", function () {

  const addressToImpersonate = "0xF977814e90dA44bFA03b6295A0616a897441aceC";
  const lendingPoolAddress = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";
  const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const ausdcAddress = "0xBcca60bB61934080951369a648Fb03DF4F96263C";
  const awethAddress = "0x030bA81f1c18d280636F32af80b9AAd02Cf0854e";
  const avwethAddress = "0xF63B34710400CAd3e044cFfDcAb00a0f32E33eCf"; // Variable Debt
  const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const wethGatewayAddress = "0xEFFC18fC3b7eb8E676dac549E0c693ad50D1Ce31";


  let lendingPool: LendingPool; 
  let usdc: USDC; 
  let weth: USDC; 
  let ausdc: USDC; // This is lazy but they are both ERC20 tokens
  let aweth: USDC; // This is lazy but they are both ERC20 tokens
  let avweth: USDC; // This is lazy but they are both ERC20 tokens
  let wethGateway: WETHGateway; 
  let richieRich: SignerWithAddress

  // [owner ] = await ethers.getSigners();

  before(async function () {

    lendingPool = await ethers.getContractAt(LendingPoolAbi, lendingPoolAddress) as LendingPool;
    usdc = await ethers.getContractAt(USDCAbi, usdcAddress) as USDC;
    weth = await ethers.getContractAt(USDCAbi, wethAddress) as USDC;
    ausdc = await ethers.getContractAt(USDCAbi, ausdcAddress) as USDC;
    aweth = await ethers.getContractAt(USDCAbi, awethAddress) as USDC;
    avweth = await ethers.getContractAt(USDCAbi, avwethAddress) as USDC;
    wethGateway = await ethers.getContractAt(WETHGatewayAbi, wethGatewayAddress) as WETHGateway;
    richieRich = await ethers.getImpersonatedSigner(addressToImpersonate);

  });

  async function getUserDetails(heading: string) {
    let userAccountData = await lendingPool.getUserAccountData(richieRich.address);
    const maxBorrowAmount = userAccountData.availableBorrowsETH;
    const healthFactor = userAccountData.healthFactor;
    console.log("---------------------------------------------------------------")
    console.log(`|                   ${heading}                        `)
    console.log("---------------------------------------------------------------")
    console.log("Total ETH Deposited: ", ethers.utils.formatEther(userAccountData.totalCollateralETH));
    console.log("Max Borrow Amount: ", ethers.utils.formatEther(maxBorrowAmount));
    console.log("Health Factor: ", ethers.utils.formatEther(healthFactor));
    console.log("---------------------------------------------------------------")
    return { maxBorrowAmount, healthFactor };
  }

  describe("AAVE", function () {
    it("1. Deposit USDC", async function () {
      const amount = ethers.utils.parseUnits("1000", 6);
      await usdc.connect(richieRich).approve(lendingPoolAddress, ethers.constants.MaxUint256);
      await lendingPool.connect(richieRich).deposit(usdcAddress, amount, richieRich.address, 0);
      const balance = await ausdc.balanceOf(richieRich.address);
      expect(balance).to.equal(amount);
      await getUserDetails("Deposit USDC");

    });

    it("2. Deposit ETH", async function () {
      const amount = ethers.utils.parseEther("1000");
      await wethGateway.connect(richieRich).depositETH(lendingPoolAddress, richieRich.address, 0, { value: amount });
      const balance = await aweth.balanceOf(richieRich.address);
      expect(balance).to.equal(amount);
    });

    it("3. Borrow wETH", async function () {

      let { maxBorrowAmount } = await getUserDetails("Borrow wETH - BEFORE");
      await lendingPool.connect(richieRich).borrow(wethAddress, maxBorrowAmount, 2, 0, richieRich.address);
      const balance = await avweth.balanceOf(richieRich.address);
      expect(balance).to.equal(maxBorrowAmount);
      await getUserDetails("Borrow wETH - AFTER");
    });
    it("4. Deposit wETH", async function () {
      const wethBorrowed = await avweth.balanceOf(richieRich.address);
      const oldAWethBalance = await aweth.balanceOf(richieRich.address);
      await weth.connect(richieRich).approve(lendingPoolAddress, ethers.constants.MaxUint256);
      await lendingPool.connect(richieRich).deposit(wethAddress, wethBorrowed, richieRich.address, 0);
      const balance = await aweth.balanceOf(richieRich.address);
      expect(balance).to.be.closeTo(wethBorrowed.add(oldAWethBalance), ethers.utils.parseEther("0.001"));
      await getUserDetails("Deposit wETH");
    });
    it("5. Borrow wETH", async function () {
      let { maxBorrowAmount } = await getUserDetails("Borrow wETH - BEFORE");
      await lendingPool.connect(richieRich).borrow(wethAddress, maxBorrowAmount.sub(ethers.utils.parseEther("1")), 2, 0, richieRich.address);
      await getUserDetails("Borrow wETH - AFTER");
    });
    it("6. Transfer All aTokens", async function () {
      const balance = await aweth.balanceOf(richieRich.address)
      await aweth.connect(richieRich).transfer(usdcAddress, ethers.utils.parseEther("75"));
      await getUserDetails("Transfer All aTokens");
    });
  });

});
