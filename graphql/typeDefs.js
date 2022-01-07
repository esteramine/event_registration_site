const gql = require('graphql-tag');

module.exports = gql`
    type Event {
        id: ID!
        title: String!
        description: String
        createdAt: String!
        organizer: String
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
    type Query {
        getEvents: [Event]
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(loginInput: LoginInput): User!
    }
`;