import { ContractTransaction, Signer } from 'ethers';
import CommunityValidator from '../../common/CommunityValidator';
import { IpfsConfig, NetworkConfig } from '../../common/configuration';
import pinJSONToIPFS from '../../common/pinata';
import SubscriptionValidator from '../../common/SubscriptionValidator';
import { toWeiPerSec } from '../../common/utils';
import { RadicleRegistry, RadicleRegistry__factory } from '../../contracts/generated';
import { Community, Subscription } from './types';

export interface IRadicleRegistryClient {
	createNewCommunity(community: Community, subscription: Subscription): Promise<string>;
}

export default class RadicleRegistryClient implements IRadicleRegistryClient {
	private readonly _radicleRegistryContract: RadicleRegistry;
	private readonly communityValidator: CommunityValidator;
	private readonly subscriptionValidator: SubscriptionValidator;

	// TODO: Implement Dependency Injection.
	constructor(
		public readonly signer: Signer,
		public readonly networkConfig: NetworkConfig,
		public readonly ipfsConfig?: IpfsConfig
	) {
		this._radicleRegistryContract = RadicleRegistry__factory.connect(
			networkConfig.radicleRegistryContractAddress,
			signer
		);

		// TODO: Search for validation library?
		this.communityValidator = new CommunityValidator();
		this.subscriptionValidator = new SubscriptionValidator();
	}

	async createNewCommunity(community: Community, subscription: Subscription): Promise<string> {
		this.communityValidator.validate(community);
		this.subscriptionValidator.validate(subscription as Subscription);

		return this._createNewCommunity(community, subscription as Subscription);
	}

	private async _createNewCommunity(community: Community, subscription: Subscription) {
		try {
			const { name, symbol, metadata } = community;

			let ipfsHash = '';
			if (this.ipfsConfig && metadata) {
				const pinResponse = await pinJSONToIPFS(community, metadata);
				ipfsHash = pinResponse.IpfsHash;
			}

			const tx = await this._radicleRegistryContract.newProject(
				name,
				symbol,
				await this.signer.getAddress(),
				ipfsHash, // TODO: Is this correct?
				[
					{
						nftTypeId: 0, // TODO: What are the expected values?
						limit: subscription.limit,
						minAmt: toWeiPerSec(subscription.minAmount, subscription.intervalInSecs),
						streaming: false,
						ipfsHash
					}
				],
				[]
			);

			const communityAddress = await this._subscribeToNewProjectCreatedEvent(tx);

			return communityAddress;
		} catch (error) {
			console.log(`Error while trying to create a new community (with subscription): ${error}`);

			throw error;
		}
	}

	private _subscribeToNewProjectCreatedEvent(tx: ContractTransaction): Promise<string> {
		const newProjectCreatedEvent =
			this._radicleRegistryContract.interface.events['NewProject(address,address,address,string)'].name;

		return new Promise((resolve) => {
			const onNewProject = async (dripTokenTemplate: string, projectAddress: string, projectOwner: string) => {
				console.log('@NewProject', { dripTokenTemplate, projectAddress, projectOwner, tx });

				if (projectOwner.toLowerCase() === tx.from.toLowerCase()) {
					this._radicleRegistryContract.off(newProjectCreatedEvent, onNewProject);
					return resolve(projectAddress.toLowerCase());
				}

				return projectAddress;
			};

			this._radicleRegistryContract.on(newProjectCreatedEvent, onNewProject);
		});
	}
}
