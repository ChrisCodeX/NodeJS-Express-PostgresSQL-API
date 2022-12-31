import { Sequelize } from "sequelize"
import { sequelize } from "../libs/sequelize"

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
    return new Promise(async (resolve, reject) => {
      try {
        const customer = await sequelize.models.Customer.findByPk(id)
        resolve(customer)
      } catch (error) {
        reject(error)
      }
    })
  }

  /* Create a customer */
  public async create() {

  }
}