/*const _ = require('lodash');*/
const { Form } = require('./../models');
/*const GenericError = require('../utils/generic-error');*/
const moment = require('moment-timezone');
const { ApiPOST, ServiceUrl } = require('./../utils/api-caller');

async function createForm(req) {
  const { form_name, form_content } = req.body || {};
  let createFromResponse = await ApiPOST(req, ServiceUrl.FORM, {
    route: '/form',
    withoutAuth: false,
    payload: {
      form_name: form_name,
      form_content: form_content,
    },
  });
  return createFromResponse.data;
}

async function updateForm({ params, body, AUTH }) {
  const { form_name, form_content, form_link, form_published_link, active } =
    body || {};

  const now = moment.utc().toISOString();
  const [updateForm] = await Form.update(
    {
      form_name: form_name,
      form_content: form_content,
      form_link: form_link,
      form_published_link: form_published_link,
      active: active,
      updated_at: now,
    },
    {
      where: {
        form_id: params.form_id,
        user_id: AUTH.user_id,
      },
    }
  );

  return {
    status: true,
    data: updateForm,
  };
}

module.exports = {
  createForm,
  updateForm,
};
