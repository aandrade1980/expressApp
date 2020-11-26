const models = require('../models');

exports.get_landing = function (req, res, next) {
  res.render('landing', { title: 'Express' });
};

exports.show_leads = function (req, res, next) {
  models.Lead.findAll().then(leads => {
    res.render('landing', { title: 'Express', leads });
  });
};

exports.submit_lead = (req, res, next) =>
  models.Lead.create({
    email: req.body.lead_email
  }).then(lead => res.redirect('/leads'));
