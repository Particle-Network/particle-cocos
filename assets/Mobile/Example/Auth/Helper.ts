
import JsonRpcRequest from '../../Core/NetService/NetService';
import { SerializeTransactionParams, SolanaReqBodyMethod } from '../../Core/NetService/NetParams';
import BigNumber from 'bignumber.js';
import { EvmService } from '../../Core/NetService/EvmService';
import { HexConverter } from '../../Core/NetService/hex-converter';

export async function getSolanaTransaction(from: string, to: string, amount: number) {
    // mock a solana native transaction
    // send some native on solana devnet

    const sender = from;
    const receiver = to;
    const obj = { sender: sender, receiver: receiver, lamports: amount };
    const rpcUrl = 'https://rpc.particle.network/';
    const pathname = 'solana';
    const chainId = 103;

    const result = await JsonRpcRequest(
        rpcUrl,
        pathname,
        SolanaReqBodyMethod.enhancedSerializeTransaction,
        [SerializeTransactionParams.transferSol, obj],
        chainId
    );

    console.log(result.transaction.serialized);
    return result.transaction.serialized;
}

export async function getSplTokenTransaction(from: string, to: string, amount: number, mintAddress: string) {
    // mock a solana spl token transaction
    // send some spl token on solana devnet

    const sender = from;
    const receiver = to;
    const obj = { sender: sender, receiver: receiver, amount: amount, mint: mintAddress };
    const rpcUrl = 'https://rpc.particle.network/';
    const pathname = 'solana';
    const chainId = 103;

    const result = await JsonRpcRequest(
        rpcUrl,
        pathname,
        SolanaReqBodyMethod.enhancedSerializeTransaction,
        [SerializeTransactionParams.transferToken, obj],
        chainId
    );

    console.log(result.transaction.serialized);
    return result.transaction.serialized;
}

export async function getEthereumTransacion(from: string, to: string, amount: string) {
    // mock a evm native transaction,
    // type is 0x2, should work in Ethereum, Polygon and other blockchains which support EIP1559
    // send 0.01 native
    const data = '0x';
    const gasLimit = await EvmService.estimateGas(from, to, '0x0', data);
    console.log(`gasLimit = ${gasLimit}`);
    const gasFeesResult = await EvmService.suggeseGasFee();
    console.log(`gasFeesResult = ${gasFeesResult}`);
    const maxFeePerGas = gasFeesResult.high.maxFeePerGas;
    const maxFeePerGasHex = '0x' + BigNumber(maxFeePerGas * Math.pow(10, 9)).toString(16);

    const maxPriorityFeePerGas = gasFeesResult.high.maxPriorityFeePerGas;
    const maxPriorityFeePerGasHex = '0x' + BigNumber(maxPriorityFeePerGas * Math.pow(10, 9)).toString(16);

    const chainId = EvmService.currentChainInfo.chain_id;

    console.log(`chainid = ${chainId}`);
    const value = '0x' + BigNumber(amount).toString(16);
    const transaction = {
        from: from,
        to: to,
        data: data,
        gasLimit: gasLimit,
        value: value,
        type: '0x2',
        chainId: '0x' + chainId.toString(16),
        maxPriorityFeePerGas: maxPriorityFeePerGasHex,
        maxFeePerGas: maxFeePerGasHex,
    };

    console.log(transaction);
    const serialized = HexConverter.jsonToHexString(transaction);

    return '0x' + serialized;
}

export async function getEthereumTransacionLegacy(from: string, to: string, amount: string) {
    // mock a evm native transaction,
    // type is 0x0, should work in BSC and other blockchains which don't support EIP1559
    // send 0.01 native

    const data = '0x';

    const gasLimit = await EvmService.estimateGas(from, to, '0x0', data);
    console.log(`gasLimit = ${gasLimit}`);
    const gasFeesResult = await EvmService.suggeseGasFee();
    console.log(`gasFeesResult = ${gasFeesResult}`);
    const maxFeePerGas = gasFeesResult.high.maxFeePerGas;
    const maxFeePerGasHex = '0x' + BigNumber(maxFeePerGas * Math.pow(10, 9)).toString(16);

    const chainId = EvmService.currentChainInfo.chain_id;

    const value = '0x' + BigNumber(amount).toString(16);
    const transaction = {
        from: from,
        to: to,
        data: data,
        gasLimit: gasLimit,
        value: value,
        type: '0x0',
        chainId: '0x' + chainId.toString(16),
        gasPrice: maxFeePerGasHex,
    };

    console.log(transaction);
    const serialized = HexConverter.jsonToHexString(transaction);
    return '0x' + serialized;
}

export async function getEvmTokenTransaction(from: string, to: string, amount: string, contractAddress: string) {
    // mock a evm token transaction,
    // type is 0x2, should work in Ethereum, Polygon and other blockchains which support EIP1559
    // send 0.01 token

    const data = await EvmService.erc20Transfer(contractAddress, to, amount);
    console.log(`data = ${data}`);
    const gasLimit = await EvmService.estimateGas(from, contractAddress, '0x0', data);
    console.log(`gasLimit = ${gasLimit}`);
    const gasFeesResult = await EvmService.suggeseGasFee();
    console.log(`gasFeesResult = ${gasFeesResult}`);

    const maxFeePerGas = gasFeesResult.high.maxFeePerGas;
    const maxFeePerGasHex = '0x' + BigNumber(maxFeePerGas * Math.pow(10, 9)).toString(16);

    const maxPriorityFeePerGas = gasFeesResult.high.maxPriorityFeePerGas;
    const maxPriorityFeePerGasHex = '0x' + BigNumber(maxPriorityFeePerGas * Math.pow(10, 9)).toString(16);

    const chainId = EvmService.currentChainInfo.chain_id;

    const transaction = {
        from: from,
        to: contractAddress,
        data: data,
        gasLimit: gasLimit,
        value: '0x0',
        type: '0x2',
        chainId: '0x' + chainId.toString(16),
        maxPriorityFeePerGas: maxPriorityFeePerGasHex,
        maxFeePerGas: maxFeePerGasHex,
    };

    console.log(transaction);
    const serialized = HexConverter.jsonToHexString(transaction);
    return '0x' + serialized;
}

export async function getEvmTokenTransactionLegacy(from: string, to: string, amount: string, contractAddress: string) {
    // mock a evm token transaction,
    // type is 0x0, should work in BSC and other blockchains which don't support EIP1559
    // send 0.01 token

    const data = await EvmService.erc20Transfer(contractAddress, to, amount);
    console.log(`data = ${data}`);
    const gasLimit = await EvmService.estimateGas(from, contractAddress, '0x0', data);
    console.log(`gasLimit = ${gasLimit}`);
    const gasFeesResult = await EvmService.suggeseGasFee();
    console.log(`gasFeesResult = ${gasFeesResult}`);

    const maxFeePerGas = gasFeesResult.high.maxFeePerGas;
    const maxFeePerGasHex = '0x' + BigNumber(maxFeePerGas * Math.pow(10, 9)).toString(16);

    const chainId = EvmService.currentChainInfo.chain_id;

    const transaction = {
        from: from,
        to: contractAddress,
        data: data,
        gasLimit: gasLimit,
        value: '0x0',
        type: '0x0',
        chainId: '0x' + chainId.toString(16),
        gasPrice: maxFeePerGasHex,
    };

    console.log(transaction);
    const serialized = HexConverter.jsonToHexString(transaction);
    return '0x' + serialized;
}
