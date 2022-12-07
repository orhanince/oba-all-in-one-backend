const _ = require('lodash');
const GenericError = require('./../utils/generic-error');
const jwt = require('./../utils/jwt');
const { ApiGET, ServiceUrl } = require('./../utils/api-caller');
const { ApiPOST } = require('../utils/api-caller');
/**
 * Register
 */
async function register(req) {
  const { name, email, password } = req.body || {};
  if (_.isEmpty(name) || _.isEmpty(email) || _.isEmpty(password)) {
    throw new GenericError(
      400,
      'Missing fields',
      'Name, Email, Password required.'
    );
  }

  const user = await ApiGET(req, ServiceUrl.USER, {
    route: '/user',
    withoutAuth: true,
    payload: {
      email: email,
    },
  });

  if (!_.isEmpty(user.data.data)) {
    throw new GenericError(400, 'user_already_exists', 'User already exists.');
  }

  const userCreatedResponse = await ApiPOST(req, ServiceUrl.USER, {
    route: '/user',
    withoutAuth: true,
    payload: {
      name: name,
      email: email,
      password: password,
    },
  });

  return {
    status: true,
    token: jwt.createJwtToken({
      user_id: userCreatedResponse.user_id,
      email: userCreatedResponse.email,
    }),
  };
}

module.exports = {
  register,
};
