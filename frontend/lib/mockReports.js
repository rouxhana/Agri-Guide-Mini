export const mockReports = [
  {
    id: "optimal_soil_report.txt",
    name: "optimal_soil_report_soil_report.txt",
    label: "Optimal Soil Test",
    desc: "A balanced, fertile soil test with healthy pH and chemical content.",
    rawText: `================================================
AGRIHELP SOIL TESTING LABS - REGIONAL STATION #302A
================================================
Sample ID: O-98241
Date Issued: Jul 12, 2026
Farmer: Ramesh K.
Soil Type: Clayey Loam

TEST RESULTS:
------------------------------------------------
pH Level:          6.8         (Optimal)
Organic Carbon:    0.85%       (Optimal)
Nitrogen (N):      310 kg/ha   (High)
Phosphorus (P):    24 kg/ha    (Medium)
Potassium (K):     210 kg/ha   (High)
Salinity (EC):     0.4 dS/m    (Low - Safe)

VERDICT:
Soil is highly fertile and balanced. Ready for high-yield cultivation.
No major corrective amendments required.
================================================`,
    parsed: {
      ph: 6.8,
      phStatus: "Optimal",
      nitrogen: "High",
      phosphorus: "Medium",
      potassium: "High",
      carbon: "High",
      salinity: "Safe",
      verdict: "Optimal Soil Profile",
      advisories: [
        {
          id: 1,
          category: "Amendment",
          text: "Soil chemistry is optimal. No correction (lime or sulfur) needed."
        },
        {
          id: 2,
          category: "Fertilizer",
          text: "Maintain organic matter levels by adding a standard basal dose of Farm Yard Manure (FYM) at 12.5 t/ha before sowing."
        },
        {
          id: 3,
          category: "Crop Rotation",
          text: "Excellent soil for high-nutrient demand crops like Paddy or Sugarcane. Intercrop with Black Gram to maintain nitrogen levels."
        }
      ]
    }
  },
  {
    id: "acidic_low_npk.txt",
    name: "acidic_low_npk_soil_report.txt",
    label: "Acidic & Low NPK Soil Test",
    desc: "Typical of exhausted red soil. Low pH, low Nitrogen, low Phosphorus.",
    rawText: `================================================
AGRIHELP SOIL TESTING LABS - REGIONAL STATION #302A
================================================
Sample ID: A-21945
Date Issued: Jul 14, 2026
Farmer: Karthik S.
Soil Type: Red Sandy Soil

TEST RESULTS:
------------------------------------------------
pH Level:          5.2         (Acidic)
Organic Carbon:    0.35%       (Deficient)
Nitrogen (N):      120 kg/ha   (Low)
Phosphorus (P):    8.5 kg/ha   (Low)
Potassium (K):     90 kg/ha    (Low)
Salinity (EC):     0.2 dS/m    (Low - Safe)

VERDICT:
Highly acidic soil with severe Nitrogen, Phosphorus, and Potassium deficiency.
Liming and high-dosage organic supplements are urgently required.
================================================`,
    parsed: {
      ph: 5.2,
      phStatus: "Acidic",
      nitrogen: "Low",
      phosphorus: "Low",
      potassium: "Low",
      carbon: "Deficient",
      salinity: "Safe",
      verdict: "Acidic Soil with NPK Deficiencies",
      advisories: [
        {
          id: 1,
          category: "Liming Amendment",
          text: "Apply Agricultural Lime (Calcium Carbonate) at 2.5 t/ha at least 2 weeks before planting to neutralize the acidic pH (target 6.5)."
        },
        {
          id: 2,
          category: "Nitrogen & Organic Carbon Boost",
          text: "Apply 25 t/ha of decomposed Farm Yard Manure (FYM). Add Azotobacter or Rhizobium bio-fertilizers to improve nutrient uptake."
        },
        {
          id: 3,
          category: "Chemical Fertilization",
          text: "Apply basal NPK (Urea, Single Super Phosphate, and Muriate of Potash) at 120% of standard crop recommendation."
        },
        {
          id: 4,
          category: "Legume Intercropping",
          text: "Intercrop with Groundnut or Cowpea (Karamani) to fix atmospheric nitrogen and cover soil to prevent erosion."
        }
      ]
    }
  },
  {
    id: "alkaline_saline.txt",
    name: "alkaline_saline_soil_report.txt",
    label: "Alkaline & Saline Soil Test",
    desc: "High pH and salinity. Restricts nutrient intake.",
    rawText: `================================================
AGRIHELP SOIL TESTING LABS - REGIONAL STATION #302A
================================================
Sample ID: S-77341
Date Issued: Jul 15, 2026
Farmer: Ramesh K.
Soil Type: Clayey Saline Soil

TEST RESULTS:
------------------------------------------------
pH Level:          8.5         (Alkaline)
Organic Carbon:    0.48%       (Medium)
Nitrogen (N):      240 kg/ha   (Medium)
Phosphorus (P):    31 kg/ha    (High)
Potassium (K):     110 kg/ha   (Low)
Salinity (EC):     2.8 dS/m    (High - Saline)

VERDICT:
Alkaline soil with high salinity/EC level. Potassium intake is blocked.
Gypsum application and flush irrigation recommended.
================================================`,
    parsed: {
      ph: 8.5,
      phStatus: "Alkaline",
      nitrogen: "Medium",
      phosphorus: "High",
      potassium: "Low",
      carbon: "Medium",
      salinity: "Saline",
      verdict: "Alkaline Soil with High Salinity",
      advisories: [
        {
          id: 1,
          category: "Soil Reclamation",
          text: "Apply agricultural Gypsum (Calcium Sulfate) at 3.0 t/ha to displace sodium ions. Follow with deep tillage and heavy flushing with sweet water."
        },
        {
          id: 2,
          category: "Salinity Management",
          text: "Adopt raised bed cultivation method. Mulch heavily with paddy straw to prevent capillary rise of salts to the surface."
        },
        {
          id: 3,
          category: "Crop Selection Adjustment",
          text: "Avoid sensitive crops like Onion. Plant salt-tolerant crops like Dhaincha (Sesbania) as green manure, or tolerant crops like Cotton."
        },
        {
          id: 4,
          category: "Potassium Amendment",
          text: "Avoid Chloride-based potassium fertilizers. Apply Sulfate of Potash (SOP) instead of Muriate of Potash to reduce salt loading."
        }
      ]
    }
  }
];
