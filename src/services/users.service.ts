import faker from 'faker';
import {User} from '../models/users.models'
import { sequelize } from '../libs/sequelize';

export class UsersService {
  users: any[] = []
  constructor(){
    this.generate()
  }

  private generate() {
    const size = 10
    for (let i = 0; i < size; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        age: faker.datatype.number(80)
      })
    }
  }

  public async create(data: User) {
    return new Promise(async (resolve, reject)=>{
      try {
        const newUser = await sequelize.models.User.create(data as any)
        resolve(newUser)
      } catch (error) {
        reject(error)
      }
    })
  }

  public findOne(id: string) {
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('user not found')
    }
    return this.users[index]
  }

  public async find() {
    return new Promise(async (resolve, reject) => {
      try {
        /* Query consult */
        // const query = 'SELECT * FROM tasks';
        // const rta = await pool.query(query)
        /* Consulta usando ORM */
        const rta = await sequelize.models.User.findAll()
        resolve(rta)
      } catch (error) {
        reject(error)
      }
    })
  }

  public update(id: string, changes: any) {
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('user not found')
    }

    const user = {
      ...changes
    }
    this.users[index] = user
    return user
  }

  public delete(id: string) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('user not found')
    }
    this.users.splice(index, 1)
    return {id}
  }
}
