import joiBase from 'joi';
import joiDate from '@joi/date';
const joi = joiBase.extend(joiDate);

export const customerSchema = joi.object({
    name: joi.string().min(2).required(),
    phone: joi.string().min(10).max(11).regex(/^\d+$/).required(),
    cpf: joi.string().length(11).regex(/^\d+$/).required(),
    birthday: joi.date().format('YYYY-MM-DD').utc().required()
})