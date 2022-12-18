import { ethers } from 'ethers';

type CurrentChainInfos = {
    chainId: number,
    lastBlockNumber: number,
    chainName: string,
    goodChain: boolean // If the chain is the targeted one,
}

type TargetedChainInfo = {
    chainId: number,
    name: string,
    rpcUrl: string
}

export default class WalletStore {
	private static ctx: WalletStore;
    private static provider: ethers.providers.Web3Provider;
    private static currentChainInfos: CurrentChainInfos;
    private static targetedChainInfo: TargetedChainInfo;

    public static getInstance(): WalletStore {
		if (!WalletStore.ctx) new this();
		return WalletStore.ctx;
	}

    private constructor() {
		WalletStore.ctx = this;
        WalletStore.currentChainInfos = {
            chainId: 0,
            lastBlockNumber: 0,
            chainName: '',
            goodChain: false
        }
        WalletStore.targetedChainInfo = {
            chainId: 0,
            name: '',
            rpcUrl: ''
        }
    }

    // GETTERS & SETTERS
    public static getProvider(): ethers.providers.Web3Provider {
        return WalletStore.provider;
    }
    
    public static setProvider(value: ethers.providers.Web3Provider) {
        WalletStore.provider = value;
    }


    public static getTargetedChainInfo(): TargetedChainInfo {
        return WalletStore.targetedChainInfo;
    }
    public static setTargetedChainInfo(value: TargetedChainInfo) {
        WalletStore.targetedChainInfo = value;
    }

    public static getCurrentChainInfos() {
        return WalletStore.currentChainInfos;
    }

    public static setCurrentChainInfos(currentChainInfos: CurrentChainInfos) {
        WalletStore.currentChainInfos = currentChainInfos;
    }

    public static getSigner() {
        return this.provider.getSigner();
    }

    public static connect() {
        return window.ethereum.enable().then(async () => {  // Requires the User to give permission to access their MetaMask portfolio information.
            // Create an instance of the Web3 provider with the EVM browser API and set the store property with the correct value
            this.provider = new ethers.providers.Web3Provider(window.ethereum);

            // Handle network changes
            this.provider.on("network", (_newNetwork, oldNetwork) => {
                // When a Provider makes its initial connection, it emits a "network"
                // event with a null oldNetwork along with the newNetwork. So, if the
                // oldNetwork exists, it represents a changing network
                if (oldNetwork) {
                    window.location.reload();
                }
            });
            window.ethereum.on('changed', (network: any) => {
                console.log(`Le réseau a changé pour le réseau ID ${network}.`);
                this.provider = new ethers.providers.Web3Provider(window.ethereum);
            });
        });
    }

    public static async changeToTargetedChain() {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ethers.utils.hexValue(this.targetedChainInfo.chainId) }], // chainId must be in HEX with 0x in front
        });
    }

    public static async updateChainInfo() {

        return this.provider.getNetwork().then((network) => {
            this.currentChainInfos.chainName = network.name;
            this.currentChainInfos.goodChain = network.chainId === this.targetedChainInfo.chainId ? true : false;
            this.currentChainInfos.chainId = network.chainId;
            
            // Get block number
            if (this.currentChainInfos.goodChain)
                this.provider.getBlockNumber().then((blockNumber) => {
                    this.currentChainInfos.lastBlockNumber = blockNumber;
                });
            else this.currentChainInfos.lastBlockNumber = 0
            
        });
    }

    

}