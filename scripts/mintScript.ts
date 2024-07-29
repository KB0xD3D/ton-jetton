import { Address, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { JettonInstance } from '../wrappers/JettonInstance';
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
    let deployed = Address.parse('EQDO6MnHSUEdB_cGVeEzEAYvg7ArUXYGkHJ5tBpD7224OjC0');

    // const jettonInstance = provider.open(await JettonInstance.fromInit(provider.sender().address as Address, jettonContent, maxSupply));
    const jettonInstance = provider.open(await JettonInstance.fromAddress(deployed as Address));

    await jettonInstance.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Mint',
            amount: toNano(100),
            receiver: provider.sender().address as Address
        }
    );

    // await provider.waitForDeploy(jettonInstance.address);
}