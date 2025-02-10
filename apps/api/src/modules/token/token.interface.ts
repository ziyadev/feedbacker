export interface IToken {
  generate: <TData>(data: TData) => Promise<string>;
  validate: (token: string) => Promise<boolean>;
}
