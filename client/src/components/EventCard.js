import { MdPublic, MdHistory, MdOutlinePeople } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import moment from 'moment';

function EventCard({ event: { title, description, eventCode, eventTime, organizer, createdAt, participantCount, restrictions } }) {
    return (
        <div className="bg-white rounded-md p-4 m-2 max-w-xs h-56 flex flex-col space-y-1 text-gray-700 shadow-md hover:shadow-2xl transition-all duration-150 ease-linear cursor-pointer">
            {/* Access Scope */}
            <div className='w-[100px]'>
                <div className="flex bg-green-200 items-center p-[2px] space-x-1 rounded-sm text-green-700 text-xs">
                    <div>
                        <MdPublic className='ml-1' />
                    </div>
                    <div>Public</div>
                </div>
            </div>


            {/* Event Name & Event Code */}
            <div className='flex space-x-4 items-end'>
                <div className='text-xl font-bold'>{title.length >= 25? title.substring(0, 24)+"...":title}</div>
                <div className='text-sm text-gray-500 mb-[3px]'>{eventCode}</div>
            </div>

            {/* Event Time */}
            <div>
                <div className='text-sm text-gray-500'>{eventTime}</div>

            </div>

            {/* Description */}
            <div>
                <div>{description}</div>

            </div>

            {/* Organizer */}
            <div className='flex space-x-1 items-center text-gray-500'>
                <div className='mt-[2px]'>
                    <CgProfile />
                </div>
                <div className='text-sm'>{organizer.name} ({organizer.userId})</div>
            </div>

            {/* Created At & Participants */}
            <div className='flex space-x-1 items-center text-sm justify-between pt-6'>
                <div className='flex space-x-1 items-center'>
                    <MdHistory className='text-xl mt-[2.5px]' />
                    <div>{moment(createdAt).fromNow()}</div>
                </div>
                <div className='flex space-x-1 items-center'>
                    <MdOutlinePeople className='text-xl mt-[1.5px]' />
                    <div>{participantCount}</div>
                </div>
            </div>


        </div>
    )
}

export default EventCard;
