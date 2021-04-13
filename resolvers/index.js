const User = require('../db/models/user');
const resolvers = {
  Query: {
    users: async () => await User.find(),
    currentUser: async (_, __, { input }) =>
      await User.findOne({ email: input.email })
  },
  Mutation: {
    signUp: async (_, { input }) => {
      const existingUser = await User.findOne({ email: input.email });
      if (existingUser) throw new Error('User already exists');
      const user = new User({ ...input });
      const token = await user.generateAuthToken();
      return {
        user,
        token
      };
    },
    signIn: async (_, { input }) => {
      const user = await User.findByCredentials(input.username, input.password);
      const token = await user.generateAuthToken();
      return {
        user,
        token
      };
    }
  }
};

module.exports = resolvers;
