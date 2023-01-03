import {Model, DataTypes, Sequelize} from 'sequelize';
import { CATEGORY_TABLE } from './category.model';

// Product table name
export const PRODUCT_TABLE = 'products';

// Product Schema
export const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: DataTypes.NOW
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

export class Product extends Model {
  static associate(models: Sequelize["models"]) {
    this.belongsTo(models.Category,{as: 'category'})
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}