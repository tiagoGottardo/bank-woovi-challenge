const resolvers = {
  Query: {
    hello: (_: any, { name }: { name: string }) => `Hello, ${name}!`,
  },
};

export default resolvers;
