const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValues, { email, password }, req){
        return AuthService.signup({ email, password, req }); // handle the signup logic, it returns a promise
      }
    },
    logout: {
      type: UserType,
      resolve(parentValues, args, req) {
        const { user } = req; // comes with the password.js
        req.logout(); // func that log out the user, comes with password.js
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValues, { email, password }, req){
        return AuthService.login({ email, password, req });
      }

    }
  }
});

module.exports = mutation;