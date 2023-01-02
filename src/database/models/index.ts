import { Sequelize } from "sequelize";
import { UserSchema, User } from "./user.model";
import { CustomerSchema, Customer } from "./customer.model";

export function setupModels(sequelize: Sequelize) {
  /* Init all tables */
  User.init(UserSchema, User.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))

  /* relationships between database tables */
  User.assocciate(sequelize.models)
  Customer.associate(sequelize.models)
}