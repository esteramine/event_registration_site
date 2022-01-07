const Event = require('../../models/Event');

module.exports = {
    Query: {
        async getEvents() {
            try {
                const events = await Event.find();
                return events;
            } catch (error) {
                throw new Error(err);
            }
        },
        async getEvent(_, { eventCode }) {
            try {
                const event = await Event.findOne({ eventCode });
                if (event) {
                    return event;
                }
                else {
                    throw new Error('Event not found.');
                }
            } catch (error) {
                throw new Error(err);
            }
        }

    },
    Mutation: {

    }
}