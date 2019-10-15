import fs from 'fs'

class QueueUtils {
  public cleanQueue (): void{
    fs.writeFileSync('database/Queue.json', '')
  }
}

export default new QueueUtils()
