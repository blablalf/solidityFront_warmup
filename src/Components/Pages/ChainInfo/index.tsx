import React from 'react';
import { IndexRouteProps } from 'react-router-dom';

/*
type chainInfos = {
    chainId: number,
    last_block_number: number,
    user_address: string
}
*/

class ChainInfo extends React.Component
 {

    /*
    constructor() {
        super();
    }
    */

    render() { 
        return (
            <div> 
                <h1>Informations sur la chaîne de blocs</h1> 
                <p>Chain_id: {}</p>
                <p>last_block_number: {}</p>
                <p>user_address: {}</p>
            </div>
        ); 
    } 
} 

export default ChainInfo;