import { useContext, useEffect } from "react";

import { AuthContext } from '../context/auth';
import Sidebar from "../components/Sidebar";
import EventForm from "../components/EventForm";
import { useNavigate } from "react-router-dom";

function AddEvent() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    })

    return (


        <div className="flex">
            <Sidebar />

            <div className="bg-gray-300 h-screen flex-grow p-6">
                <EventForm />
            </div>
        </div>
    )
}

export default AddEvent;
