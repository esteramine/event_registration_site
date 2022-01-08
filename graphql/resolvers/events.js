const { AuthenticationError } = require('apollo-server');
const { default: ShortUniqueId } = require('short-unique-id');
const Event = require('../../models/Event');
const User = require('../../models/User');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
    Query: {
        async getEvents() {
            try {
                const events = await Event.find().sort({ createdAt: -1 });
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
        async createEvent(_, { eventInput: { title, description, authCode, eventTime, restrictions } }, context) {
            const user = checkAuth(context);
            //if the server could reach here, it means the user is authenticated, and can create post
            const uid = new ShortUniqueId({ length: 6 });
            if (title.trim() === '') {
                throw new Error('Event title must not be empty');
            }
            const newEvent = new Event({
                title,
                description,
                eventCode: uid(),
                authCode,
                eventTime,
                participants: [],
                createdAt: new Date().toISOString(),
                organizer: user.id,
                restrictions
            });
            const event = await newEvent.save();

            //subscription
            context.pubsub.publish('NEW_EVENT',{
                newEvent: event
            });

            return event;
        },
        async deleteEvent(_, { eventId }, context) {
            const user = checkAuth(context);

            //only the user himself/herself can delete his/her post
            try {
                const event = await Event.findById(eventId).populate('organizer');
                if (event) {
                    if (event.organizer.userId == user.userId) {
                        await event.delete();
                        return 'Event deleted successfully';
                    }
                    else {
                        throw new AuthenticationError('Action not allowed');
                    }
                }
                else {
                    throw new Error('Event not found');
                }

            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Subscription: {
        newEvent: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_EVENT')
        }
    }
}