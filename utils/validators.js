module.exports.validateRegisterInput = (
    userId,
    name,
    password,
    confirmPassword
) => {
    const errors = {};
    if (userId.trim() === '') {
        errors.userId = 'User ID must not be empty.';
    }
    else if ((/\s/).test(userId)) {
        errors.userId = 'User ID must not contain spaces.';
    }

    if (name.trim() === '') {
        errors.name = 'Name must not be empty.';
    }

    if (password === '') {
        errors.password = 'Password must not be empty.';
    }
    else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};


module.exports.validateLoginInput = (userId, password) => {
    const errors = {};
    if (userId.trim() === '') {
        errors.userId = 'User ID must not be empty.';
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty.';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}

module.exports.validateEventInput = (title, eventTime) => {
    const errors = {};
    if (title.trim() === '') {
        errors.title = 'Title must not be empty.';
    }
    if (eventTime.trim() === '') {
        errors.eventTime = 'Please pick a time for the event.';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };

}