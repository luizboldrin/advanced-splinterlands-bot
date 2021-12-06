import dotenv from 'dotenv';
import Joi from 'joi';
import customJoi from '../custom/joi';
import { IAuthConfig } from '../@types/config/auth.d';

dotenv.config({ path: `${__dirname}/../../.env` });

const envVarsSchema = Joi.object<IAuthConfig>({
    ACCOUNTS: customJoi
        .stringArray()
        .required(),
    PASSWORDS: customJoi
        .stringArray()
        .length(Joi.ref('ACCOUNTS.length'))
        .required()
        .messages({
            'array.length': 'The number of accounts and passwords do not match.',
        }),
})
    .messages({
        'any.required': 'Missing {{#label}} parameter in .env',
    });

console.log('loading auth config');

const { error, value: envVars } = envVarsSchema.validate(process.env, { allowUnknown: true });

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    accounts: envVars.ACCOUNTS,
    passwords: envVars.PASSWORDS,
};

export default config;
