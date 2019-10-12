export class User {
    id ?: number
    name: string
    email : string
    gender: string
    constructor (name:string, email:string, gender:string, id?: number) {
      this.id = id
      this.name = name
      this.email = email
      this.gender = gender
    }
}
