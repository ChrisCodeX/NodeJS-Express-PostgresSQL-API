import faker from 'faker';
import {User} from '../models/users.models'

export class UsersService {
  users: User[] = []
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

  public create(data: User) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser)
    return newUser
  }

  public findOne(id: string) {
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('user not found')
    }
    return this.users[index]
  }

  public find() {
    return this.users
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
