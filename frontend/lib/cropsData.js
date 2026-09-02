export const cropsData = [
  // Grains & Cereals
  {
    id: "paddy",
    name: "Paddy (Rice - Kuruvai & Samba)",
    category: "Grain",
    shortDescription: "The primary staple food crop of Tamil Nadu, heavily cultivated in the Cauvery delta.",
    idealSoil: ["Clayey", "Loamy", "Alluvial"],
    waterRequirement: "High",
    sunlight: "Full Sun",
    durationDays: 120,
    plantingDepth: "Surface (Transplanted)",
    imageUrl: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=800",
    tags: ["High Water", "Staple", "Delta Region"],
    steps: [
      { title: "Nursery Preparation", description: "Prepare a raised seedbed. Sow pre-germinated seeds and maintain a thin film of water." },
      { title: "Land Preparation", description: "Puddle the main field thoroughly to reduce water percolation and destroy weeds." },
      { title: "Transplanting", description: "Transplant 20-25 day old seedlings at a spacing of 20x15 cm." },
      { title: "Water Management", description: "Maintain 2-5 cm of standing water during the vegetative phase." }
    ],
    fertilizerSchedule: [
      { stage: "Basal", recommendation: "NPK 50:25:25 kg/ha" },
      { stage: "Tillering", recommendation: "Top dressing of Nitrogen" }
    ]
  },
  {
    id: "sorghum",
    name: "Sorghum (Cholam)",
    category: "Grain",
    shortDescription: "A major millet crop grown in dryland tracts of Coimbatore, Erode, and Salem.",
    idealSoil: ["Black Soil", "Red Soil"],
    waterRequirement: "Low",
    sunlight: "Full Sun",
    durationDays: 100,
    plantingDepth: "3-4 cm",
    imageUrl: "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=800",
    tags: ["Drought Resistant", "Millet", "Dryland"],
    steps: [
      { title: "Ploughing", description: "Plough the field twice with an iron plough and bring it to fine tilth." },
      { title: "Sowing", description: "Sow seeds using a seed drill or by broadcasting just before monsoon." },
      { title: "Thinning", description: "Thin out seedlings 15 days after sowing leaving one seedling per hill." }
    ],
    fertilizerSchedule: [
      { stage: "Basal", recommendation: "FYM 12.5 t/ha + NPK 40:20:0 kg/ha" }
    ]
  },
  // Cash Crops
  {
    id: "sugarcane",
    name: "Sugarcane (Karumbu)",
    category: "Cash Crop",
    shortDescription: "A major commercial crop grown with assured irrigation, lasting nearly a year.",
    idealSoil: ["Clayey Loam", "Deep Rich Soil"],
    waterRequirement: "Very High",
    sunlight: "Full Sun",
    durationDays: 365,
    plantingDepth: "15-20 cm trenches",
    imageUrl: "https://images.unsplash.com/photo-1629853921319-38b4df568393?auto=format&fit=crop&q=80&w=800",
    tags: ["Commercial", "Long Duration"],
    steps: [
      { title: "Set Selection", description: "Select healthy 2-budded or 3-budded setts from a 6-8 month old nursery." },
      { title: "Planting", description: "Plant setts end-to-end in ridges and furrows spaced 80 cm apart." },
      { title: "Earthing Up", description: "Perform partial earthing up at 45 days and full earthing up at 120 days." },
      { title: "Propping", description: "Tie the canes together (trash twist) to prevent lodging from heavy winds." }
    ],
    fertilizerSchedule: [
      { stage: "Basal", recommendation: "NPK 275:62.5:112.5 kg/ha applied in splits" }
    ]
  },
  {
    id: "groundnut",
    name: "Groundnut (Kadalai)",
    category: "Cash Crop",
    shortDescription: "A highly profitable cash crop suitable for dry and red soil regions.",
    idealSoil: ["Red Soil", "Sandy Loam"],
    waterRequirement: "Moderate",
    sunlight: "Full Sun",
    durationDays: 105,
    plantingDepth: "5 cm",
    imageUrl: "https://images.unsplash.com/photo-1596431969287-2485fc3eb7a7?auto=format&fit=crop&q=80&w=800",
    tags: ["Red Soil", "Summer", "Profitable"],
    steps: [
      { title: "Soil Preparation", description: "Plough the land 2-3 times to a depth of 15-20 cm." },
      { title: "Sowing", description: "Sow seeds at a depth of 5 cm. Maintain a spacing of 30x10 cm." },
      { title: "Weed Management", description: "Keep field weed-free for first 45 days. Do not disturb soil after pegging begins." }
    ],
    fertilizerSchedule: [
      { stage: "Basal", recommendation: "NPK 10:20:20 kg/ac" },
      { stage: "Pegging (45 days)", recommendation: "Gypsum 200 kg/ac" }
    ]
  },
  {
    id: "cotton",
    name: "Cotton (Paruthi)",
    category: "Cash Crop",
    shortDescription: "The 'White Gold' of Tamil Nadu, grown extensively in black soil tracts.",
    idealSoil: ["Black Cotton Soil"],
    waterRequirement: "Moderate",
    sunlight: "Full Sun",
    durationDays: 150,
    plantingDepth: "3-5 cm",
    imageUrl: "https://images.unsplash.com/photo-1600109961314-11270034a742?auto=format&fit=crop&q=80&w=800",
    tags: ["Black Soil", "Commercial", "Textile"],
    steps: [
      { title: "Sowing", description: "Dibble seeds at 75x30 cm spacing for varieties or 120x60 cm for hybrids." },
      { title: "Gap filling", description: "Fill gaps on the 10th day after sowing to maintain plant population." },
      { title: "Nipping", description: "Nip the terminal growing shoot at 70-80 days to encourage sympodial branches." }
    ],
    fertilizerSchedule: [
      { stage: "Basal", recommendation: "NPK 40:20:20 kg/ha for rainfed varieties" }
    ]
  },
  // Trees & Plantations
  {
    id: "coconut",
    name: "Coconut (Thennai)",
    category: "Tree",
    shortDescription: "A long-term plantation crop essential to coastal and delta agriculture in Tamil Nadu.",
    idealSoil: ["Sandy", "Alluvial", "Laterite"],
    waterRequirement: "High",
    sunlight: "Full Sun",
    durationDays: 2000,
    plantingDepth: "1 meter pit",
    imageUrl: "https://images.unsplash.com/photo-1596328701831-295325ea7f2c?auto=format&fit=crop&q=80&w=800",
    tags: ["Long Term", "Coastal", "Plantation"],
    steps: [
      { title: "Pit Preparation", description: "Dig pits of 1x1x1m size. Fill with topsoil, cow dung, and sand." },
      { title: "Planting", description: "Plant the seedling in the center of the pit." },
      { title: "Irrigation", description: "Provide 45-50 liters of water per palm every 4 days during summer." },
      { title: "Maintenance", description: "Regularly clean the crown and apply manure twice a year." }
    ],
    fertilizerSchedule: [
      { stage: "Bearing stage", recommendation: "NPK 500:320:1200 g/palm/year" }
    ]
  },
  {
    id: "mango",
    name: "Mango (Maamaram)",
    category: "Tree",
    shortDescription: "The king of fruits. Tamil Nadu grows distinct varieties like Alphonso, Banganapalli, and Salem Bangalora.",
    idealSoil: ["Red Loamy", "Lateritic"],
    waterRequirement: "Low",
    sunlight: "Full Sun",
    durationDays: 1460, // ~4 years to start bearing
    plantingDepth: "1x1x1m pit",
    imageUrl: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=800",
    tags: ["Orchard", "Drought Tolerant"],
    steps: [
      { title: "Planting", description: "Plant grafts in July-December at 8x8m spacing." },
      { title: "Training", description: "Remove branches up to 1m from the ground level to develop a strong framework." },
      { title: "Pruning", description: "Prune dead and diseased branches after harvest in July." }
    ],
    fertilizerSchedule: [
      { stage: "6th Year onwards", recommendation: "NPK 1:1:1.5 kg/tree/year" }
    ]
  },
  {
    id: "banana",
    name: "Banana (Vazhai)",
    category: "Tree",
    shortDescription: "Grown extensively in Trichy and delta areas. Varieties include Poovan, Rasthali, and Nendran.",
    idealSoil: ["Deep Rich Loam", "Alluvial"],
    waterRequirement: "High",
    sunlight: "Full Sun",
    durationDays: 330,
    plantingDepth: "45 cm pit",
    imageUrl: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&q=80&w=800",
    tags: ["Heavy Feeder", "Commercial"],
    steps: [
      { title: "Sucker Selection", description: "Select sword suckers weighing 1.5 - 2 kg from healthy mother plants." },
      { title: "Desuckering", description: "Remove excess suckers periodically leaving only one follower for the next crop." },
      { title: "Propping", description: "Provide support using bamboo poles during the bunch development stage." }
    ],
    fertilizerSchedule: [
      { stage: "Basal", recommendation: "FYM 10 kg/plant + NPK 110:35:330 g/plant in splits" }
    ]
  },
  {
    id: "neem",
    name: "Neem Tree (Vembu)",
    category: "Tree",
    shortDescription: "A hardy, multi-purpose tree excellent for natural pest control, timber, and shade.",
    idealSoil: ["Adaptable", "Dry", "Rocky"],
    waterRequirement: "Low",
    sunlight: "Full Sun",
    durationDays: 1800,
    plantingDepth: "60 cm pit",
    imageUrl: "https://images.unsplash.com/photo-1620023473185-3e2b34720163?auto=format&fit=crop&q=80&w=800",
    tags: ["Drought Tolerant", "Medicinal", "Timber"],
    steps: [
      { title: "Planting", description: "Plant seedlings in 60x60x60 cm pits at the onset of monsoon." },
      { title: "Watering", description: "Needs minimal watering once established." },
      { title: "Pruning", description: "Prune lower branches to encourage a straight bole for timber." }
    ],
    fertilizerSchedule: [
      { stage: "Initial", recommendation: "Organic compost in the planting pit." }
    ]
  },
  // Vegetables & Spices
  {
    id: "tomato",
    name: "Tomato (Thakkali)",
    category: "Vegetable",
    shortDescription: "A fast-growing cash crop with high market demand.",
    idealSoil: ["Well-drained Loam"],
    waterRequirement: "Moderate",
    sunlight: "Full Sun",
    durationDays: 120,
    plantingDepth: "1-2 cm (Nursery)",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800",
    tags: ["Fast Cash", "Daily Harvest"],
    steps: [
      { title: "Nursery", description: "Sow seeds in pro-trays. Ready for transplanting in 25 days." },
      { title: "Transplanting", description: "Plant at a spacing of 60x45 cm." },
      { title: "Staking", description: "Provide support using sticks to prevent fruits touching soil." }
    ],
    fertilizerSchedule: [
      { stage: "Basal", recommendation: "FYM 25 t/ha + NPK 50:100:50 kg/ha" }
    ]
  },
  {
    id: "turmeric",
    name: "Turmeric (Manjal)",
    category: "Cash Crop",
    shortDescription: "Erode is famous for this valuable spice crop with medicinal properties.",
    idealSoil: ["Clayey Loam", "Well-drained Alluvial"],
    waterRequirement: "High",
    sunlight: "Partial to Full Sun",
    durationDays: 270,
    plantingDepth: "10-15 cm",
    imageUrl: "https://images.unsplash.com/photo-1615484477201-cb864b4231b5?auto=format&fit=crop&q=80&w=800",
    tags: ["Medicinal", "Long Duration", "Erode Special"],
    steps: [
      { title: "Seed Material", description: "Select disease-free whole or split mother rhizomes." },
      { title: "Planting", description: "Plant on ridges or flat beds with a spacing of 45x15 cm." },
      { title: "Mulching", description: "Apply green leaf mulch immediately after planting." }
    ],
    fertilizerSchedule: [
      { stage: "Basal", recommendation: "FYM 40 t/ha + NPK 30:30:30 kg/ha" }
    ]
  },
  {
    id: "jasmine",
    name: "Jasmine (Madurai Malli)",
    category: "Flower",
    shortDescription: "A highly fragrant flower crop globally famous, centered around Madurai.",
    idealSoil: ["Well-drained Red Loamy"],
    waterRequirement: "Moderate",
    sunlight: "Full Sun",
    durationDays: 365, // Perennial
    plantingDepth: "30 cm pit",
    imageUrl: "https://images.unsplash.com/photo-1608688461763-71f6544a8dc7?auto=format&fit=crop&q=80&w=800",
    tags: ["GI Tagged", "Fragrant", "Daily Harvest"],
    steps: [
      { title: "Planting", description: "Plant rooted cuttings in 30x30x30 cm pits at 1.2 x 1.2 m spacing." },
      { title: "Pruning", description: "Pruning is essential in the last week of November to stimulate fresh shoots." },
      { title: "Harvesting", description: "Pluck fully developed, unopened flower buds early in the morning." }
    ],
    fertilizerSchedule: [
      { stage: "Annual", recommendation: "FYM 10 kg/plant + NPK 60:120:120 g/plant in 6 splits" }
    ]
  },
  {
    id: "blackgram",
    name: "Black Gram (Ulundhu)",
    category: "Pulse",
    shortDescription: "A short-duration pulse crop often grown in rice fallows utilizing residual moisture.",
    idealSoil: ["Clay Loam", "Black Soil"],
    waterRequirement: "Low",
    sunlight: "Full Sun",
    durationDays: 65,
    plantingDepth: "3 cm",
    imageUrl: "https://images.unsplash.com/photo-1594911855675-7bc07b6bf2d0?auto=format&fit=crop&q=80&w=800",
    tags: ["Short Duration", "Pulse", "Nitrogen Fixing"],
    steps: [
      { title: "Seed Treatment", description: "Treat seeds with Rhizobium before sowing to improve nitrogen fixation." },
      { title: "Sowing", description: "Sow seeds at 30x10 cm spacing. For rice fallows, broadcast seeds 7-10 days before rice harvest." },
      { title: "Foliar Spray", description: "Spray DAP 2% twice at flowering and 15 days later to boost yield." }
    ],
    fertilizerSchedule: [
      { stage: "Basal", recommendation: "NPK 25:50:25 kg/ha" }
    ]
  },
  {
    id: "moringa",
    name: "Moringa (Murungai)",
    category: "Tree",
    shortDescription: "A highly nutritious, drought-tolerant tree grown for its pods and leaves.",
    idealSoil: ["Sandy Loam", "Well Drained"],
    waterRequirement: "Low",
    sunlight: "Full Sun",
    durationDays: 180, // To first harvest for annual types
    plantingDepth: "45 cm pit",
    imageUrl: "https://images.unsplash.com/photo-1596547847957-c1d428bfb048?auto=format&fit=crop&q=80&w=800",
    tags: ["Drought Tolerant", "Superfood"],
    steps: [
      { title: "Planting", description: "Annual moringa is sown by seeds, while perennial types use limb cuttings." },
      { title: "Pinching", description: "Pinch the main shoot 60 days after sowing to encourage lateral branching." },
      { title: "Harvesting", description: "Harvest tender pods regularly for market." }
    ],
    fertilizerSchedule: [
      { stage: "Basal", recommendation: "FYM 10 kg/pit + NPK 45:15:30 g/pit" }
    ]
  }
];

export const getCropById = (id) => {
  return cropsData.find(crop => crop.id === id);
};
