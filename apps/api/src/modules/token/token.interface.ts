export interface IToken {
  generate: (data: any) => Promise<string>;
  validate: (token: string) => Promise<any>;
}
