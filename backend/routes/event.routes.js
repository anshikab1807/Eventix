import express from 'express';
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent, getEventsbyOrganizer } from '../controllers/event.controllers.js';
import protect from '../middlewares/auth.middlewares.js';
import organizer from '../middlewares/organizer.middlewares.js';
import upload from '../config/multer.js';

const router = express.Router();

// @route POST /events/create
// @desc Create a new event
// @access private
router.post('/', protect, organizer, upload.single('image'), createEvent);

// @route GET /events/all
// @desc Get all events
// @access public
router.get('/all', getEvents);

// @route GET /events/organizer
// @desc Get all events by organizer
// @access private
router.get('/organizer', protect, organizer, getEventsbyOrganizer);

// @route GET /events/:id
// @desc Get event by ID
// @access public
router.get('/:id', getEventById);

// @route PUT /events/:id
// @desc Update event by ID
// @access private
router.put('/:id', protect, organizer, updateEvent);

// @route DELETE /events/:id
// @desc Delete event by ID
// @access private
router.delete('/:id', protect, organizer, deleteEvent);

export default router;