import { BsPlus, BsFillCalendar2EventFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';

const SidebarIcon = ({ icon, text }) => (
    <div className="sidebar-icon group">
        {icon}

        <span className="sidebar-tip group-hover:scale-100">
            {text}
        </span>
    </div>
);

const Divider = () => <hr className="sidebar-hr" />;

function Sidebar() {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 flex flex-col bg-white shadow-lg">
            <SidebarIcon icon={ <AiFillHome size="24" />} text='Home'/>
            <Divider />
            <SidebarIcon icon={ <BsFillCalendar2EventFill size="20" />} text='Event Manager'/>
            <SidebarIcon icon={ <BsPlus size="28" />} text={'Add Event'}/>
            <Divider />
            <SidebarIcon icon={ <BiLogOut size="24" />} text='Log out'/>  
        </div>
    )
}

export default Sidebar;
