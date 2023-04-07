const express = require('express');
const router = express.Router();
const calendarRepository = require('../repositories/calendar-event-repository');
const {body, validationResult} = require("express-validator");

router.post('/seeder-calendar', async (req, res) => {
    const event =
        {
            date_event : Date.now(),
            title_event : "Test event"

        };

    try {
        await calendarRepository.createCalendarEvent(event);
        res.status(200).send('Seeded calendar_event successfully!');
    } catch (err) {
        console.log(err);
        res.status(500).send('Failed to seed calendar_event.');
    }
});

router.post('/post-event/:id_user',
    // body('title_event').isAlphanumeric().isLength({ min: 2 }),
   // body('date_event').isDate().isLength({ min: 1 }),
   //  body('date_event').matches(/^(\d{4})-(\d{2})-(\d{2})$/).isDate().withMessage('Date must be in the format of YYYY-MM-DD'),

async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            } else
            {
                let id_user =  req.params.id_user
                let event = req.body
                console.log(event)
                event.id_user = id_user
                await calendarRepository.createCalendarEvent(req.body);
                return   res.status(200).end('Event created successfully');
            }
        } catch (e) {
            res.status(500).send(e)
        }
    });

    router.get('/getAllUserEvents/:id_user', async (req, res) => {
        try {
            const findUserTasks = await calendarRepository.getAllUserEvents(req.params.id_user);
            if(!findUserTasks) {
                res.status(500).send('Id not found')
                return
            }
            res.status(200).send(findUserTasks)
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    });

    router.get('/getUserEvent/:id_user/:id_event_calendar', async (req, res) => {
    const { id_user, id_event_calendar } = req.params;

    try {
        const userEventCalendar = await calendarRepository.getEventOfUser(id_user, id_event_calendar);

        if (!userEventCalendar) {
            return res.status(404).send('User_event or User_id not found');
        }

        return res.send(userEventCalendar);
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
});

router.put('/update-calendar-event/:id_event_calendar',
    async (req, res) => {
        const id_event_calendar  = req.params.id_event_calendar;
        try {
            let updateEvent = await calendarRepository.updateEvent(id_event_calendar, req.body);
            res.status(200).send(updateEvent);
        } catch (e) {
            console.log(e)
            res.status(500).send(e).end();
        }
    });

exports.initializeRoutes = () => router;

