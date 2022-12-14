import { ethers } from 'ethers';
//import WalletStore from '../Stores/WalletStore';

type TargetedChainInfo = {
    chainId: number,
    name: string,
    rpcUrl: string
}

export default class ChainConnect {
    private static chainInfo: TargetedChainInfo;
    private static ctx: ChainConnect;

    constructor(name:string, rpcUrl: string, chainId: number) {
        ChainConnect.chainInfo = {
            name,
            chainId,
            rpcUrl
        }
        ChainConnect.ctx = this;
    }

    public static getInstance() {
        return this;
    }

    public static async changeToTargetedChain() {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ethers.utils.hexValue(ChainConnect.chainInfo.chainId) }],    // chainId must be in HEX with 0x in front
        });
    }

    /*
    public static updateChainInfo() {
        let chainInfos = WalletStore.getInstance().getCurrentChainInfos();
        return WalletStore.getInstance().getProvider().getNetwork().then((network) => {
            chainInfos.chainName = network.name;
            chainInfos.goodChain = network.chainId === chainInfos.chainId ? true : false;
            chainInfos.chainId = network.chainId;
                ...
            };
        }
            WalletStore.getInstance().setCurrentChainInfos({
            })
        );
    }

    public updateChainInfo() {
        // Get block number
        WalletStore.getInstance().getProvider().getBlockNumber().then((blockNumber) => WalletStore.getInstance().setCurrentChainInfos({
            lastBlockNumber: blockNumber,
            ...
        }));
    }

    public static getSigner() {
        return WalletStore.getInstance().getProvider().getSigner();
    }

    static getChainInfo() {
        return ChainConnect.chainInfo;
    }
    */
}
