const Booking = require('../models/Booking');

async function createBooking(req, res) {
  try {
    const {
      title,
      eventType,
      eventDate,
      preferredTime,
      location,
      travelPreference,
      venueName,
      mehndiStyle,
      coveragePreference,
      budgetFrom,
      budgetTo,
      groupSize,
      notes,
      contactName,
      contactEmail,
      contactPhone,
      inspirationLink,
    } = req.body;

    const bookingPayload = {
      title,
      eventType,
      eventDate,
      preferredTime,
      location,
      travelPreference,
      venueName,
      mehndiStyle,
      coveragePreference,
      budgetFrom,
      budgetTo,
      groupSize,
      notes,
      contactName,
      contactEmail,
      contactPhone,
      inspirationLink,
    };

    if (req.user?.id) {
      bookingPayload.client = req.user.id;
    }

    if (req.files?.inspirationImages) {
      bookingPayload.inspirationImages = req.files.inspirationImages.map((f) => `/uploads/${f.filename}`);
    }

    const booking = await Booking.create(bookingPayload);
    res.status(201).json({ booking });
  } catch (err) {
    const status = err?.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ message: err.message });
  }
}

async function getBookings(req, res) {
  try {
    const { location, minBudget, maxBudget, mehndiStyle } = req.query;
    const filter = { status: 'open' };
    if (location) filter.location = new RegExp(location, 'i');
    if (mehndiStyle) filter.mehndiStyle = new RegExp(mehndiStyle, 'i');
    if (minBudget || maxBudget) {
      const min = Number(minBudget);
      const max = Number(maxBudget);
      // Overlap any range with [budgetFrom, budgetTo]
      filter.$or = [
        { $and: [{ budgetFrom: { $lte: max } }, { budgetTo: { $gte: min } }] },
        { $and: [{ budgetFrom: { $exists: true } }, { budgetTo: { $exists: true } }] },
      ];
    }
    const bookings = await Booking.find(filter).sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createBooking, getBookings };


