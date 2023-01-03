import { Product } from '../models/products.model';
import boom from '@hapi/boom'
import { sequelize } from '../libs/sequelize';
import { Model } from 'sequelize';

export class ProductService {
  constructor(){
  }

  // Get all products
  public async find() {
    return new Promise<Model<any, any>[]>(async (resolve, reject) => {
      try {
        const products = await sequelize.models.Product.findAll({
          include: ['category']
        })
        resolve(products)
      } catch (error) {
        reject(error)
      }
    })
  }

  // Get a product by id
  public async findOne(id: string) {
    return new Promise<Model<any, any> | null>(async (resolve, reject) => {
      try {
        const product = await sequelize.models.Product.findByPk(id)
        resolve(product)
      } catch (error) {
        reject(error)
      }
    })
  }

  // Create a new product
  public async create(data: Product) {
    return new Promise<Model<any, any>>(async (resolve, reject) => {
      try {
        const newProduct = await sequelize.models.Product.create(data as any);
        resolve(newProduct)
      } catch (error) {
        reject(error)
      }
    })
  }

  // Update a product
  public async update(id: string, changes: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await this.findOne(id)
        const rta = product?.update(changes)
        resolve(rta)
      } catch (error) {
        reject(error)
      }
    })
  }

  // Delete a product
  public async delete(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await this.findOne(id)
        if (!product) {
          throw boom.notFound('product not found')
        }
        const rta = product?.destroy()
        resolve(rta)
      } catch (error) {
        reject(error)
      }
    })
  }
}
