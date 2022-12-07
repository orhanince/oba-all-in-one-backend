const _ = require('lodash');
const GenericError = require('./../utils/generic-error');
const jwt = require('./../utils/jwt');
const cryptoService = require('./crypto.service');
const { ApiGET, ApiPOST, ServiceUrl } = require('./../utils/api-caller');
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

/**
 * Index
 * @param {object} req
 * @returns {Promise<{status: boolean, token: (*)}>}
 */
async function login(req) {
  const { email, password } = req.body || {};
  if (_.isEmpty(email)) {
    throw new GenericError(
      400,
      'phone_or_username_required',
      `Phone or Username required.`
    );
  }

  const user = await ApiGET(req, ServiceUrl.USER, {
    route: '/user',
    withoutAuth: true,
    payload: {
      email: email,
    },
  });

  if (_.isEmpty(user.data.data)) {
    throw new GenericError(400, 'user_not_found', `User not found.`);
  }

  if (!cryptoService.isEqualHashedPassword(password, user.data.data.password)) {
    throw new GenericError(400, 'password_wrong', `The password is wrong.`);
  }

  return {
    status: true,
    token: jwt.createJwtToken({ user_id: user.user_id, email: user.email }),
  };
}

module.exports = {
  register,
  login,
};
