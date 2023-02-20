const Joi = require("joi");

const schemaUserRegistration = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const schemaUserLogin = Joi.object({
  password: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const schemaSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  schemaUserRegistration,
  schemaUserLogin,
  schemaSubscription,
};
