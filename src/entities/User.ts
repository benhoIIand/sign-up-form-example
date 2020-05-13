import * as Joi from "@hapi/joi";

export interface UserToCreate {
  name: string;
  role?: string;
  email: string;
  password: string;
}

// TODO: Add custom errors
export const validationSchema = Joi.object<UserToCreate>({
  name: Joi.string().required(),

  role: Joi.string().allow("").optional(),

  // TODO: Move this to a Joi extension or use an existing one for more granular error messaging
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{10,}$"))
    .pattern(new RegExp("[0-9]+"))
    .pattern(new RegExp("[A-Z]+"))
    .pattern(new RegExp("[a-z]+"))
    .messages({
      "string.pattern.base": `"password" should consist of 10 or more characters, at least 1 uppercase letter, 1 lowercase letter and 1 number`,
    })
    .required(),

  email: Joi.string().email({ minDomainSegments: 2, tlds: false }),
});
