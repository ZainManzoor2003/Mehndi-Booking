const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SocialLinksSchema = new mongoose.Schema(
  {
    instagram: String,
    facebook: String,
    tiktok: String,
    youtube: String,
    website: String,
  },
  { _id: false }
);

const PriceRangeSchema = new mongoose.Schema(
  {
    from: { type: Number, min: 0 },
    to: { type: Number, min: 0 },
  },
  { _id: false }
);

const PricingSchema = new mongoose.Schema(
  {
    bridal: PriceRangeSchema,
    party: PriceRangeSchema,
    festival: PriceRangeSchema,
    casual: PriceRangeSchema,
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['client', 'artist'], required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true },
    location: { type: String, required: true },

    // Artist-specific
    services: [{ type: String, enum: ['bridal', 'party', 'festival', 'casual'] }],
    pricing: PricingSchema,
    photos: {
      type: [String],
      validate: {
        validator: function hasValidPhotoCount(arr) {
          // Only enforce for artists
          if (this.role !== 'artist') return true;
          if (!Array.isArray(arr)) return false;
          return arr.length >= 3 && arr.length <= 10;
        },
        message: 'Artists must upload between 3 and 10 photos',
      },
    },
    video: { type: String },
    socialLinks: SocialLinksSchema,
    availableForTravel: { type: Boolean, default: false },
    agreedToTerms: { type: Boolean, required: true },
  },
  { timestamps: true }
);

// Enforce at least one service for artists and pricing for selected services
UserSchema.pre('validate', function validateArtistFields(next) {
  if (this.role === 'artist') {
    // At least one service
    if (!this.services || this.services.length === 0) {
      return next(new Error('Artists must select at least one service'));
    }
    // Photos count validation handled via schema validate
    // Pricing ranges must be provided for selected services and be valid
    const requiredKeys = new Set(this.services);
    for (const key of requiredKeys) {
      const range = this.pricing?.[key];
      if (!range || typeof range.from !== 'number' || typeof range.to !== 'number') {
        return next(new Error(`Pricing for ${key} must include numeric 'from' and 'to'`));
      }
      if (range.from < 0 || range.to < 0 || range.from > range.to) {
        return next(new Error(`Pricing for ${key} must have 0 <= from <= to`));
      }
    }
  }
  next();
});

UserSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

UserSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', UserSchema);


