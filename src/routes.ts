import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = Router()

routes.post('/createUser', UserController.create)
routes.post('/addToLine', UserController.add)
routes.post('/findPosition', UserController.findPosition)
routes.get('/showLine', UserController.showLine)
routes.post('/filterLine', UserController.filterLine)
routes.get('/popLine', UserController.popLine)

export default routes
