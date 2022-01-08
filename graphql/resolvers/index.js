const eventsResolvers = require('./events');
const usersResolvers = require('./users');

module.exports = {
    Event: {
        participantCount: (parent) => parent.participants.length
    },
    Query: {
        ...eventsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...eventsResolvers.Mutation
    },
    Subscription: {
        ...eventsResolvers.Subscription
    }
};