import { Address, toNano,beginCell} from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { JettonInstance } from '../wrappers/JettonInstance';
import { JettonWallet , Burn} from '../wrappers/JettonWallet';

import { buildOnchainMetadata } from '../utils/jetton-helpers';

export async function run(provider: NetworkProvider) {
    
    // const jettonParams = {
    //     name: "vpTest",
    //     description: "This is a vp TON fungible tokens).",
    //     symbol: "VP",
    //     image: "https://avatars.githubusercontent.com/u/104382459?s=200&v=4",
    // };

    // // Create content Cell
    // let jettonContent = buildOnchainMetadata(jettonParams);
    
    // let maxSupply = toNano(10000000000);
    let deployed = Address.parse('kQDZnziy_jeKMxXi0bh0CjSXC7edIX-zbUdQUmw9qdECmZgM');

    // const jettonInstance = provider.open(await JettonInstance.fromInit(provider.sender().address as Address, jettonContent, maxSupply));
    const walletInstance = provider.open(await JettonWallet.fromAddress(deployed as Address));


    const burnMessage: Burn = {
        $$type: "Burn",
        queryId: 0n,
        amount: toNano(100),
        responseDestination:  provider.sender().address as Address,
        customPayload: beginCell().endCell(),
    };


    await walletInstance.send(
        provider.sender(),
        {
            value: toNano(0.05),
        },
        burnMessage
    );

    // await provider.waitForDeploy(jettonInstance.address);
}