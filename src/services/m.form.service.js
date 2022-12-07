const { ApiPOST, ApiGET, ServiceUrl } = require('./../utils/api-caller');

async function getAll(req) {
  let getUserAllFormResponse = await ApiGET(req, ServiceUrl.FORM, {
    route: '/form',
    withoutAuth: false,
  });
  return getUserAllFormResponse.data;
}

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

module.exports = {
  createForm,
  getAll,
};
