import { Sequelize } from "sequelize";

import { User, UserSchema } from "./user.model";
import { Customer, CustomerSchema } from "./customer.model";
import { Category, CategorySchema } from "./category.model";
import { Product, ProductSchema} from './product.model'
import { Order, OrderSchema } from "./order.model";

export function setupModels(sequelize: Sequelize) {
  /* Init all tables */
  User.init(UserSchema, User.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))
  Product.init(ProductSchema, Product.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  Order.init(OrderSchema, Order.config(sequelize))

  /* relationships between database tables */
  User.associate(sequelize.models)
  Customer.associate(sequelize.models)
  Product.associate(sequelize.models)
  Category.associate(sequelize.models)
  Order.associate(sequelize.models)
}