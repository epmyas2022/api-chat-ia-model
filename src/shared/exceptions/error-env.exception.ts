export class ErrorEnvException extends Error {
  constructor(message: string) {
    super(`Error in environment variables: ${message}`);
    this.name = 'ErrorEnvException';
  }
}
