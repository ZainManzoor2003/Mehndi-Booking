const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true, index: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    price: { type: Number, required: true },
    hours: { type: Number },
    message: { type: String },
    status: { type: String, enum: ['sent', 'accepted', 'rejected'], default: 'sent' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Proposal', ProposalSchema);


