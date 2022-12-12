const {
  ApiPOST,
  ApiGET,
  ApiPUT,
  ApiDELETE,
  ServiceUrl,
} = require('./../utils/api-caller');

/**
 * Get user's all form
 * @param {Object} req
 * @returns {Promise<*>}
 */
async function getAll(req) {
  let getUserAllFormResponse = await ApiGET(req, ServiceUrl.FORM, {
    route: '/form',
    withoutAuth: false,
  });
  return getUserAllFormResponse.data;
}

/**
 * Create form
 * @param {Object} req
 * @returns {Promise<*>}
 */
async function createForm(req) {
  const { form_name, form_content } = req.body || {};
  let createFromResponse = await ApiPOST(req, ServiceUrl.FORM, {
    route: '/form',
    withoutAuth: true,
    payload: {
      form_name: form_name,
      form_content: form_content,
    },
  });
  return createFromResponse.data;
}

/**
 * Update form
 * @param {Object} req
 * @returns {Promise<*>}
 */
async function updateForm(req) {
  const { form_id } = req.params || {};
  const { form_name, form_content } = req.body || {};
  let updateFormResponse = await ApiPUT(req, ServiceUrl.FORM, {
    route: `/form/${form_id}`,
    withoutAuth: true,
    headers: {
      'Content-Type': 'application/json',
      authorization: req.headers.authorization,
    },
    payload: {
      form_name: form_name,
      form_content: form_content,
    },
  });
  return updateFormResponse.data;
}

/**
 * Publish form
 * @param {Object} req
 * @returns {Promise<*>}
 */
async function publishForm(req) {
  const { form_id } = req.params || {};
  let publishFromUpdate = await ApiPOST(req, ServiceUrl.FORM, {
    route: '/form/publish',
    withoutAuth: true,
    headers: {
      'Content-Type': 'application/json',
      authorization: req.headers.authorization,
    },
    payload: {
      form_id: form_id,
    },
  });

  return publishFromUpdate.data;
}

/**
 * Delete form
 * @param {Object} req
 * @returns {Promise<*>}
 */
async function deleteForm(req) {
  const { form_id } = req.params || {};
  let deleteFormResponse = await ApiDELETE(req, ServiceUrl.FORM, {
    route: '/form',
    withoutAuth: true,
    payload: {
      form_id: form_id,
    },
  });
  return deleteFormResponse.data;
}

module.exports = {
  createForm,
  getAll,
  updateForm,
  publishForm,
  deleteForm,
};
