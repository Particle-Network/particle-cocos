

import { EvmService } from '../NetService/EvmService';
import { SolanaService } from '../NetService/SolanaService';
import type { RequestArguments } from './types';

export function sendEVMRpc(args: RequestArguments) {
    return EvmService.rpc(args.method, args.params)
}

export function sendSolanaRpc(args: RequestArguments) {
    return SolanaService.rpc(args.method, args.params)
}

