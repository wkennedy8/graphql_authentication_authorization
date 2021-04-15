if (process.env.NODE_ENV !== 'production') require('dotenv').config();
require('./db/config');
const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { applyMiddleware } = require('graphql-middleware');
const resolvers = require('./resolvers');
const typeDefs = require('./types');
const { permissions } = require('./middleware/permissions');
const jwt = require('jsonwebtoken');

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  permissions
);

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.exp > Date.now()) {
        return { user: null };
      } else {
        return { user: decoded };
      }
    }
    return { user: null };
  }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
