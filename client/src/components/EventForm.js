import gql from "graphql-tag";
import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import { useForm } from '../utils/hooks';
import { FETCH_EVENTS_QUERY } from '../utils/graphql';

function EventForm() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [restrictions, setRestrictions] = useState([]);
    const [requiredAuthCode, setRequiredAuthCode] = useState(false);
    const [timeValue, setTimeValue] = useState(new Date());

    const { onChange, onSubmit, values } = useForm(createEvent, {
        title: '',
        description: '',
        authCode: '',
    });

    const [addEvent, { loading }] = useMutation(CREATE_EVENT, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_EVENTS_QUERY
            });
            const newData = [result.data.createEvent, ...data.getEvents];
            proxy.writeQuery({ query: FETCH_EVENTS_QUERY, data: { getEvents: newData } });
            navigate('/');
        },
        onError(err) {
            console.log(err);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: { ...values, eventTime: timeValue }
    });

    function createEvent() {
        addEvent();
    }
    return (
        <div className="h-full flex flex-col justify-between bg-white rounded-md text-gray-700 shadow-lg p-4">
            <div>
                <div className="flex flex-col space-x-1">
                    <div className="flex space-x-2 p-2">
                        <div className="font-bold font-sm">TITLE*</div>
                    </div>
                    <input name="title" type="text" className={errors.title ? "register-input-error" : "register-input"} onChange={onChange} />
                </div>

                <div className="flex flex-col space-x-1">
                    <div className="flex space-x-2 p-2">
                        <div className="font-bold font-sm">DESCRIPTION</div>
                        <div>(Optional)</div>
                    </div>
                    <input name="description" type="text" className="register-input" onChange={onChange} />
                </div>

                <div className="flex flex-col space-x-1 mt-1">
                    <div className="flex space-x-2 p-2">
                        <div className="font-bold font-sm">EVENT TIME*</div>
                    </div>
                    {/* <input name="eventTime" type="text" className={errors.eventTime ? "register-input-error" : "register-input"} onChange={onChange} /> */}
                </div>

                <div className="my-3">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            value={timeValue}
                            minDateTime={new Date()}
                            onChange={(newValue) => {
                                setTimeValue(newValue.toUTCString());
                            }}
                        />
                    </LocalizationProvider>
                </div>

                <div className="flex flex-col space-x-1">
                    <div className="flex space-x-2 p-2">
                        <div className="font-bold font-sm">PARTICIPANT RESTRICTION</div>
                    </div>

                    <div class="form-check">
                        <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="memberOnly" />
                        <label className="form-check-label inline-block font-xs" for="memberOnly">
                            Account / Auth Code Required (Only users who hold an account or auth code can register this event)
                        </label>
                    </div>
                    <div class="form-check">
                        <input className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="authCodeRequired" />
                        <label className="form-check-label inline-block font-xs" for="authCodeRequired">
                            Account Required (Only users who hold an account can register this event)
                        </label>
                    </div>
                </div>
                <>
                    {Object.keys(errors).length > 0 && (

                        <div className="mt-4 py-2 px-8 bg-red-100 text-red-600 text-sm rounded-md">
                            <ul>
                                {Object.values(errors).map(value => (
                                    <li className="list-disc" key={value}>{value}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            </div>


            <div className="pt-2">
                <div className="register-button" onClick={onSubmit}>
                    CREATE
                </div>
            </div>

        </div>
    )
}

const CREATE_EVENT = gql`
    mutation createEvent(
        $title: String!
        $description: String!
        $authCode: String!
        $eventTime: String!
    ) {
        createEvent(
            eventInput: {
                title: $title
                description: $description
                authCode: $authCode
                eventTime: $eventTime
            }
        ) {
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

export default EventForm;
