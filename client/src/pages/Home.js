import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

function Home() {
    return (
        <div className="flex">
            <Sidebar />
            <Main />
        </div>
    )
}

export default Home;
