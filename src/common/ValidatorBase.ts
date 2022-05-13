export default abstract class ValidatorBase<T> {
	abstract validate(input: T): boolean;
}
