import { Subscription } from '../clients/radicleRegistry/types';
import ValidatorBase from './ValidatorBase';

export default class SubscriptionValidator implements ValidatorBase<Subscription> {
	validate(subscription: Subscription): boolean {
		// TODO: Implement
		return true;
	}
}
