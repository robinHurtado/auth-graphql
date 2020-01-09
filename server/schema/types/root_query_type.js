const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require('./user_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(_, __, req){
        return req.user; // comes in password.js if it is null then there's not user authentication
      }
    }
  }
});

module.exports = RootQueryType;
