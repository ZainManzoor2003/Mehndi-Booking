const Proposal = require('../models/Proposal');
const Booking = require('../models/Booking');
const { sendEmail } = require('../utils/email');

async function createProposal(req, res) {
  try {
    const { bookingId, price, hours, message } = req.body;
    const booking = await Booking.findById(bookingId).populate('client');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const existing = await Proposal.findOne({ booking: bookingId, artist: req.user.id });
    if (existing) return res.status(400).json({ message: 'You already proposed for this booking' });

    const proposal = await Proposal.create({
      booking: bookingId,
      artist: req.user.id,
      price,
      hours,
      message,
    });

    // Notify client if email exists
    const recipient = booking.contactEmail || booking.client?.email;
    if (recipient) {
      const subject = 'New proposal received';
      const text = `You received a new proposal for your booking: ${booking.title || booking._id}`;
      sendEmail({ to: recipient, subject, text }).catch(() => {});
    }

    // Update booking status
    if (booking.status === 'open') {
      booking.status = 'proposal_sent';
      await booking.save();
    }

    res.status(201).json({ proposal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function acceptProposal(req, res) {
  try {
    const { id } = req.params; // proposal id
    const proposal = await Proposal.findById(id).populate('booking');
    if (!proposal) return res.status(404).json({ message: 'Proposal not found' });

    const booking = await Booking.findById(proposal.booking._id).populate('client');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Only the client who created the booking can accept
    if (!booking.client || String(booking.client._id) !== req.user.id) {
      return res.status(403).json({ message: 'Only the booking owner can accept a proposal' });
    }

    proposal.status = 'accepted';
    await proposal.save();

    booking.status = 'accepted';
    booking.acceptedProposal = proposal._id;
    await booking.save();

    // Notify artist is omitted for brevity; requires artist email lookup
    res.json({ proposal, booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createProposal, acceptProposal };


