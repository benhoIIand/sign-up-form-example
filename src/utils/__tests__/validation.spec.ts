import * as Joi from "@hapi/joi";
import createValidator from "../validation";

const schema = Joi.object({
  name: Joi.string().required(),

  email: Joi.string().email({ minDomainSegments: 2, tlds: false }),
});

describe("validation util", () => {
  test("returns errors as key/value pairs", () => {
    const values = {
      name: undefined,
      email: "benholland99",
    };

    const errors = createValidator(schema)(values);

    expect(errors).toEqual({
      name: `"name" is required`,
      email: `"email" must be a valid email`,
    });
  });

  test("returns undefined if there are no errors", () => {
    const values = {
      name: "Ben Holland",
      email: "benholland99@gmail.com",
    };

    const errors = createValidator(schema)(values);

    expect(errors).toBeUndefined();
  });
});
