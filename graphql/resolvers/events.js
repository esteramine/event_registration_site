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
        }
    }
}