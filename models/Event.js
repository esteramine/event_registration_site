const { model, Schema } = require('mongoose');

const eventSchema = new Schema({
    title: String,
    description: String,
    eventCode: String,
    authCode: String,
    participants: [
        {
            participant: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            createdAt: String
        }
    ],
    createdAt: String,
    organizer: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    restrictions: [String]
});

module.exports = model('Event', eventSchema);