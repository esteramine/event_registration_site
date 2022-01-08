function LoginCard() {
    return (
        <div className="bg-white w-[550px] p-4 m-2 rounded-md flex flex-col space-y-2 text-gray-700">
            <header className="font-bold text-3xl flex items-center justify-center py-2">Login</header>

            <div className="flex flex-col space-x-1">
                <div className="flex space-x-2 p-2">
                    <div className="font-bold font-sm">USER ID</div>
                </div>
                <input className="register-input" />
            </div>

            <div className="flex flex-col space-x-1">
                <div className="flex space-x-2 p-2">
                    <div className="font-bold font-sm">PASSWORD</div>
                </div>
                <input className="register-input" />
            </div>


            <div className="pt-2">
                <div className="register-button">
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

export default LoginCard;
