// import { ethers, Signer } from 'ethers';
// import { NetworkConfig } from '../../common/configuration';
// import { Dai, Dai__factory, DripsDaiHub, DripsDaiHub__factory, DripsToken } from '../../contracts/generated';
// import { Subscription } from '../radicleRegistry/types';
// import DripsTokenAbi from '../../contracts/drips-token.json';

// export default class Erc20DripsHubClient {
// 	private readonly _contract: DripsDaiHub;
// 	private _daiContract: Dai;

// 	public hasApprovedSubscription: boolean = false;

// 	constructor(public readonly signer: Signer, public readonly networkConfig: NetworkConfig) {
// 		this._contract = DripsDaiHub__factory.connect(networkConfig.daiContractAddress, signer);

// 		this._daiContract = Dai__factory.connect(this.networkConfig.daiContractAddress, this.signer);
// 	}

// 	async approveSubscription(communityAddress: string): Promise<void> {
// 		try {
// 			const tx = await this._daiContract.approve(communityAddress, ethers.constants.MaxUint256);
// 			await tx.wait();

// 			this.hasApprovedSubscription = true;
// 		} catch (error) {
// 			console.log(`Cannot approve: ${error}`);
// 			this.hasApprovedSubscription = false;
// 		}
// 	}

// 	async subscribe(communityAddress: string) {
// 		if (!this.hasApprovedSubscription) {
// 			throw new Error(
// 				'Cannot subscribe: Before you subscribe to a community you must first allow the community to withdraw your coins.'
// 			);
// 		}

// 		if (!(await this._canSpendAmount(this.networkConfig.daiContractAddress, this.signer, communityAddress, null))) {
// 			throw new Error(
// 				'Cannot subscribe: Before you subscribe to a community you must first allow the community to withdraw your coins.'
// 			);
// 		}

// 		try {
// 			const communityContract = new ethers.Contract(communityAddress, DripsTokenAbi) as DripsToken;
// 			const tx = await communityContract['mint(address,uint128,uint128)'](communityAddress, typeId, giveAmt);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	}

// 	private async _canSpendAmount(
// 		daiAddress: string,
// 		signer: Signer,
// 		communityAddress: string,
// 		subscription: Subscription
// 	): Promise<boolean> {
// 		const allowance = await this._daiContract.allowance(await signer.getAddress(), communityAddress || daiAddress);

// 		if (allowance.lt(subscription.minAmount)) {
// 			return false;
// 		}

// 		return true;
// 	}
// }
