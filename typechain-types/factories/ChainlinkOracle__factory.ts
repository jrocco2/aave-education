/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  ChainlinkOracle,
  ChainlinkOracleInterface,
} from "../ChainlinkOracle";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_latestAnswer",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "latestAnswer",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "setLatestAnswer",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516101363803806101368339818101604052602081101561003357600080fd5b8101908080519060200190929190505050806000819055505060dc8061005a6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806320aa1b8014603757806350d25bcd146076575b600080fd5b606060048036036020811015604b57600080fd5b81019080803590602001909291905050506092565b6040518082815260200191505060405180910390f35b607c60a0565b6040518082815260200191505060405180910390f35b600081600081905550919050565b6000548156fea2646970667358221220f64877bb744266b4cff33444ed6707175069fd90f52f24dbe64c9ac14930f3d564736f6c634300060c0033";

type ChainlinkOracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ChainlinkOracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ChainlinkOracle__factory extends ContractFactory {
  constructor(...args: ChainlinkOracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _latestAnswer: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ChainlinkOracle> {
    return super.deploy(
      _latestAnswer,
      overrides || {}
    ) as Promise<ChainlinkOracle>;
  }
  override getDeployTransaction(
    _latestAnswer: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_latestAnswer, overrides || {});
  }
  override attach(address: string): ChainlinkOracle {
    return super.attach(address) as ChainlinkOracle;
  }
  override connect(signer: Signer): ChainlinkOracle__factory {
    return super.connect(signer) as ChainlinkOracle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ChainlinkOracleInterface {
    return new utils.Interface(_abi) as ChainlinkOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ChainlinkOracle {
    return new Contract(address, _abi, signerOrProvider) as ChainlinkOracle;
  }
}
