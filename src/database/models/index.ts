import { Sequelize } from "sequelize";
import { UserSchema, User } from "./user.model";

export function setupModels(sequelize: Sequelize) {
  User.init(UserSchema, User.config(sequelize))
}