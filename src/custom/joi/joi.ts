import Joi from 'joi';

interface StringArrayJoi extends Joi.Root {
    stringArray(): Joi.ArraySchema;
}

const customJoi = Joi.extend((joi) => ({
    type: 'stringArray',
    base: joi.array().items(joi.string()).meta({ baseType: 'array' }),
    coerce: (value: string) => {
        if (!value) {
            return { value: [] };
        }

        if (typeof value === 'string') {
            return { value: value.replace(/^,+|,+$/mg, '').split(',').map((v) => v.trim()) };
        }

        return { value };
    },
})) as StringArrayJoi;

export default customJoi;
