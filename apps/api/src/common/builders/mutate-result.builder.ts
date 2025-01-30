// Define the Result type
type Result<T extends object, E> =
  | (T & { errors: null }) // Success case
  | (T & { errors: E[] }); // Error case

// Factory for creating Result objects
export class MutateResultFactory {
  static ok<T extends Omit<T, 'errors'>, E>(
    data: Omit<T, 'errors'>
  ): Result<T, E> {
    return { ...data, errors: null };
  }

  static err<T extends object, E>(
    errorData: T & { errors: E[] }
  ): Result<T, E> {
    return errorData;
  }
}
