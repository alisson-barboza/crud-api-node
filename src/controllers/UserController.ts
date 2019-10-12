import { Request, Response } from 'express'
import userService from '../service/UserService'
import { User } from '../models/User'

class UserController {
  public create (req: Request, res: Response) : Response {
    const body = req.body
    const user = new User(body.name, body.email, body.gender)
    return res.json(userService.createUser(user))
  }

  public add (req:Request, res:Response): Response {
    return res.json(userService.addToLine(req.body.id))
  }

  public findPosition (req:Request, res:Response): Response {
    return res.json(userService.findPosition(req.body.email))
  }

  public showLine (req:Request, res:Response): Response {
    return res.json(userService.showLine())
  }

  public filterLine (req:Request, res:Response): Response {
    return res.json(userService.filterLine(req.body.gender))
  }

  public popLine (req:Request, res:Response): Response {
    return res.json(userService.popLine())
  }
}

export default new UserController()
