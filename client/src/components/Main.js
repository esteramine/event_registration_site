import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import EventCard from "./EventCard";
import Searchbar from "./Searchbar";

function Main() {
    const { loading, data: { getEvents: events } } = useQuery(FETCH_EVENTS_QUERY);
    
    // TODO: filter out expired events
    // TODO: add loading progress bar 
    return (
        <div className="flex-grow bg-gray-300 p-6">
            <header className="flex justify-end mb-3">
                <Searchbar />
                {/* Searchbar */}
            </header>
            <div className='flex flex-wrap justify-center'>
                {loading? (<h1>Loading Events...</h1>):(
                    events && events.map(event => <EventCard key={event.id} event={event}/>)
                )}
            </div>

        </div>
    )
}

const FETCH_EVENTS_QUERY = gql` 
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

export default Main;
