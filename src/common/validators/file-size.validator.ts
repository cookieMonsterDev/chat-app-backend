import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export const IsFileSize = (
  size: number,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isFileSize',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const file = value;
          return file && file.size <= size;
        },
        defaultMessage(args: ValidationArguments) {
          return `File ${args.property} exceeds the maximum size of ${size} bytes`;
        },
      },
    });
  };
};
