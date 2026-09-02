const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['beginner', 'experienced'], default: 'beginner' },
  location: { type: String },
  soilType: { type: String },
  landSize: { type: Number }, // in acres
  savedCrops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Crop' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
