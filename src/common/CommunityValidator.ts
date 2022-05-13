import { Community } from '../clients/radicleRegistry/types';
import ValidatorBase from './ValidatorBase';

export default class CommunityValidator implements ValidatorBase<Community> {
	validate(community: Community): boolean {
		// TODO: Implement
		return true;
	}
}
