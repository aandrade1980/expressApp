const { reject } = require('lodash');
const validator = require('validator');

const models = require('../models');

const validateCreateUserFields = (errors, req) => {
  if (!validator.isEmail(req.body.email)) {
    errors['email'] = 'Please use a valid email!';
  }

  if (!validator.isAscii(req.body.password)) {
    errors['password'] =
      'Invalid characters in password, please try anohter one!';
  }

  if (!validator.isLength(req.body.password, { min: 8, max: 25 })) {
    errors['password'] =
      'Please ensure that your password has a minimum of 8 characters';
  }
};

exports.validateUser = (errors, req) => {
  return new Promise(resolve => {
    validateCreateUserFields(errors, req);
    return models.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        errors['email'] =
          'Email is already in user. Please login or reset your password';
      }

      resolve(errors);
    });
  });
};
