import Joi from 'joi';

export const usernameSchema = Joi.string().min(4).max(30).required().label('Username');

export const passwordSchema = Joi.string()
	.min(8)
	.max(50)
	.pattern(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/)
	.required()
	.label('Password')
	.messages({
		'string.pattern.base': '{#label} must have at least one lowercase letter, one uppercase letter, and one digit.',
		'string.base': '{#label} should be a type of "text"'
	});

export const nameSchema = Joi.string().max(254).required().label('Name');

export const natureSchema = Joi.string().uppercase().max(10).required().label('Nature');

export const signInSchema = Joi.object().keys({ username: usernameSchema, password: passwordSchema });

export const accountSchema = Joi.object().keys({ username: usernameSchema, password: passwordSchema, name: nameSchema });

export const levelSchema = Joi.object().keys({ name: nameSchema, nature: natureSchema });
