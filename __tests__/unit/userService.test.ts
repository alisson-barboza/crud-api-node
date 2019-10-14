
import { User } from '../../src/models/User'
import UserService from '../../src/service/UserService';


it('should create an user and return it with an id', () =>{
    const user = new User('alisson', 'email@gmail.com', 'male');
    const userCreated = UserService.createUser(user)

    expect(userCreated.id).toBeNull()
})