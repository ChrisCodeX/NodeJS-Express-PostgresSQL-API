import {Model, DataTypes, Sequelize} from 'sequelize';
import { CUSTOMER_TABLE } from './customer.model';

export const ORDER_TABLE = 'orders';

export const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: DataTypes.NOW
  },
}

export class Order extends Model {
  static associate(models: Sequelize["models"]) {
    this.belongsTo(models.Customer,{as: 'customer'})
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}
