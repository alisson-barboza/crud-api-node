import QueueUtils from '../utils/QueueUtils'
import { User } from '../../src/models/User'
import UserService from '../../src/service/UserService'

it('should create an user and return it with an id', () => {
  const user = new User('alisson', 'email@gmail.com', 'male')
  const userCreated = UserService.createUser(user)

  expect(userCreated.name).toBe(user.name)
  expect(userCreated.email).toBe(user.email)
  expect(userCreated.gender).toBe(user.gender)
  expect(userCreated.id).not.toBeNull()
  expect(userCreated.id).toBe(0)
})

it('should return the queue', () => {
  expect(UserService.showLine()).not.toBeNull()
})

describe('addToLineTest', () => {
  let user: User
  let userCreated: User
  beforeEach(() => {
    user = new User('alisson', 'eeee@gmail.com', 'male')
    userCreated = UserService.createUser(user)
  })

  afterEach(() => {
    QueueUtils.cleanQueue()
  })

  it('should add an pre-created user to the queue and return it"s position', () => {
    const position = UserService.addToLine(userCreated.id)

    expect(position).toBe(0)
  })

  it('should return -2 since the user id doesnt exists', () => {
    const position = UserService.addToLine(42)

    expect(position).toBe(-2)
  })

  it('should return -1 since the user is already on the queue', () => {
    UserService.addToLine(userCreated.id)
    const position = UserService.addToLine(userCreated.id)

    expect(position).toBe(-1)
  })

  it('should return position as 1 since there is already on user on the queue', () => {
    UserService.addToLine(userCreated.id)
    user = new User('Kvothe', '@gmail.com', 'male')
    userCreated = UserService.createUser(user)
    const position = UserService.addToLine(userCreated.id)

    expect(position).toBe(1)
  })
})

describe('findPosition', () => {
  afterEach(() => {
    QueueUtils.cleanQueue()
  })

  it('should return -2 since the queue is empty', () => {
    const position = UserService.findPosition('someCoolEmail@email.com')

    expect(position).toBe(-2)
  })

  it('should return -1 since the user isnt in the queue', () => {
    const user = UserService.createUser(new User('alisson', 'email@gmail.com', 'male'))
    UserService.addToLine(user.id)

    const position = UserService.findPosition('someCoolEmail@email.com')
    expect(position).toBe(-1)
  })

  it('should return user position', () => {
    const user = UserService.createUser(new User('alisson', 'someCoolEmail@email.com', 'male'))
    UserService.addToLine(user.id)

    const position = UserService.findPosition('someCoolEmail@email.com')
    expect(position).toBe(0)
  })
})

describe('popLine', () => {
  afterEach(() => {
    QueueUtils.cleanQueue()
  })

  it('should return null since the queue is empty', () => {
    expect(UserService.popLine()).toBeNull()
  })

  it('should return an user', () => {
    const user = new User('alisson', 'email@gmail.com', 'male')
    const userCreated = UserService.createUser(user)
    UserService.addToLine(userCreated.id)

    const userReturned = UserService.popLine()

    expect(userCreated.email).toBe(userReturned.email)
    expect(userCreated.gender).toBe(userReturned.gender)
    expect(userCreated.name).toBe(userReturned.name)
  })

  it('should decrement a position', () => {
    const user1 = new User('alisson', 'email@gmail.com', 'male')
    const userCreated = UserService.createUser(user1)
    UserService.addToLine(userCreated.id)

    const user2 = UserService.createUser(new User('alisson', 'someCoolEmail@email.com', 'male'))
    UserService.addToLine(user2.id)

    expect(UserService.popLine().email).toBe('email@gmail.com')
    expect(UserService.popLine().email).toBe('someCoolEmail@email.com')
  })
})

describe('filterLine', () => {
  afterEach(() => {
    QueueUtils.cleanQueue()
  })

  it('should return only male users', () => {
    const userCreated = UserService.createUser(new User('alisson', 'email@gmail.com', 'male'))
    UserService.addToLine(userCreated.id)

    const user2 = UserService.createUser(new User('deborah', 'someCoolEmail@email.com', 'female'))
    UserService.addToLine(user2.id)

    const maleUsers = UserService.filterLine('male')

    expect(maleUsers).not.toBeNull()
  })
})
