export class Token {
  constructor(data?: Record<string, any>) {
    if (!data) return this;

    if ('service' in data) {
      this.service = data.service;
    }

    if ('token' in data) {
      this.token = data.token;
    }
  }

  public id: number;
  public service: string;
  public token: string;
  public expiration: any;
  public created_at: any;
}
