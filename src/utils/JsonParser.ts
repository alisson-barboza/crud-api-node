import fs from 'fs'
import { UserOnQueue } from '../models/UserOnQueue'

class JsonParser {
    private defaultPath = 'database/Queue.json'

    public readQueueu (): UserOnQueue[] {
      const dataBuffer = fs.readFileSync(this.defaultPath)
      if (dataBuffer.toString().length === 0) {
        return []
      }
      return JSON.parse(dataBuffer.toString())
    }

    public add (users: UserOnQueue[]): void {
      fs.writeFileSync(this.defaultPath, JSON.stringify(users))
    }
}

export default new JsonParser()
