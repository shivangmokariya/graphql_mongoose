const { buildSchema } = require('graphql');


const schema = buildSchema(`
  type User {
    _id: ID!
    email: String!
    password: String!
    message:String!
  }


  type Query {
    users: [User]
  }

  input UserInput {
    email: String!
    password: String!
  }

  type RootQuery {
    login(email: String!, password: String!): User
    users: [User]
  }

  type RootMutation {
    createUser(userInput: UserInput): User
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
module.exports=schema;