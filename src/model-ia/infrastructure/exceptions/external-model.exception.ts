export class ExternalModelException extends Error {
  constructor(message: string) {
    super(`External API model Error: ${message}`);
    this.name = 'ExternalModelException';
  }
}
