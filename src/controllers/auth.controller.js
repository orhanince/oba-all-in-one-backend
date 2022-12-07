const express = require('express');
const router = express.Router();
const validatorMiddleware = require('../middlewares/validator-middleware');
const { body } = require('express-validator');
const authService = require('../services/auth.service');
/**
 * @typedef {object} JwtResponse
 * @property {string} status - true
 * @property {string} access_token - Jwt Token
 */

/**
 * @typedef {object} LoginResponse
 * @property {string} status - true
 * @property {string} token - Request token
 */

/**
 * @typedef {object} LoginBody
 * @property {string} email - Email
 * @property {string} password - Password
 */

/**
 * POST /auth/login
 * @summary Log in
 * @tags Auth
 * @param {LoginBody} request.body.required - Create login body
 * @return {JwtResponse|LoginResponse} 200 - success response - application/json
 */
router.post(
  '/login',
  validatorMiddleware(
    body('email').isString().isLength({ min: 5, max: 100 }),
    body('password').isString().isLength({ min: 6, max: 100 })
  ),
  async (req, res, next) => {
    try {
      res.status(200).json('Ok!');
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

/**
 * POST /auth/register
 * @summary Log in
 * @tags Auth
 * @param {LoginBody} request.body.required - Create login body
 * @return {JwtResponse|LoginResponse} 200 - success response - application/json
 */
router.post(
  '/register',
  validatorMiddleware(
    body('name').isString().isLength({ min: 5, max: 100 }),
    body('email').isString().isLength({ min: 6, max: 100 }),
    body('password').isString().isLength({ min: 6, max: 100 })
  ),
  async (req, res, next) => {
    try {
      const result = await authService.register(req);
      res.status(200).json(result);
    } catch (e) {
      // this line is require for global error handling.
      next(e);
    }
  }
);

module.exports = router;
