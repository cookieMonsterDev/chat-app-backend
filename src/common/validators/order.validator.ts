import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export const IsOrder = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isOrder',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value === 'ASC' || value === 'DESC';
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} query must be either 'ASC' or 'DESC'`;
        },
      },
    });
  };
};
