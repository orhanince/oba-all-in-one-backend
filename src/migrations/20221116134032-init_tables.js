'use strict';

const { DataTypes } = require('sequelize');
const { RequestToken } = require('../models');

module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      const opts = {
        transaction: t,
      };

      // request_token table
      await queryInterface.createTable(
        RequestToken.tableName,
        {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.BIGINT,
          },
          request_token_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
          },
          user_id: {
            allowNull: false,
            type: DataTypes.UUID,
          },
          ip_address: {
            allowNull: false,
            type: DataTypes.STRING(50),
          },
          is_revoked: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
          expires: {
            allowNull: true,
            type: DataTypes.DATE,
          },
          status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
          updated_at: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
          deleted_at: {
            allowNull: true,
            type: DataTypes.DATE,
          },
        },
        opts
      );
      await queryInterface.addIndex(
        RequestToken.tableName,
        ['id', 'request_token_id', 'user_id'],
        opts
      );
    });
  },

  async down(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      const opts = {
        transaction: t,
      };
      // remove request_token table
      await queryInterface.dropTable(RequestToken.tableName, opts);
    });
  },
};
