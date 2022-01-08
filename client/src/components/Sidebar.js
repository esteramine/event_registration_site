import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPlus, BsFillCalendar2EventFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';

import { AuthContext } from '../context/auth';

const SidebarIcon = ({ icon, text, onClick }) => (
    <div className="sidebar-icon group" onClick={onClick}>
        {icon}

        <span className="sidebar-tip group-hover:scale-100">
            {text}
        </span>
    </div>
);

const Divider = () => <hr className="sidebar-hr" />;

function Sidebar() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    return (
        <div className=" h-screen p-2 flex flex-col bg-white shadow-2xl z-10"> 
            {/* fixed top-0 left-0 */}
            <SidebarIcon icon={ <AiFillHome size="24" />} text='Home' onClick={navigate('/')}/>
            <Divider />
            <SidebarIcon icon={ <BsFillCalendar2EventFill size="20" />} text='Event Manager'/>
            <SidebarIcon icon={ <BsPlus size="28" />} text={'Add Event'}/>
            <Divider />
            <SidebarIcon icon={ <BiLogOut size="24" />} text='Log out' onClick={logout}/>  
        </div>
    )
}

export default Sidebar;
