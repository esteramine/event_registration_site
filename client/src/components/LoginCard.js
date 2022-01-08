import gql from "graphql-tag";
import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/auth';

function LoginCard() {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        userId: '',
        password: '',
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            context.login(result.data.login);
            navigate('/');
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }


    return (
        <div className="bg-white w-[550px] p-4 m-2 rounded-md flex flex-col space-y-2 text-gray-700 shadow-lg">
            <header className="font-bold text-3xl flex items-center justify-center py-2">Login</header>

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

            <div className="flex flex-col space-x-1">
                <div className="flex space-x-2 p-2">
                    <div className="font-bold font-sm">USER ID</div>
                </div>
                <input name="userId" type="text" className={errors.userId ? "register-input-error" : "register-input"} onChange={onChange} />
            </div>

            <div className="flex flex-col space-x-1">
                <div className="flex space-x-2 p-2">
                    <div className="font-bold font-sm">PASSWORD</div>
                </div>
                <input name="password" type="password" className={errors.password ? "register-input-error" : "register-input"} onChange={onChange} />
            </div>


            <div className="pt-2">
                <div className="register-button" onClick={onSubmit}>
                    LOGIN
                </div>

                <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
                    <div>Don't have an account?</div>
                    <div className="hover:text-gray-700 text-green-600 cursor-pointer">Register</div>
                </div>
            </div>

        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $userId: String!
        $password: String!
    ) {
        login(
            loginInput: {
                userId: $userId
                password: $password
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

export default LoginCard;
