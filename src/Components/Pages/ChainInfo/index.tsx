import React from 'react';
import WalletStore from '../../../Stores/WalletStore';

type IProps = {};

type IState = {
};

class ChainInfo extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);
        this.state = { // Initialize the state with an empty properties.
            account: 'blabla',
            chainName: 'unknown',
            chainId: 0,
            lastBlockNumber: 0
        };

        WalletStore.getInstance(); // If WalletStore hasn't been initialized yet we do it because we call it into the render function
    }

    public componentDidMount() { // As soon as the component is mounted, we will initialize web3.
        // We says that the targeted chain is Sepolia
        WalletStore.setTargetedChainInfo({ chainId: 11155111, name: 'Sepolia', rpcUrl: 'https://rpc.sepolia.dev' });

        WalletStore.connect().then(async () => { // We ask the user for its provider
            // Get the user address
            WalletStore.getSigner().getAddress().then((address) => {
                this.setState({ account: address });
                WalletStore.setUserInfo({ address: address });
            });
    
            WalletStore.updateChainInfo(); // Init the data collect again
        });
    }

    public async changeNetwork() {
        await WalletStore.changeToTargetedChain(); // Ask to the user to change his network
        await WalletStore.updateChainInfo();
        this.forceUpdate();
    }

    render() { 
        return (
            <div>
                <h1>Informations sur la chaîne de blocs</h1> 
                <p>Chain_id: {}</p>
                <p>last_block_number: {}</p>
                <p>user_address: {WalletStore.getUserInfo().address}</p>

                { !WalletStore.getCurrentChainInfos().goodChain ?
                    <div>
                        <p>Bad Network</p>
                        <button onClick={this.changeNetwork}>Change Network</button>
                    </div>
                : null }
                
            </div>
        ); 
    } 
} 

export default ChainInfo;