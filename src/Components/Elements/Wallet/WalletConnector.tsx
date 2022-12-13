import React from 'react';
import Web3 from 'web3';

type IProps = {
    account: string
};

type IState = {
    account: string
};

class WalletConnector extends React.Component<IProps, IState> {

    public componentDidMount() { // Dès que le composant est monté, on va initialiser web3.
        this.setState({account: ''}); // Initialise le state avec une propriété "account" vide. 
        const web3 = new Web3(window.ethereum); // Initialise le package Web3 avec l'API Ethereum du navigateur. 

        window.ethereum.enable().then(() => {  // Demande à l'utilisateur de donner son autorisation pour accéder aux informations de son portefeuille MetaMask
            this.setState({ account: web3.eth.accounts[0] }); // Une fois que l'utilisateur a donné son autorisation, on met à jour le state en récupérant le premier compte (index 0) dans la liste des comptes de son portefeuille MetaMask.
        }); 
    }

    public render() { // Rendu du composant React.
        return (
            <div>Connected to account: {this.state.account}</div>  // Affiche le compte connecté à ce composant React, récupéré dans le state "account".
        ); 
    }

}

export default WalletConnector;