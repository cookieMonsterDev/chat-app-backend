import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { plainToClass } from 'class-transformer';

export const IsFile = (validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isFile',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [objectInstance] = args.constraints;
          const file = plainToClass(objectInstance, value) as any;
          return file && file.size && file.path && file.name && file.type;
        },
        defaultMessage(args: ValidationArguments) {
          return `File ${args.property} is not valid`;
        },
      },
    });
  };
};
