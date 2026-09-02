const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Cash Crop', 'Vegetable', 'Tree', 'Grain'], required: true },
  description: { type: String },
  idealSoil: [{ type: String }],
  waterRequirement: { type: String },
  sunlight: { type: String },
  durationDays: { type: Number },
  plantingDepth: { type: String },
  imageUrl: { type: String },
  steps: [{
    title: { type: String },
    description: { type: String }
  }],
  fertilizerSchedule: [{
    stage: { type: String },
    recommendation: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);
