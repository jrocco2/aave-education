import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-etherscan-abi";

const config: HardhatUserConfig = {
  networks: {
    mainnet: {
      url: "https://eth-mainnet.g.alchemy.com/v2/TDkb5d4PAS74xENcL11MQKUUaAYMxxeu",
    },
  },
  solidity: {
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "istanbul",
    },
    compilers: [
      {
        version: "0.8.9",
      },
      {
        version: "0.6.12",
        settings: {},
      },
    ],
    
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "6DKHW4EGTT88DHFGHU139CH5FRVK9PF3ZW"
  }
};

export default config;
