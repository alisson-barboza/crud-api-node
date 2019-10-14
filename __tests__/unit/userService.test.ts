
import { User } from '../../src/models/User'
import UserService from '../../src/service/UserService';


it('should create an user and return it with an id', () =>{
    const user = new User('alisson', 'email@gmail.com', 'male');
    const userCreated = UserService.createUser(user)

    expect(userCreated.name).toBe(user.name)
    expect(userCreated.email).toBe(user.email)
    expect(userCreated.gender).toBe(user.gender)
    expect(userCreated.id).not.toBeNull()
})


