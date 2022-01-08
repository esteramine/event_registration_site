function RegisterCard() {
    return (
        <div className="bg-white w-[550px] p-4 m-2 rounded-md flex flex-col space-y-2 text-gray-700">
            <header className="font-bold text-3xl flex items-center justify-center py-2">Create an account</header>

            <div className="flex flex-col space-x-1">
                <div className="flex space-x-2 p-2">
                    <div className="font-bold font-sm">USER ID*</div>
                    <div>(must be unique)</div>
                </div>
                <input className="register-input" />
            </div>

            <div className="flex flex-col space-x-1">
                <div className="flex space-x-2 p-2">
                    <div className="font-bold font-sm">PREFERRED NAME*</div>
                </div>
                <input className="register-input" />
            </div>

            <div className="flex flex-col space-x-1">
                <div className="flex space-x-2 p-2">
                    <div className="font-bold font-sm">PASSWORD*</div>
                </div>
                <input className="register-input" />
            </div>

            <div className="flex flex-col space-x-1">
                <div className="flex space-x-2 p-2">
                    <div className="font-bold font-sm">CONFIRMED PASSWORD*</div>
                </div>
                <input className="register-input" />
            </div>

            <div className="pt-2">
                <div className="register-button">
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

export default RegisterCard;
