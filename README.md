# Queue-rpc-node

  RPC API developed using Node.Js plus Typescript, Jest for Unit Test, Sucrase as transpiler, Nodemon and Express.
The main goal of this API is to manage an users queue, e.g.:  create an user, insert it the queue, remove the first user, show all the queue, and so on...

## How to execute
  Clone this project into some folder of your choice, run your package manager command so it can download the node_modules folder, I used yarn to develop this API so in my case would be "$ yarn", npm would be "$ npm init"
  ### Dev mode
    There's already a script to execute nodemon, you just have to run "$ yourPackageManagerCommand dev"
  
  ### Tests
    There's already a script to execute jest, you just have to run "$ yourPackageManagerCommand test"
    
  ### Build
    There's already a script to build the api (transpile and run it), you just have to run "$ yourPackageManagerCommand build"

## Routes

- POST - /createUser -- Creates an user 
  - Expects a name, email and gender of the user
  - Returns the same information plus id
  
- POST - /addToLine -- Adds an user onto the queue
  - Expects an id of the user that is going to be inserted
  - Returns its position on queue (-2 if user doesn't exist || -1 if user is already on the queue)
  
- POST - /findPosition -- Returns the position of an user on the queue
  - Expects user email
  - Returns its position on queue (-2 if queue is empty || -1 if user isn't in queue)

- GET - /showLine -- Returns all users in the queue
  
- POST - /filterLine -- List users filtered by gender
  - Expects a gender to be filtered
  - Returns all users that match with the filter
  
- GET - /popLine -- Returns the first user inside a queue
  - Returns the first user an update others positions (returns null if queue is empty)
