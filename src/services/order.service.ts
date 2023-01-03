import boom from '@hapi/boom';
import { sequelize } from '../libs/sequelize';

export class OrderService {
  constructor() {}

  // Get all orders
  public async find() {
    return new Promise (async (resolve, reject) => {
        try {
          const orders = await sequelize.models.Order.findAll()
          resolve(orders)
        } catch (error) {
          reject(error)
        }
    })
  }

  public async findOne(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const order = await sequelize.models.Order.findByPk(id, {
          include: [{
            association: 'customer',
            include: ['user']
          },
          'items'
        ]
        })
        resolve(order)
      } catch (error) {
        reject(error)
      }
    })
  }

  public async create(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const newOrder = await sequelize.models.Order.create(data)
        resolve(newOrder)
      } catch (error) {
        reject(error)
      }
    })
  }

  public async addItem(id: string, data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const item = {
          orderId: id,
          ...data
        }
        const newItem = await sequelize.models.OrderProduct.create(item)
        resolve(newItem)
      } catch (error) {
        reject(error)
      }
    })
  }
}