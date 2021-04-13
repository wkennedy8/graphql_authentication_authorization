const { rule, shield, chain, not } = require('graphql-shield');
const isAuthenticated = rule({ cache: 'contextual' })(
  (parent, args, context) => !!context.user
);
const isAdmin = rule({ cache: 'contextual' })((parent, args, context) =>
  context.user.role.includes('admin')
);

const permissions = shield({
  Query: {
    users: chain(isAuthenticated, isAdmin)
  },
  Mutation: {
    signUp: not(isAuthenticated),
    signIn: not(isAuthenticated)
  }
});

module.exports = { permissions };
