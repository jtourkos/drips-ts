// eslint-disable-next-line max-classes-per-file
import { BigNumberish } from 'ethers';

export class CommunityMetadata {
	description?: string;
	image?: string;
	website?: string;
	twitter?: string;
	discord?: string;
	radicleOrg?: string;
	radicleId?: string;
	githubProject?: string;
	fundingGoal?: BigNumberish;
	benefits?: string;
}

export class Community {
	metadata?: CommunityMetadata;

	constructor(public readonly name: string, public readonly symbol: string) {}
}

export class Subscription {
	constructor(
		public readonly limit: BigNumberish,
		public readonly minAmount: BigNumberish,
		public readonly intervalInSecs?: BigNumberish
	) {}
}
