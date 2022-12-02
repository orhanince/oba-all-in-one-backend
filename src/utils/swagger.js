/*
 * JSDoc documentation
 * https://www.npmjs.com/package/express-jsdoc-swagger
 */

const path = require('path');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const packageJson = require(process.env.npm_package_json);

const options = {
  info: {
    version: process.env.npm_package_version,
    title: process.env.npm_package_name,
    description: packageJson.description || '',
    license: {
      name: packageJson.license || 'MIT',
    },
  },
  security: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  baseDir: path.join(__dirname, '..', 'controllers'),
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};

const swagger = (app) => {
  expressJSDocSwagger(app)(options);
};

module.exports = swagger;
