const gql = require('graphql-tag');

module.exports = gql`
    type Organizer {
        userId: String!
        name: String!
    }
    type Participant {
        userId: String!
        name: String!
        createdAt: String!
    }
    type Event {
        id: ID!
        title: String!
        description: String
        eventCode: String!
        authCode: String
        eventTime: String!
        createdAt: String!
        organizer: Organizer!
        restrictions: [String]
        participants: [Participant]
        participantCount: String!
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
        description: String!
        authCode: String!
        eventTime: String!
        restrictions: [String]
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
    type Subscription {
        newEvent: Event!
    }
`;