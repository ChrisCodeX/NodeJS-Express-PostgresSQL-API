import { sequelize } from "../libs/sequelize"
import boom from '@hapi/boom'
import { Model } from "sequelize"
import { createCustomer } from "../schemas/customer.schema"

export class CustomerService {
  constructor() {

  }

  /* Find all customers */
  public async find() {
    return new Promise(async (resolve, reject) => {
      try {
        const rta = await sequelize.models.Customer.findAll({
          include: ['user']
        })
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
  public async create(data: createCustomer) {
    return new Promise(async (resolve, reject) => {
      try {
        /* Way 1 */
        // const newUser = await sequelize.models.User.create(data.user)
        // const newCostumer = await sequelize.models.Customer.create({
        //   ...data,
        //   userId: newUser.id
        // })

        /* Way 2 */
        const newCustomer = await sequelize.models.Customer.create(data as any, {
          include: ['user']
        })
        resolve(newCustomer)
      } catch (error) {
        reject(error)
      }
    })
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

  /* Delete a customer */
  public async delete(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const customer = await this.findOne(id)
        if (!customer) {
          throw boom.notFound('customer not found')
        }
        const rta = await customer.destroy()
        resolve(rta)
      } catch (error) {
        reject(error)
      }
    })
  }
}