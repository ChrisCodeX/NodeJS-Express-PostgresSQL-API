import faker from 'faker';
import { Product } from '../models/products.model';
import boom from '@hapi/boom'
import { pool } from '../libs/postgres';
import { Pool } from 'pg';
import { sequelize } from '../libs/sequelize';

export class ProductService {
  public products: Product[]
  public pool: Pool
  constructor(){
    this.products = []
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => {
      console.error(err)
    })
  }

  private generate() {
    const limit = 10
    for (let i = 0; i < parseInt(limit.toString(), 10); i++) {
      this.products.push(
        {
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(1, 1000), 10),
          imageUrl: faker.image.imageUrl(),
          isBlock: faker.datatype.boolean()
        }
      );
    }
  }

  /* Methods */
  public async create(data: Product) {
    return new Promise<Product>((resolve, reject) => {
      setTimeout(() => {
        try {
          const newProduct = {
            id: faker.datatype.uuid(),
            ...data
          }
          this.products.push(newProduct);
          resolve(newProduct)
        } catch (error) {
          reject(error)
        }
      }, 1000);
    })
  }

  public async find() {
    return new Promise<unknown>(async (resolve, reject) => {
      try {
        const query = 'SELECT * FROM tasks'
        const [data] = await sequelize.query(query)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  public async findOne(id: string) {
    return new Promise<Product | undefined>((resolve, reject) => {
      setTimeout(() => {
        try {
          const product = this.products.find(item => item.id === id)
          if (!product) {
            throw boom.notFound('product not found')
          }
          if (product.isBlock) {
            throw boom.conflict('products is blocked')
          }
          resolve(product)
        } catch (error) {
          reject(error)
        }
      }, 1000);
    })
  }

  public async update(id: string, changes: any) {
    return new Promise<Product>((resolve, reject) => {
      setTimeout(() => {
        try {
          const index = this.products.findIndex(item => item.id === id);
          if (index === -1) {
            throw boom.notFound('product not found')
          }

          const product = this.products[index]
          this.products[index] = {
            ...product,
            ...changes
          }

          resolve(this.products[index])
        } catch (error) {
          reject(error)
        }
      }, 1000);
    })
  }

  public async delete(id: string) {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        try {
          const index = this.products.findIndex(item => item.id === id);
          if (index === -1) {
            throw boom.notFound('product not found')
          }
          this.products.splice(index, 1)
          resolve(id)
        } catch (error) {
          reject(error)
        }
      }, 1000);
    })
  }
}
