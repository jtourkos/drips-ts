import pinataSDK, { PinataPinResponse } from '@pinata/sdk';
import { Community, CommunityMetadata } from '../clients/radicleRegistry/types';

require('dotenv').config();

const pinata = pinataSDK(process.env.PINATA_API_KEY!, process.env.PINATA_API_SECRET!);

export default async function pinJSONToIPFS(
	community: Community,
	metadata: CommunityMetadata
): Promise<PinataPinResponse> {
	try {
		const body = JSON.parse(JSON.stringify(metadata));
		const options = {
			pinataMetadata: {
				name: `Project: ${community.name}`,
				type: 'project'
			}
		};

		return await pinata.pinJSONToIPFS(body, options);
	} catch (e) {
		console.log(`Could not store metadata to IPFS: ${e}`);
		throw e;
	}
}
