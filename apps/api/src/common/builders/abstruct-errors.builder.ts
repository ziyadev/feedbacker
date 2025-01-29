interface Error {
  code: string;
  message: string;
}

export class AbstractErrorsBuilder<T extends Error, K extends string> {
  public errors = new Map<K, T>();
  addError(error: T): AbstractErrorsBuilder<T, K> {
    this.errors.set(error.code as K, error);
    return this;
  }
  build(): T[] | null {
    return [...this.errors].length ? [...this.errors].map(([_, v]) => v) : null;
  }
}
