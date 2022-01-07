const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        userId: user.userId,
        name: user.name
    }, SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
    Mutation: {
        async register(_, { registerInput: { userId, name, password, confirmedPassword } }) {
            // Validate user data
            const { valid, errors } = validateRegisterInput(userId, name, password, confirmedPassword);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            // Make sure user does not exist
            const user = await User.findOne({ userId });
            if (user) {
                throw new UserInputError('User ID is taken', {
                    errors: {
                        userId: 'This ID is taken.'
                    }
                });
            }
            //hash password and create an auth token
            password = await bcrypt.hash(password, 13);

            const newUser = new User({
                userId,
                name,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        },
        async login(_, { loginInput: {userId, password} }) {
            const { valid, errors } = validateLoginInput(userId, password);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ userId });

            if (!user) {
                errors.general = 'User not found.';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong credentials.';
                throw new UserInputError('Wrong credentials', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };
        }
    }
};