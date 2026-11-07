import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : null;

    let errorCode = 'INTERNAL_SERVER_ERROR';
    let errorMessage = 'An unexpected error occurred';
    let details = undefined;

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const resp = exceptionResponse as any;
      errorMessage = Array.isArray(resp.message)
        ? resp.message.join(', ')
        : resp.message || errorMessage;
      errorCode = resp.error || `HTTP_${status}`;
      if (Array.isArray(resp.message)) {
        details = resp.message;
      }
    } else if (typeof exceptionResponse === 'string') {
      errorMessage = exceptionResponse;
    } else if (exception instanceof Error) {
      errorMessage = exception.message;
    }

    this.logger.error(
      `[${request.method}] ${request.url} - Status ${status} - ${errorMessage}`,
    );

    response.status(status).json({
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        details,
        path: request.url,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
