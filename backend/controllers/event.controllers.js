import Event from '../models/event.models.js';
import { upload, deleteFile } from './upload.controllers.js';

const createEvent = async (req, res) => {
  try {
    const {
      title,
      date,
      time,
      location,
      price,
      category,
      description,
      speakers,
      agenda,
      totalTickets,
    } = req.body;

    if (!title || !date || !time || !location || !price) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, date, time, location, price, organizer.",
      });
    }

    const eventDate = new Date(date);

    if (eventDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Date cannot be in the past.",
      });
    }

    const image = req.file
      ? await upload(req.file.path)
      : {"url": "https://media.gettyimages.com/id/1284654715/photo/black-brick-wall-background-of-empty-brick-basement-wall.jpg?s=612x612&w=0&k=20&c=6Xjrrm7K9QTHpgaQCVkG-jd_BQ0cfKok44FOXsbmIZs=", "fileId": null};

    const parsedSpeakers =
      typeof speakers === "string" ? JSON.parse(speakers) : speakers ?? [];
    const parsedAgenda =
      typeof agenda === "string" ? JSON.parse(agenda) : agenda ?? [];

    const organizer = req.user.id;

    const event = await Event.create({
      title,
      date: eventDate,
      time,
      location,
      price,
      organizer,
      image,
      category,
      description,
      speakers: parsedSpeakers,
      agenda: parsedAgenda,
      totalTickets: totalTickets ? Number(totalTickets) : 0,
      ticketsSold : 0,
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully.",
      data: event,
    });
  } catch (error) {
    console.error("createEvent error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find({id: null}).select('-agenda -speakers -createdAt -updatedAt');
        res.status(200).json({
            success: true,
            message: 'Events fetched successfully',
            events: events
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Event fetched successfully',
            event: event
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getEventsByOrganizer = async (req, res) => {
  try {
    const events = await Event.find({organizer: req.user._id});

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      events: events
  });    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            event: event
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const deleteEvent = async (req, res) => {  
  try {
        
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.image.fileId) {
            await deleteFile(event.image.fileId);
        }

        await event.deleteOne();
        res.status(200).json({
            success: true,
            message: 'Event deleted successfully',
            event: event
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export { createEvent, getEvents, getEventById, updateEvent, deleteEvent };