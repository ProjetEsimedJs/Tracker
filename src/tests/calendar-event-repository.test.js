const { Calendar_event } = require('../models/calendar_event.model');
const { getEventOfUser, createCalendarEvent  } = require('../repositories/calendar-event-repository');

    describe('test calendar-event-repository getEventOfUser', () => {
            it('should return the event with the given id_user and id_event_calendar', async () => {
                const id_user = 'test-user-id';
                const id_event_calendar = 1;
                const expectedEvent = {
                    id_event_calendar: 1,
                    id_user: 'test-user-id',
                    date_event: new Date('2023-04-01T00:00:00.000Z'),
                    title_event: 'Test event'
                };
                jest.spyOn(Calendar_event, 'findOne').mockResolvedValue(expectedEvent);
                const result = await getEventOfUser(id_user, id_event_calendar);
                expect(Calendar_event.findOne).toHaveBeenCalledWith({ where: { id_user, id_event_calendar }});
                expect(result).toEqual(expectedEvent);
    });

            it('should return null if no event is found', async () => {
                const id_user = 'test-user-id';
                const id_event_calendar = 1;
                jest.spyOn(Calendar_event, 'findOne').mockResolvedValue(null);
                const result = await getEventOfUser(id_user, id_event_calendar);
                expect(Calendar_event.findOne).toHaveBeenCalledWith({ where: { id_user, id_event_calendar }});
                expect(result).toBeNull();

            });


        describe('test calendar-event-repository  createCalendarEvent', () => {
            it('should create a calendar event', async () => {
                const eventData = {
                    id_user: 'user123',
                    date_event: new Date(),
                    title_event: 'Test Event',
                };

                Calendar_event.create = jest.fn(() => Promise.resolve({ id: 1, ...eventData }));
                const createdEvent = await createCalendarEvent(eventData);

                expect(Calendar_event.create).toHaveBeenCalledWith(eventData);
                expect(createdEvent).toEqual({ id: 1, ...eventData });
            });

            it('should throw an error if the event creation fails', async () => {
                const eventData = {
                    id_user: 'user123',
                    date_event: new Date(),
                    title_event: 'Test Event',
                };
                const error = new Error('Failed to create event');
                Calendar_event.create = jest.fn(() => Promise.reject(error));
                try {
                    await createCalendarEvent(eventData);
                    expect(true).toBe(false);
                } catch (err) {
                    expect(err.message).toBe(`Failed to create calendar event: ${error.message}`);
                }
            });
        });
    });
