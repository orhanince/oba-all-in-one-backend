const express = require('express');
const router = express.Router();

const mFormService = require('../services/m.form.service');
const validatorMiddleware = require('../middlewares/validator-middleware');
const { body, param } = require('express-validator');
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

/**
 * PUT /publish/{form_id}
 */
router.put(
  '/publish/:form_id',
  ...auth(),
  validatorMiddleware(
    param('form_id').isString().isLength({ min: 3, max: 100 })
  ),
  async (req, res, next) => {
    try {
      const result = await mFormService.publishForm(req);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * PUT /
 */
router.put(
  '/',
  ...auth(),
  validatorMiddleware(
    body('form_name').isString().isLength({ min: 3, max: 100 }),
    body('form_content').isString()
  ),
  async (req, res, next) => {
    try {
      const result = await mFormService.updateForm(req);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

/** DELETE / */
router.delete(
  '/:form_id',
  validatorMiddleware(
    param('form_id').isString().isLength({ min: 3, max: 100 })
  ),
  ...auth(),
  async (req, res, next) => {
    try {
      console.log('be', 1);
      const result = await mFormService.deleteForm(req);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
