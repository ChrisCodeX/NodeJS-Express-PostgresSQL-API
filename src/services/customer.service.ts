import { sequelize } from "../libs/sequelize"
import boom from '@hapi/boom'
import { Model } from "sequelize"

class customerService {
  constructor() {

  }

  /* Find all customers */
  public async find() {
    return new Promise(async (resolve, reject) => {
      try {
        const rta = await sequelize.models.Customer.findAll()
        resolve(rta)
      } catch (error) {
        reject(error)
      }
    })
  }

  /* Find just one customer */
  public async findOne(id:string) {
    return new Promise<Model<any, any> | null>(async (resolve, reject) => {
      try {
        const customer = await sequelize.models.Customer.findByPk(id)
        if (!customer) {
          throw boom.notFound('customer not found')
        }
        resolve(customer)
      } catch (error) {
        reject(error)
      }
    })
  }

  /* Create a customer */
  public async create() {

  }

  /* Update customer data */
  public async update(id: string, changes: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const customer = await this.findOne(id)
        const rta = await customer?.update(changes)
        resolve(rta)
      } catch (error) {
        reject(error)
      }
    })
  }
}