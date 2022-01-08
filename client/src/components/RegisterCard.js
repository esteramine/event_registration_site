import gql from "graphql-tag";
import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/auth';

function RegisterCard() {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        userId: '',
        name: '',
        password: '',
        confirmedPassword: ''
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            context.login(result.data.register);
            navigate('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function registerUser() {
        addUser();
    }

    return (
        <>
            {
                false ? (<div> Loading...</div>) : (
                    <div className="bg-white w-[550px] p-4 m-2 rounded-md flex flex-col space-y-2 text-gray-700 shadow-lg">
                        <header className="font-bold text-3xl flex items-center justify-center py-2">Create an account</header>

                        {/* Errors Section */}
                        <>
                            {Object.keys(errors).length > 0 && (

                                <div className="py-2 px-8 bg-red-100 text-red-600 text-sm rounded-md">
                                    <ul>
                                        {Object.values(errors).map(value => (
                                            <li className="list-disc" key={value}>{value}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>

                        {/* Errors Section */}

                        <div className="flex flex-col space-x-1">
                            <div className="flex space-x-2 p-2">
                                <div className="font-bold font-sm">USER ID*</div>
                                <div>(must be unique)</div>
                            </div>
                            <input name="userId" type="text" className={errors.userId ? "register-input-error":"register-input"} onChange={onChange} />
                        </div>

                        <div className="flex flex-col space-x-1">
                            <div className="flex space-x-2 p-2">
                                <div className="font-bold font-sm">PREFERRED NAME*</div>
                            </div>
                            <input name="name" type="text" className={errors.name ? "register-input-error":"register-input"} onChange={onChange} />
                        </div>

                        <div className="flex flex-col space-x-1">
                            <div className="flex space-x-2 p-2">
                                <div className="font-bold font-sm">PASSWORD*</div>
                            </div>
                            <input name="password" type="password" className={errors.password ? "register-input-error":"register-input"} onChange={onChange} />
                        </div>

                        <div className="flex flex-col space-x-1">
                            <div className="flex space-x-2 p-2">
                                <div className="font-bold font-sm">CONFIRMED PASSWORD*</div>
                            </div>
                            <input name="confirmedPassword" type="password" className={errors.confirmedPassword ? "register-input-error":"register-input"} onChange={onChange} />
                        </div>

                        <div className="pt-2">
                            <div className="register-button" onClick={onSubmit}>
                                REGISTER
                            </div>


                            <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                                <div>Already have an account?</div>
                                <div className="hover:text-gray-700 text-green-600 cursor-pointer">Sign In</div>
                            </div>
                        </div>

                    </div>
                )
            }
        </>

    )
}

const REGISTER_USER = gql`
    mutation register(
        $userId: String!
        $name: String!
        $password: String!
        $confirmedPassword: String!
    ) {
        register(
            registerInput: {
                userId: $userId
                name: $name
                password: $password
                confirmedPassword: $confirmedPassword
            }
        ) {
            id
            userId
            name
            createdAt
            token
        }
    }
`

export default RegisterCard;
