import { gql } from 'graphql-request';

export const GetProjectDetails = gql`
	query fundingProject($id: id!) {
		id
		projectOwner
		daiCollected
		daiSplit
		ipfsHash
		tokenTypes {
			tokenTypeId
			id
			minAmt: minAmtPerSec
			limit
			currentTotalAmtPerSec
			currentTotalGiven
			ipfsHash
			streaming
		}
		tokens {
			owner: tokenReceiver
			giveAmt
			amtPerSec
		}
	}
`;

export const queryProjectMeta = `
query ($id: ID!) {
  fundingProject (id: $id) {
    ipfsHash
  }
}
`;
