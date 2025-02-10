interface Error {
  code: string;
  message: string;
}

export class AbstractErrorsBuilder<T extends Error, K extends Error['code']> {
  public errors = new Map<K, T>();

  hasErrors(): boolean {
    return this.errors.size > 0;
  }
  addError(error: T): AbstractErrorsBuilder<T, K> {
    this.errors.set(error.code as K, error);
    return this;
  }
  build(): T[] | null {
    return [...this.errors].length ? [...this.errors].map(([, v]) => v) : null;
  }
}
