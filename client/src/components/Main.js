import { useContext } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { BsFillCalendar2CheckFill, BsPlus } from "react-icons/bs";

import EventCard from "./EventCard";
import Searchbar from "./Searchbar";
import { AuthContext } from '../context/auth';
import { useNavigate } from "react-router-dom";
import { FETCH_EVENTS_QUERY } from "../utils/graphql";


function Main() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_EVENTS_QUERY);
    var events;
    if (data) {
        events = data.getEvents;
    }

    // TODO: filter out expired events
    // TODO: add loading progress bar 
    return (
        <div className={`flex-grow bg-gray-300 p-6 ${ user? 'pl-20': 'pl-6'}  h-full`}>
            <header className={`flex flex-wrap ${user ? "justify-end" : "justify-between"} mb-3 space-x-2 items-center cursor-pointer`}>
                {user ? (<></>) : (
                    <div className="flex space-x-4 justify-center items-center text-5xl">
                        <div className="text-green-600 pt-[5px] drop-shadow-lg">
                            <BsFillCalendar2CheckFill />
                        </div>
                        <div className="font-bold text-white drop-shadow-md">SAVE THE DATE</div>
                    </div>
                )}

                <div className="flex space-x-2 items-center">
                    <Searchbar />

                    {user ? (<></>) : (
                        <>
                            <div className="register-button px-2 hover:shadow-inner" onClick={() => navigate('/register', { replace: true })}>
                                REGISTER
                            </div>
                            <div className="register-button px-4 hover:shadow-inner" onClick={() => navigate('/login', { replace: true })}>
                                LOGIN
                            </div>
                        </>
                    )}

                </div>
            </header>

            <div className="flex justify-center">
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
                    <>
                        {user ? (
                            <></>
                        ) : (
                            <div className="register-button px-28 h-56 m-2 text-4xl font-bold hover:shadow-lg" onClick={() => navigate('/login', { replace: true })}>
                                <BsPlus />
                            </div>
                        )}
                    </>
                    {loading ? (<h1>Loading Events...</h1>) : (
                        events && events.map(event => <EventCard key={event.id} event={event} />)
                    )}
                </div>
            </div>

        </div>
    )
}

export default Main;
