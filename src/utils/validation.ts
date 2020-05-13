import * as Joi from "@hapi/joi";

export type ValidationErrors = { [key: string]: string };

const createValidator = (schema: Joi.Schema) => <T>(
  values: T
): ValidationErrors | undefined => {
  const res = schema.validate(values, { abortEarly: false });
  const { error } = res;

  return error
    ? error.details.reduce<ValidationErrors>(
        (obj, err) =>
          err.context && err.context.key
            ? { ...obj, [err.context.key]: err.message }
            : obj,
        {}
      )
    : undefined;
};

export default createValidator;
