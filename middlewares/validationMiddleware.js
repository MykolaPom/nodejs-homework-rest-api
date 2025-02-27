const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      phone: Joi.number().required(),
      favorite: Joi.boolean(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error });
    }

    next();
  },

  putContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).optional(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .optional(),
      phone: Joi.number().optional(),
      favorite: Joi.boolean(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  },

  signupValidation: (req, res, next) => {
   const schema = Joi.object({
     // name: Joi.string().required(),
     email: Joi.string()
       .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
       .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
       .required(),
     password: Joi.string()
       .min(6)
       .required()
       .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
   });

    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  },

  loginValidation: (req, res, next) => {
   const schema = Joi.object({
     email: Joi.string()
       .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
       .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
       .required(),
     password: Joi.string()
       .min(6)
       .required()
       .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
   });
    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  },
};
