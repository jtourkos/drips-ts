/* eslint-disable max-classes-per-file */
import { Signer } from 'ethers';

export class NetworkConfig {
	constructor(
		public readonly daiContractAddress: string,
		public readonly dripsHubContractAddress: string,
		public readonly dripsHubLogicContractAddress: string,
		public readonly reserveContractAddress: string,
		public readonly radicleRegistryContractAddress: string,
		public readonly builderContractAddress: string,
		public readonly network: string,
		public readonly cycleSecs: number,
		public readonly layer: string,
		public readonly chainId: number
	) {}

	public static readonly Mainnet: NetworkConfig = new NetworkConfig(
		'0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
		'0xfbcD6918907902c106A99058146CBdBb76a812f6',
		'0x756E821D9E88D76ef15d2e719bbd4CC3A2167EC1',
		'0x880D5095606c7b541AdDE0F94A6858CbABb63F69',
		'0xc2a8F699317795956bE5Cc4f9FF61FD4E7667670',
		'0x688662533E0341D518Bcc965525aFc70550CEE39',
		'mainnet',
		86400,
		'etherium',
		1
	);

	public static readonly Rinkeby: NetworkConfig = new NetworkConfig(
		'0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
		'0xfbcD6918907902c106A99058146CBdBb76a812f6',
		'0x756E821D9E88D76ef15d2e719bbd4CC3A2167EC1',
		'0x880D5095606c7b541AdDE0F94A6858CbABb63F69',
		'0xc2a8F699317795956bE5Cc4f9FF61FD4E7667670',
		'0x688662533E0341D518Bcc965525aFc70550CEE39',
		'mainnet',
		86400,
		'etherium',
		1
	);
}

export class IpfsConfig {
	constructor(public readonly apiKey: string, public readonly apiSecret: string) {}
}
