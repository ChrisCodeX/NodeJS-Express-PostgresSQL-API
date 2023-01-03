import {Model, DataTypes, Sequelize} from 'sequelize';

// Category table name
export const CATEGORY_TABLE = 'categories';

// Category Schema
export const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: DataTypes.NOW
  }
}

export class Category extends Model {
  static associate(models: Sequelize["models"]) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId'
    })
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}