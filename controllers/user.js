const passport = require('passport');
const bcrypt = require('bcrypt');
const falsh = require('connect-flash');
const { isEmpty } = require('lodash');

const models = require('../models');
const myPassport = require('../passport_setup')(passport);
const { validateUser } = require('../validators/signup');

const generateHash = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

exports.show_login = (req, res, next) =>
  res.render('user/login', { formData: {}, errors: {} });

exports.show_signup = (req, res, next) =>
  res.render('user/signup', { formData: {}, errors: {} });

const rerender_signup = (errors, req, res, next) =>
  res.render('user/signup', { formData: req.body, errors });

exports.signup = (req, res, next) => {
  let errors = {};
  return validateUser(errors, req).then(errors => {
    if (!isEmpty(errors)) {
      rerender_signup(errors, req, res, next);
    } else {
      return models.User.findOne({
        where: {
          is_admin: true
        }
      }).then(user => {
        let newUser;
        if (user) {
          newUser = models.User.build({
            email: req.body.email,
            password: generateHash(req.body.password)
          });
        } else {
          newUser = models.User.build({
            email: req.body.email,
            password: generateHash(req.body.password),
            is_admin: true
          });
        }
        return newUser.save().then(result => {
          passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash: true
          })(req, res, next);
        });
      });
    }
  });
};

exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};
