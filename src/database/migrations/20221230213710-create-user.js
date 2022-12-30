'use strict';

import { UserSchema, USER_TABLE } from './../models/user.model';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.drop(USER_TABLE);
  }
};
