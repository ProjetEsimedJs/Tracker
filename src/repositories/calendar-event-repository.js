const { Calendar_event } = require('../models/calendar_event.model');

exports.getAllUserEvents =  async (id_user) => {
    let foundedUserById = await Calendar_event.findAll({ where: { id_user }});

    let array = []

    foundedUserById.forEach(event => {
        array.push({Date : event.date_event, Title:event.title_event, Link:event.id_event_calendar})
    })

    return array;
};

exports.getEventOfUser =  async (id_user, id_event_calendar) => {
    let foundedEvent = await Calendar_event.findOne({ where: { id_user, id_event_calendar }});
    return foundedEvent;
};


exports.deleteEvent = async (id_event_calendar) => {
    let deletedEvent = await Calendar_event.findOne({ where: { id_event_calendar }});

    if (deletedEvent) {
        await Calendar_event.destroy({ where: { id_event_calendar }});
    }

    return deletedEvent;
};


exports.createCalendarEvent =  async (eventData) => {
    try {
        const createdEvent = await Calendar_event.create(eventData);
        return createdEvent;
    } catch (err) {
        throw new Error(`Failed to create calendar event: ${err.message}`);
    }
};

exports.updateEvent =  async (id_event_calendar, data)  => {

    let foundedEvent = await Calendar_event.findOne({ where: { id_event_calendar }});

    if (!foundedEvent) {
        throw new Error('Event not found');
    }

        await Calendar_event.update({
            date_event: data.date_event || foundedEvent.date_event,
            title_event: data.title_event || foundedEvent.title_event,

    }, { where: { id_event_calendar } });
};

