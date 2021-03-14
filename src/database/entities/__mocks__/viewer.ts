export class Viewer {
  constructor(data?: Record<string, any>) {
    if (!data) return this;

    this.name = data.name || '';
    if ('name' in data) {
      this.name = data.name;
    }

    if ('points' in data) {
      this.points = data.points;
    }
  }

  public id: number;

  public name: string;

  public points: number;

  public created_at: any;
}
