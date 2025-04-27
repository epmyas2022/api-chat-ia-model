import { HttpException, HttpStatus } from '@nestjs/common';

export class ExternalModelException extends HttpException {
  constructor(message: string) {
    super(`External API model Error: ${message}`, HttpStatus.BAD_REQUEST);
  }
}
