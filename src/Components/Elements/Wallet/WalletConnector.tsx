import React from 'react';
import { ethers } from 'ethers';

type IProps = {};

type IState = {
    account: string
};

class WalletConnector extends React.Component<IProps, IState> {

    public constructor(props: IProps) {
        super(props);
        this.state = {account: 'blabla'}; // Initialize the state with an empty "account" property.
    }

    public componentDidMount() { // As soon as the component is mounted, we will initialize web3.
        window.ethereum.enable().then(async () => {  // Requires the User to give permission to access their MetaMask portfolio information.
            
            const provider = new ethers.providers.Web3Provider(window.ethereum, {name:'Sepolia', chainId: 11155111, ensAddress: 'https://rpc.sepolia.dev' }); // Create an instance of the Web3 provider with the EVM browser API. 
            const wallet = provider.getSigner(); // Retrieves the wallet corresponding to the account connected in MetaMask from the Web3 provider created earlier.  
            this.setState({ account: await wallet.getAddress() }); // Once the user has given his authorization, the state is updated by retrieving the account address associated with the wallet (signer).
            provider.getBlockNumber().then((val) => console.log("block",val));
            provider.getNetwork().then((val) => console.log("network",val.name));
            provider.getNetwork().then((val) => console.log("chainId",val.chainId));
            
        }); 
    }

    public render() {
        return (
            <div>Connected to account: {this.state.account}</div>  // Displays the account connected to this React component, retrieved in the "account" state.
        ); 
    }

}

export default WalletConnector;