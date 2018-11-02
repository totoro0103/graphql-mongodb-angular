import { combineResolvers } from 'graphql-resolvers';

// import { isAuthenticated, isMessageOwner } from './authorization';

export default {
  Query: {
    messages: async (
      parent,
      { cursor, limit = 100 },
      { models: { Message } },
    ) => {
      const hasNextPage = false;
      const edges = Message.find({});

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: 'test',
        },
      };
    },

    message: async (parent, { id: _id }, { models }) =>
      await models.Message.findOne({ _id }),
  },

  Message: {
    user: async message =>
      (await message.populate('user').execPopulate()).user,
  },

  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED),
    },
  },
};
