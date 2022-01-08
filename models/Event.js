const { model, Schema } = require('mongoose');

const eventSchema = new Schema({
    title: String,
    description: String,
    eventCode: String,
    authCode: String,
    eventTime: String,
    participants: [
        {
            userId: String,
            name: String,
            createdAt: String
        }
    ],
    createdAt: String,
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    restrictions: [String]
});

module.exports = model('Event', eventSchema);