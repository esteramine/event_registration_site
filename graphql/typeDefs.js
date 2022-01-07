const gql = require('graphql-tag');

module.exports = gql`
    type Event {
        id: ID!
        title: String!
        description: String
        eventCode: String!
        authCode: String
        createdAt: String!
        organizer: String
        restriction: [String]
    }
    type User {
        id: ID!
        userId: String!
        name: String!
        token: String!
        createdAt: String!
    }
    input RegisterInput {
        userId: String!
        name: String!
        password: String!
        confirmedPassword: String!
    }
    input LoginInput {
        userId: String!
        password: String!
    }
    input EventInput {
        title: String!
        description: String
        authCode: String
        restriction: [String]
    }
    type Query {
        getEvents: [Event]
        getEvent(eventCode: String!): Event
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(loginInput: LoginInput): User!
        createEvent(eventInput: EventInput): Event!
        deleteEvent(eventId: ID!): String!
    }
`;