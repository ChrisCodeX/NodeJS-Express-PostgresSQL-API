import { sequelize } from "../libs/sequelize"
import { Model } from "sequelize"
import boom from '@hapi/boom'

export class CategoryService {
  constructor() {}

  // Get all categories
  public async find() {
    return new Promise(async (resolve, reject) => {
      try {
        const rta = await sequelize.models.Category.findAll()
        resolve(rta)
      } catch (error) {
        reject(error)
      }
    })
  }

  // Get a category by id
  public async findOne(id: string) {
    return new Promise<Model<any, any> | null>(async (resolve, reject) => {
      try {
        const category = await sequelize.models.Category.findByPk(id)
        if (!category) {
          throw boom.notFound('category not found')
        }
        resolve(category)
      } catch (error) {
        reject(error)
      }
    })
  }

  // Create a new category
  public async create(data: unknown) {
    return new Promise(async (resolve, reject) => {
      try {
        
      } catch (error) {
        reject(error)
      }
    })
  }

  // Update a category
  public async update(id: string, changes: any) {
    return new Promise(async (resolve, reject) => {
      try {
        
      } catch (error) {
        reject(error)
      }
    })
  }

  // Delete a category
  public async delete(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await this.findOne(id)
        if (!category) {
          throw boom.notFound('category not found')
        }
        const rta = await category.destroy()
        resolve(rta)
      } catch (error) {
        reject(error)
      }
    })
  }
}