import React from 'react';
import WalletStore from '../../../Stores/WalletStore';

type IProps = {};

type IState = {
    userAddress: string,
    chainName: string,
    chainId: number,
    lastBlockNumber: number,
    goodChain: boolean
};

class ChainInfo extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);
        this.state = { // Initialize the state with an empty properties.
            userAddress: 'blabla',
            chainName: 'unknown',
            chainId: 0,
            lastBlockNumber: 0,
            goodChain: false
        };

        WalletStore.getInstance(); // If WalletStore hasn't been initialized yet we do it because we call it into the render function
    }

    componentDidMount() { // As soon as the component is mounted, we will initialize web3.
        WalletStore.connect().then(() => { // We ask the user for its provider
            // Get the user address
            WalletStore.getSigner().getAddress().then((address) => {
                this.setState({ userAddress: address });
            });

            // We says that the targeted chain is Sepolia
            WalletStore.setTargetedChainInfo({ chainId: 11155111, name: 'Sepolia', rpcUrl: 'https://rpc.sepolia.dev' });
            if (WalletStore.getCurrentChainInfos().chainId !== 11155111) this.updateChainInfo();
        });
    }

    public async updateChainInfo() {
        // Init the data collect
        return WalletStore.updateChainInfo().then(() =>
            this.setState({
                chainName: WalletStore.getCurrentChainInfos().chainName,
                chainId: WalletStore.getCurrentChainInfos().chainId,
                lastBlockNumber: WalletStore.getCurrentChainInfos().lastBlockNumber,
                goodChain: WalletStore.getCurrentChainInfos().goodChain
            })
        );
    }

    public async changeNetwork() {
        console.log("this_", this);
        WalletStore.changeToTargetedChain().then(() => // Ask to the user to change his network
     {
            return this.updateChainInfo()}
        );
    }
 
    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        this.updateChainInfo();
    }

    render() { 
        return (
            <div>
                <h1>Informations sur la cha??ne de blocs</h1> 
                <p>Chain name: {this.state.chainName}</p>
                <p>Chain id: {this.state.chainId}</p>
                <p>Last block number: {this.state.lastBlockNumber}</p>
                <p>user_address: {this.state.userAddress}</p>

                { !this.state.goodChain ?
                    <div>
                        <p>Bad Network</p>
                        <button onClick={() => this.changeNetwork()}>Change Network</button>
                    </div>
                : null }
                
            </div>
        ); 
    } 
} 

export default ChainInfo;