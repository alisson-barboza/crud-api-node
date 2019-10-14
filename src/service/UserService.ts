import { User } from '../models/User'
import JsonParser from '../utils/JsonParser'
import { UserOnQueue } from '../models/UserOnQueue'

class UserRepository {
  private lastId:number
  private usersMap: Map<number, User>

  public constructor () {
    this.usersMap = new Map()
    const array = JsonParser.readQueueu()
    const user = array[array.length - 1]
    if (user) {
      this.lastId = user.id
    } else {
      this.lastId = -1
    }
  }

  public createUser (user:User):User {
    this.lastId++
    user.id = this.lastId
    this.usersMap.set(user.id, user)
    return user
  }

  public addToLine (id:number):number {
    const queue = JsonParser.readQueueu()
    const newUser = this.usersMap.get(Number(id))
    if (!newUser) {
      console.log('This user doesnt exist')
      return -2
    }
    const newUserOnQueue = new UserOnQueue(newUser.name, newUser.email, newUser.gender, newUser.id)
    newUserOnQueue.position = queue.length
    if (queue.length === 0) {
      queue.push(newUserOnQueue)
      JsonParser.add(queue)
      return newUserOnQueue.position
    }

    const duplicateUser = queue.find((user) => user.email === newUser.email)
    if (!duplicateUser) {
      queue.push(newUserOnQueue)
      JsonParser.add(queue)
      return newUserOnQueue.position
    }

    console.log('This user is already on the queue')
    return -1
  }

  public findPosition (email:string): number {
    const queue = JsonParser.readQueueu()
    if (queue.length !== 0) {
      const user = queue.find((user) => user.email === email)
      if (user) {
        return user.position
      } else {
        console.log('User isn"t in the Queue')
        return -1
      }
    } else {
      console.log('The queue is empty')
      return -1
    }
  }

  public showLine (): UserOnQueue[] {
    return JsonParser.readQueueu()
  }

  public filterLine (gender:string):UserOnQueue[] {
    return JsonParser.readQueueu().filter((element) => element.gender === gender)
  }

  public popLine ():User {
    const queue = JsonParser.readQueueu()
    if (queue.length === 0) {
      console.log('The queue is empty')
      return null
    }
    const user = queue.shift()
    queue.forEach((element) => {
      element.position--
    })
    JsonParser.add(queue)
    return new User(user.name, user.email, user.gender)
  }
}

export default new UserRepository()
