const healthy = require('./healthy.controller');
const authController = require('./auth.controller');
const mFormController = require('./m.form.controller');
/**
 *
 * @param app {Application}
 */
module.exports = (app) => {
  app.use('/', healthy);
  app.use('/auth', authController);
  app.use('/form', mFormController);
};
