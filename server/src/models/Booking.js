const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    // Who created this booking
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contactName: { type: String, required: true, trim: true },
    contactEmail: { type: String, trim: true, lowercase: true },
    contactPhone: { type: String, trim: true },

    // Headline
    title: { type: String, required: true, trim: true },

    // Event details
    eventType: { type: String, enum: ['wedding', 'eid', 'party', 'festival', 'other'], required: true },
    eventTypeOther: { type: String },
    eventDate: { type: Date, required: true },
    preferredTime: { type: String, enum: ['morning', 'afternoon', 'evening', 'flexible'], required: true },
    location: { type: String, required: true },
    travelPreference: {
      type: String,
      enum: ['artist_travels', 'client_travels', 'both'],
      required: true,
    },
    venueName: { type: String }, // optional

    // Style preferences
    mehndiStyle: {
      type: String,
      enum: ['bridal', 'party', 'festival', 'casual'],
      required: true,
    },
    coveragePreference: {
      type: String,
      enum: ['full', 'hands_only', 'simple', 'unsure'],
    }, // optional
    inspirationImages: [{ type: String }],
    inspirationLink: { type: String },

    // Budget & group size
    budgetFrom: { type: Number, required: true, min: 0 },
    budgetTo: { type: Number, required: true, min: 0 },
    groupSize: { type: Number, min: 1, required: true },

    notes: { type: String, required: true },

    status: {
      type: String,
      enum: ['open', 'proposal_sent', 'accepted', 'completed'],
      default: 'open',
      index: true,
    },
    acceptedProposal: { type: mongoose.Schema.Types.ObjectId, ref: 'Proposal' },
  },
  { timestamps: true }
);

// Custom validations
BookingSchema.pre('validate', function validateBooking(next) {
  if (this.eventType === 'other' && !this.eventTypeOther) {
    return next(new Error('Please specify the event type'));
  }
  if (typeof this.budgetFrom === 'number' && typeof this.budgetTo === 'number') {
    if (this.budgetFrom < 0 || this.budgetTo < 0 || this.budgetFrom > this.budgetTo) {
      return next(new Error('Budget must have 0 <= From <= To'));
    }
  }
  // At least one design inspiration (link or image)
  const hasImages = Array.isArray(this.inspirationImages) && this.inspirationImages.length > 0;
  const hasLink = Boolean(this.inspirationLink);
  if (!hasImages && !hasLink) {
    return next(new Error('Please provide design inspiration (images or link)'));
  }
  next();
});

module.exports = mongoose.model('Booking', BookingSchema);


