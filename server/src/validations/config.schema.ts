import * as Joi from 'joi'
export const validationConfigSchema = Joi.object({
    PORT: Joi.number().default(4001).required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432).required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    JWT_SECRET_ACCESS: Joi.string().required(),
    JWT_SECRET_REFRESH: Joi.string().required(),
    AWS_S3_REGION: Joi.string().required(),
    AWS_ACCESS_KEY: Joi.string().required(),
    AWS_SECRET_KEY: Joi.string().required(),
    AWS_S3_BUCKET: Joi.string().required(),
})