import { GraphQLClient } from 'graphql-request';
import { GetProjectDetails } from './queries';

export interface IRadicleSubGraphClient {
	getCommunityById(id: string): any;
}

export class RadicleSubGraphClient implements IRadicleSubGraphClient {
	private _graphQlClient: GraphQLClient;

	constructor(public readonly connectionString: string) {
		this._graphQlClient = new GraphQLClient(connectionString);
	}

	async getCommunityById(id: string) {
		console.log(id);
		// TODO: Strongly typed return values?
		return this._graphQlClient.request(GetProjectDetails, { id });
	}
}
