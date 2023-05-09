import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import * as mime from 'mime-types';

export const IsImage = (validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isImage',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const file = value;
          const mimeType = mime.lookup(file.originalname);
          return mimeType && mimeType.startsWith('image/');
        },
        defaultMessage(args: ValidationArguments) {
          return `File ${args.property} is not an image`;
        },
      },
    });
  };
};
