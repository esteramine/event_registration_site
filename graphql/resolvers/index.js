const eventsResolvers = require('./events');
const usersResolvers = require('./users');

module.exports = {
    Query: {
        ...eventsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation
    }
};