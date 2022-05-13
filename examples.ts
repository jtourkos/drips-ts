import { ethers, Wallet } from 'ethers';
import RadicleRegistryClient from './src/clients/radicleRegistry/RadicleRegistryClient';
import { RadicleSubGraphClient } from './src/clients/radicleSubgraph/RadicleSubGraphClient';
import { NetworkConfig } from './src/common/configuration';
import { ONE_MONTH_IN_SECS } from './src/common/constants';

(async () => {
	const signer = await Wallet.fromMnemonic(process.env.TEST_MNEMONIC!).connect(
		new ethers.providers.JsonRpcProvider(process.env.INFURA!)
	);

	const drips = new RadicleRegistryClient(signer, NetworkConfig.Rinkeby, {
		apiKey: process.env.PINATA_API_KEY!,
		apiSecret: process.env.PINATA_API_SECRET!
	});

	const communityId = await drips.createNewCommunity(
		{
			name: 'My Community Name',
			symbol: 'MCS',
			metadata: {
				description: 'Testing drips on TS'
			}
		},
		{
			limit: 100,
			minAmount: 10,
			intervalInSecs: ONE_MONTH_IN_SECS
		}
	);

	// Not working yet... :)
	const dripsSubGraphClient = new RadicleSubGraphClient(process.env.SUBGRAPH!);
	const community = await dripsSubGraphClient.getCommunityById(communityId);
	console.log(JSON.stringify(community));
})();
