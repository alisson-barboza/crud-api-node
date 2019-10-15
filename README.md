# Queue-rpc-node

RPC API developed using Node.Js plus Typescript, Jest for Unit Test, Sucrase as transpiler, Nodemon and Express.
The main goal of this API is to manage an users queue, like:  create an user, insert it the queue, remove the first user, show all the queue, and so on...

## How to execute

Clone this project into some folder of your choice, run your package manager command so it can download the node_modules folder, I used yarn to develop this API so in my case would be "$ yarn" and execute "$ yourPackageManager dev" to run nodemon in dev environment.

## Routes

- POST - /createUser -- Creates an user 
  - Expects a name, email and gender of the user
  - Returns the same information plus id
  
- POST - /addToLine -- Adds an user onto the queue
  - Expects an id of the user that is going to be inserted
  - Returns it's position on the queue (-2 if the user doesnt exist || -1 if the user is already on the queue)
  
- POST - /findPosition -- Returns the position of an user on the queue
  - Expects user email
  - Returns it's position on the queue (-2 if the queue is empty || -1 if the user isnt in the queue)

- GET - /showLine -- Returns all users in the queue
  
- POST - /filterLine -- List users filtered by gender
  - Expects a gender to be filtered
  - Returns all users that match with the filter
  
- GET - /popLine -- Returns the first user on the queue
  - Returns the first user an update others poisitions (returns null if the queue is empty)
