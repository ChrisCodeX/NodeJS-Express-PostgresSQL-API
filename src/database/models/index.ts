import { Sequelize } from "sequelize";
import { UserSchema, User } from "./user.model";
import { CustomerSchema, Customer } from "./customer.model";

export function setupModels(sequelize: Sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))
}