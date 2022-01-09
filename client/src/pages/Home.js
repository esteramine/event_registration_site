import { useContext } from "react";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { AuthContext } from '../context/auth';

function Home() {
    const { user } = useContext(AuthContext);

    return (
        <div className="h-full">
            {
                user ? (
                    <div className="flex">
                        <Sidebar />
                        <Main />
                    </div>
                ): (<Main />) 
            }
        </div>

    )
}

export default Home;
