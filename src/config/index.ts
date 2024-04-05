import * as dotenv from "dotenv";
import * as joi from "joi";

process.env.ENV_PATH
  ? dotenv.config({ path: process.env.ENV_PATH })
  : dotenv.config();

// validating environment variables
const schemaValidate = joi
  .object({
    HTTP_PORT: joi.number().required(),
    NODE_ENV: joi
      .string()
      .valid("development", "staging", "production")
      .required(),
    REDIS_URL: joi.string(),
    REDIS_HOST: joi.string(),
    REDIS_PORT: joi.number(),
    REDIS_PASSWORD: joi.string()
  })
  .unknown()
  .required();

const { error, value: envVal } = schemaValidate.validate(process.env);

if (error) {
  throw new Error(`config validation error ${error.message}`);
}

const nonProdEnvironments = ["development", "dev", "staging"];

export const config = {
  port: {
    HTTP_PORT: envVal.HTTP_PORT
  },
  NODE_ENV: envVal.NODE_ENV,
  Redis: {
    PORT: envVal,
    HOST: envVal.REDIS_HOST,
    PASSWORD: envVal.REDIS_PASSWORD
  }
};
