import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

interface PrismaErrorCodesParser {
  status: HttpStatus;
  statusCode: HttpStatus;
  message: unknown;
  code: string;
}

export const prismaErrorCodesParser = (
  error: Prisma.PrismaClientKnownRequestError,
): PrismaErrorCodesParser => {
  switch (error.code) {
    case 'P2025': {
      return {
        status: HttpStatus.NOT_FOUND,
        statusCode: HttpStatus.NOT_FOUND,
        message: error.meta?.cause || error.message,
        code: error.code,
      };
    }
    default: {
      return {
        status: HttpStatus.BAD_REQUEST,
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
        code: error.code,
      };
    }
  }
};
