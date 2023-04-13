

import { EvmService } from '../NetService/EvmService';
import { SolanaService } from '../NetService/SolanaService';
import type { ConnectionOptions, RequestArguments } from './types';



export function sendEVMRpc(args: RequestArguments, config: ConnectionOptions) {
    return EvmService.rpc(args.method, args.params)
}

export function sendSolanaRpc(args: RequestArguments, config: ConnectionOptions) {
    return SolanaService.rpc(args.method, args.params)
}

