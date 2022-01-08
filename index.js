const { ApolloServer, PubSub } = require('apollo-server');
// const { PubSub } = require('graphql-subscriptions');
const mongoose = require('mongoose');

const { MONGO_URL } = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});

mongoose.connect(MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connected!');
        return server.listen({ port: 5000 });
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    });




