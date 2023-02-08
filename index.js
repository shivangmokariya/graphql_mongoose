const express = require("express");
const app = express();
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const { graphqlHTTP } = require('express-graphql');
const bcrypt = require('bcrypt');
const schema = require('./model')
const User=require('./schema')

// console.log(schema)
const rootValue = {
  
  createUser: async ({ userInput }) => {
    // console.log(hashedPassword,"--------------------")
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      throw new Error("User already exists.");
    }
    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    // console.log(hashedPassword,"--------------------")
    const user = new User({
      email: userInput.email,
      password: hashedPassword,
    });
    const result = await user.save();
    // console.log(...result._doc,"-jjdjhjjdj")
    return { ...result._doc };
  },
  
login: async ({ email, password }) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("User does not exist.");
  }
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw new Error("Password is incorrect.");
  }
  return { ...user._doc};
},
users:async()=>{
  const user=await User.find();
  return user;
}
};



app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

app.listen(3000,()=>{
  console.log("server is listening on port 3000")
})




