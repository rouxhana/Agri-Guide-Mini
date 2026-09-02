const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Open CORS for local messaging
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/users', userRoutes);

// Soil Diagnostics Parser Route
app.post('/api/diagnostics/analyze', (req, res) => {
  const { text, fileName } = req.body;
  
  if (!text) {
    return res.status(400).json({ message: 'No text content provided for analysis' });
  }

  const lowerText = text.toLowerCase();
  
  // Extract pH Level (default to 6.5)
  let ph = 6.5;
  const phMatch = text.match(/ph\s*(?:level)?\s*:\s*([0-9\.]+)/i);
  if (phMatch && phMatch[1]) {
    ph = parseFloat(phMatch[1]);
  }

  // Helper function to check status (Low, Medium, High)
  const parseStatus = (regex, defaultVal = "Medium") => {
    const match = text.match(regex);
    if (match && match[1]) {
      const val = match[1].toLowerCase();
      if (val.includes('low') || val.includes('deficient')) return 'Low';
      if (val.includes('high') || val.includes('optimal')) return 'High';
      return 'Medium';
    }
    return defaultVal;
  };

  // Extract NPK Statuses
  const nitrogen = parseStatus(/nitrogen\s*(?:\(n\))?\s*:\s*(.*)/i, "Medium");
  const phosphorus = parseStatus(/phosphorus\s*(?:\(p\))?\s*:\s*(.*)/i, "Medium");
  const potassium = parseStatus(/potassium\s*(?:\(k\))?\s*:\s*(.*)/i, "Medium");
  const carbon = parseStatus(/carbon\s*:\s*(.*)/i, "Medium");

  // Determine pH Status and verdict
  let phStatus = "Optimal";
  let verdict = "Balanced Soil Profile";
  let advisories = [];

  if (ph < 6.0) {
    phStatus = "Acidic";
    verdict = "Acidic Soil with Nutrient Deficiencies";
    advisories = [
      {
        id: 1,
        category: "pH Correction",
        text: "Apply agricultural lime (calcium carbonate) at 2.0-3.0 t/ha to correct soil acidity and raise pH towards 6.5."
      },
      {
        id: 2,
        category: "NPK Supplements",
        text: `Nitrogen level is ${nitrogen} and Potassium level is ${potassium}. Apply balanced organic compost and NPK boosters.`
      },
      {
        id: 3,
        category: "Soil Conservation",
        text: "Incorporate organic green manure crops (e.g., Sunnhemp or Dhaincha) before main crop transplantation."
      }
    ];
  } else if (ph > 7.8) {
    phStatus = "Alkaline";
    verdict = "Alkaline / Saline Soil Profile";
    advisories = [
      {
        id: 1,
        category: "pH Correction",
        text: "Apply elemental sulfur at 1.0-1.5 t/ha or agricultural gypsum to mitigate alkaline pH and reduce salinity."
      },
      {
        id: 2,
        category: "Water Drainage",
        text: "Improve field drainage networks. Flush fields with high-quality water to leach out soluble salt deposits."
      },
      {
        id: 3,
        category: "Fertilizer Selection",
        text: "Avoid sodium-based fertilizers. Prefer Ammonium Sulfate and Sulfate of Potash (SOP) over standard chloride variants."
      }
    ];
  } else {
    phStatus = "Optimal";
    verdict = "Healthy, Fertile Soil Profile";
    advisories = [
      {
        id: 1,
        category: "pH Status",
        text: "Soil pH is optimal. No correction or lime/sulfur treatment required."
      },
      {
        id: 2,
        category: "Maintenance",
        text: "Maintain organic carbon levels by applying basal Farm Yard Manure (FYM) at 12.5 t/ha during soil preparation."
      },
      {
        id: 3,
        category: "Crop Rotation",
        text: "Rotate heavy nutrient feeders with nitrogen-fixing leguminous crops like Black Gram or Green Gram to maintain soil vitality."
      }
    ];
  }

  res.json({
    id: fileName || 'uploaded_soil_report.txt',
    name: fileName || 'uploaded_soil_report.txt',
    rawText: text,
    parsed: {
      ph,
      phStatus,
      nitrogen,
      phosphorus,
      potassium,
      carbon,
      salinity: ph > 7.8 ? "Saline" : "Safe",
      verdict,
      advisories
    }
  });
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
