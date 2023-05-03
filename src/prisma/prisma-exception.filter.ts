import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { prismaErrorCodesParser } from './prisma-error-codes.parser';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientInitializationError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Handle known request errors (e.g. constraint violation errors)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const { status, ...errorPayload } = prismaErrorCodesParser(error);
      return response.status(status).json({ ...errorPayload });
    }

    // Handle unknown request errors
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }

    // Handle initialization errors
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to initialize database connection',
      });
    }

    // For any other errors, return a generic error message
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
