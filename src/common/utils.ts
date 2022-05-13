import { BigNumberish, utils } from 'ethers';
import { ONE_MONTH_IN_SECS } from './constants';

export function toWeiPerSec(amount: BigNumberish, intervalInSecs?: BigNumberish): BigNumberish {
	return utils.parseUnits(amount.toString()).div(intervalInSecs || ONE_MONTH_IN_SECS);
}
