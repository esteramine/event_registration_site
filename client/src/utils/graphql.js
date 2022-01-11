import gql from "graphql-tag";

export const FETCH_EVENTS_QUERY = gql` 
{
    getEvents {
        id
        title
        description
        eventCode
        eventTime
        createdAt
        organizer {
            userId
            name
        }
        restrictions
        participantCount
    }
}
    
`