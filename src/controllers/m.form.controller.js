const express = require('express');
const router = express.Router();

const mFormService = require('../services/m.form.service');
const validatorMiddleware = require('../middlewares/validator-middleware');
const { body } = require('express-validator');
const auth = require('../middlewares/auth');

/**
 * POST /
 * @summary Get all user's form.
 * @tags Service
 * @return {Service} 200 - success response - application/json
 */
router.get('/', ...auth(), async (req, res, next) => {
  try {
    const result = await mFormService.getAll(req);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

/**
 * POST /
 * @summary Create user form
 * @tags Service
 * @return {Service} 200 - success response - application/json
 */
router.post(
  '/',
  ...auth(),
  validatorMiddleware(
    body('form_name').isString().isLength({ min: 3, max: 100 }),
    body('form_content').isString()
  ),
  async (req, res, next) => {
    try {
      const result = await mFormService.createForm(req);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
