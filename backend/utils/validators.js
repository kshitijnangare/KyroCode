import Joi, { optional } from 'joi';

/* ==================================================
                    USER VALIDATION
================================================== */

export const registrationValidation = Joi.object({
    email: Joi.string().email().required(),
    phone_number: Joi.string().min(10).max(20).required(),
    display_name: Joi.string().max(255).required(),
    username: Joi.string().max(30).required(),
    password: Joi.string().min(6).required(),
    gender: Joi.string().valid('male', 'female', 'other').optional(),
    role: Joi.string().valid('user', 'admin').required(),
    birthdate: Joi.date().iso().optional(),
});

export const loginValidation = Joi.object({
    email: Joi.string().email().optional(),
    phone_number: Joi.string().min(10).max(20).optional(),
    password: Joi.string().min(6).required(),
}).xor('email', 'phone_number');

export const resetPasswordValidation = Joi.object({
    password: Joi.string().min(6).required(), 
    token: Joi.string().required(),
});