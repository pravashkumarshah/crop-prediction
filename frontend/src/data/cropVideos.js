/**
 * AgriSmart AI — Comprehensive Crop Video Masterclasses & Clinical Prescriptions (Rx)
 * For All 22 Canonical Crop Varieties
 */

export const CROP_VIDEOS_AND_PRESCRIPTIONS = {
  rice: {
    displayName: 'Rice / Paddy (धान)',
    videos: [
      {
        id: 'full_guide',
        title: 'Complete Rice / Paddy Cultivation Masterclass (धान की वैज्ञानिक खेती)',
        channel: 'Indian Farmer / ICAR Agro Guide',
        duration: '18:45',
        category: 'A to Z Cultivation',
        searchQuery: 'rice cultivation paddy farming full guide Indian Farmer',
        highlights: ['Nursery Preparation', 'Transplanting Technique', 'Weed Management', 'Yield Maximization']
      },
      {
        id: 'fertilizer',
        title: 'Rice NPK & Micronutrient Schedule (धान में खाद और उर्वरक का सही समय)',
        channel: 'Krishi Jagran Technical',
        duration: '14:20',
        category: 'Fertilizer & NPK',
        searchQuery: 'dhaan me khad ka schedule rice fertilizer management',
        highlights: ['Basal DAP Application', 'Zinc Sulphate Deficiency', 'Urea Top Dressing Stages']
      },
      {
        id: 'pest_control',
        title: 'Stem Borer & Blast Disease Management (धान के कीट एवं फफूंद रोग नियंत्रण)',
        channel: 'Agriculture Field Officer Guide',
        duration: '12:10',
        category: 'Disease & Pest Control',
        searchQuery: 'rice blast stem borer control treatment',
        highlights: ['Yellow Stem Borer Trap', 'Sheath Blight Fungicide', 'Brown Planthopper Care']
      }
    ],
    prescription: {
      rxCode: 'RX-PADDY-2027',
      stage: 'Nursery to Panicle Emergence',
      basalDose: 'Apply 50 kg DAP + 25 kg MOP + 10 kg Zinc Sulphate (21%) per acre at final puddling.',
      firstTopDressing: 'Apply 35 kg Urea + 4 kg Cartap Hydrochloride granules 20-25 days after transplanting.',
      secondTopDressing: 'Apply 30 kg Urea + 10 kg Potash at panicle initiation stage (45-55 days).',
      irrigationSchedule: 'Maintain 3-5 cm standing water during tillering to grain filling. Drain 10 days before harvest.',
      plantProtection: 'Spray Tricyclazole 75% WP @ 120g/acre for Blast prevention at tillering stage.',
      doctorRemarks: 'Optimal genetic compatibility detected. Prioritize soil organic carbon and balanced zinc to avoid khaira disease.'
    }
  },

  maize: {
    displayName: 'Maize / Corn (मक्का)',
    videos: [
      {
        id: 'full_guide',
        title: 'High-Yield Hybrid Maize Farming (मक्का की उन्नत खेती A to Z)',
        channel: 'The Advance Agriculture',
        duration: '16:30',
        category: 'A to Z Cultivation',
        searchQuery: 'maize corn farming cultivation full guide Indian Farmer',
        highlights: ['Seed Spacing 60x20 cm', 'Ridge & Furrow Method', 'Cob Filling Technology']
      },
      {
        id: 'fertilizer',
        title: 'Maize NPK Fertilizer Regimen (मक्के में खाद की पूरी जानकारी)',
        channel: 'Agri Farming India',
        duration: '11:45',
        category: 'Fertilizer & NPK',
        searchQuery: 'maize corn fertilizer schedule NPK dose',
        highlights: ['Basal Dressing Balance', 'Knee-High Stage Urea', 'Tasseling Potassium']
      },
      {
        id: 'pest_control',
        title: 'Fall Armyworm Eradication in Maize (फॉल आर्मीवॉर्म सुंडी नियंत्रण)',
        channel: 'Krishi Vigyan Kendra',
        duration: '13:50',
        category: 'Disease & Pest Control',
        searchQuery: 'fall armyworm control in maize corn',
        highlights: ['Pheromone Traps', 'Emamectin Benzoate 5% SG', 'Whorl Application']
      }
    ],
    prescription: {
      rxCode: 'RX-MAIZE-2027',
      stage: 'Sowing to Tasseling',
      basalDose: 'Apply 50 kg NPK (12:32:16) + 10 kg Sulphur per acre at furrow planting.',
      firstTopDressing: 'Top dress 35 kg Urea at knee-high vegetative stage (25-30 days after sowing).',
      secondTopDressing: 'Top dress 25 kg Urea + 15 kg MOP just before tasseling / silking stage.',
      irrigationSchedule: 'Irrigate at critical stages: Knee-high, Tasseling, Silking, and Grain doughing.',
      plantProtection: 'Spray Emamectin Benzoate 5% SG @ 80g/acre into central whorls against Fall Armyworm.',
      doctorRemarks: 'Excellent nitrogen responsiveness. Avoid waterlogging around root zones during early growth.'
    }
  },

  chickpea: {
    displayName: 'Chickpea / Gram (चना)',
    videos: [
      {
        id: 'full_guide',
        title: 'Scientific Chickpea / Chana Farming Guide (चना की बम्पर पैदावार तकनीक)',
        channel: 'Green TV India / Shramajeevi',
        duration: '15:10',
        category: 'A to Z Cultivation',
        searchQuery: 'chana chickpea farming cultivation full guide',
        highlights: ['Trichoderma Seed Inoculation', 'Nipping / Branching Technique', 'Pod Development']
      },
      {
        id: 'fertilizer',
        title: 'Fertilizer & Rhizobium for Pulses (चना में खाद और सूक्ष्म पोषक तत्व)',
        channel: 'Agriculture Master India',
        duration: '10:30',
        category: 'Fertilizer & NPK',
        searchQuery: 'chickpea chana fertilizer management rhizobium',
        highlights: ['Phosphorus Solubilizing Bacteria', 'Foliar DAP 2% Spray', 'Boron Nutrition']
      },
      {
        id: 'pest_control',
        title: 'Helicoverpa Pod Borer & Wilt Control (चना का उकठा रोग एवं इल्ली रोकथाम)',
        channel: 'Kheti Badi Technical',
        duration: '12:40',
        category: 'Disease & Pest Control',
        searchQuery: 'chana pod borer helicoverpa wilt treatment',
        highlights: ['Bird Perches Installation', 'Chlorantraniliprole Spray', 'Trichoderma Viride Soil Drench']
      }
    ],
    prescription: {
      rxCode: 'RX-CHICKPEA-2027',
      stage: 'Pre-Sowing to Pod Formation',
      basalDose: 'Apply 40 kg DAP + 15 kg MOP + 10 kg Sulphur (90% Bentonite) per acre. Avoid excess Nitrogen.',
      firstTopDressing: 'Foliar spray of 19:19:19 (1 kg/acre) + Micronutrient mix at 35 days.',
      secondTopDressing: 'Foliar spray of 0:52:34 (1 kg/acre) + Boron 20% (100g/acre) at 50% flowering.',
      irrigationSchedule: 'Strictly light irrigation: 1st at pre-flowering (35-40 days), 2nd at pod filling (60-65 days). Never irrigate in full bloom.',
      plantProtection: 'Seed treatment with Trichoderma viride @ 5g/kg seed. Spray Chlorantraniliprole 18.5% SC @ 60ml/acre for Pod Borer.',
      doctorRemarks: 'Leguminous natural nitrogen fixer. Ensure deep plowing to break hardpan and prevent vascular wilt.'
    }
  },

  kidneybeans: {
    displayName: 'Kidney Beans / Rajma (राजमा)',
    videos: [
      {
        id: 'full_guide',
        title: 'Commercial Rajma / Kidney Bean Farming (राजमा की उन्नत खेती)',
        channel: 'Indian Farmer Hub',
        duration: '14:20',
        category: 'A to Z Cultivation',
        searchQuery: 'rajma kidney bean farming cultivation guide',
        highlights: ['Cold Weather Sowing', 'Seed Treatment', 'Pod Loading Boost']
      },
      {
        id: 'fertilizer',
        title: 'High-Nitrogen Regimen for Rajma (राजमा में खाद का संपूर्ण शेड्यूल)',
        channel: 'Kisan Helpline',
        duration: '11:15',
        category: 'Fertilizer & NPK',
        searchQuery: 'rajma fertilizer dose NPK management',
        highlights: ['Rajma lacks nodulation', 'Heavy Nitrogen Requirement', 'Phosphorus Placement']
      }
    ],
    prescription: {
      rxCode: 'RX-RAJMA-2027',
      stage: 'Vegetative to Pod Setting',
      basalDose: 'Apply 50 kg DAP + 40 kg Urea + 25 kg MOP per acre. (Rajma cannot fix biological nitrogen!)',
      firstTopDressing: 'Top dress 35 kg Urea at 30 days during first hoeing and earthing-up.',
      secondTopDressing: 'Foliar spray of 13:0:45 (Potassium Nitrate) @ 1.5 kg/acre at pod elongation.',
      irrigationSchedule: 'Needs moist soil without waterlogging. Irrigate every 12-15 days in plains.',
      plantProtection: 'Spray Carbendazim + Mancozeb @ 2g/L for Anthracnose leaf spot prevention.',
      doctorRemarks: 'Ensure ridges are well-formed. Rajma has delicate root systems highly sensitive to stagnant water.'
    }
  },

  pigeonpeas: {
    displayName: 'Pigeonpeas / Arhar / Tur (अरहर / तुअर)',
    videos: [
      {
        id: 'full_guide',
        title: 'Arhar / Tur Dal Scientific Cultivation (अरहर की वैज्ञानिक खेती A to Z)',
        channel: 'Agriculture Point India',
        duration: '17:15',
        category: 'A to Z Cultivation',
        searchQuery: 'arhar tur dal farming cultivation guide Indian Farmer',
        highlights: ['Spacing 4x2 feet', 'Branch Nipping Technique', 'Pod Borer Protection']
      },
      {
        id: 'pest_control',
        title: 'Sterility Mosaic & Pod Fly Eradication in Tur (अरहर में बांझपन रोग व कीट)',
        channel: 'Green TV India',
        duration: '13:30',
        category: 'Disease & Pest Control',
        searchQuery: 'tur arhar pod fly borer control management',
        highlights: ['Indoxacarb Spray', 'Neem Oil 10000 PPM', 'Pheromone Trap Setup']
      }
    ],
    prescription: {
      rxCode: 'RX-ARHAR-2027',
      stage: 'Nipping to Pod Maturation',
      basalDose: 'Apply 40 kg DAP + 20 kg Potash + 10 kg Zinc Sulphate per acre in seed furrows.',
      firstTopDressing: 'Nip terminal shoots at 45 days to induce 40% more secondary lateral branches.',
      secondTopDressing: 'Foliar spray of 0:52:34 (1 kg) + Boron (150g) at early bud initiation.',
      irrigationSchedule: 'Critical irrigation at branching, flower budding, and grain filling stages.',
      plantProtection: 'Spray Flubendiamide 39.35% SC @ 50ml/acre against Maruca pod borer caterpillar.',
      doctorRemarks: 'Deep taproot system thrives in well-drained loams. Intercropping with soybean or green gram boosts overall hectare returns.'
    }
  },

  cotton: {
    displayName: 'Cotton / Kapas (कपास)',
    videos: [
      {
        id: 'full_guide',
        title: 'Bt Cotton Scientific Cultivation & Bumper Yield (कपास की आधुनिक खेती)',
        channel: 'Cotton Guru / Indian Farmer',
        duration: '22:10',
        category: 'A to Z Cultivation',
        searchQuery: 'cotton kapas farming cultivation full guide Indian Farmer',
        highlights: ['Drip Irrigation Setup', 'Square & Boll Retention', 'Pink Bollworm Defense']
      },
      {
        id: 'pest_control',
        title: 'Pink Bollworm & Whitefly Defense in Cotton (गुलाबी सुंडी व सफेद मक्खी नियंत्रण)',
        channel: 'Central Institute for Cotton Research',
        duration: '15:40',
        category: 'Disease & Pest Control',
        searchQuery: 'cotton pink bollworm whitefly control treatment',
        highlights: ['PBLure Traps', 'Spinosad 45% SC', 'Yellow Sticky Traps']
      }
    ],
    prescription: {
      rxCode: 'RX-COTTON-2027',
      stage: 'Squaring to Boll Bursting',
      basalDose: 'Apply 50 kg DAP + 30 kg MOP + 15 kg Magnesium Sulphate per acre.',
      firstTopDressing: 'Apply 35 kg Urea + 5 kg Micronutrient mix 30-35 days after sowing.',
      secondTopDressing: 'Spray 13:0:45 (Potassium Nitrate) @ 2 kg/acre + Planofix (Alpha NAA) @ 45ml for boll retention.',
      irrigationSchedule: 'Irrigate at flowering and boll formation. Stop water when 30% bolls open to prevent stained lint.',
      plantProtection: 'Install 8 Pheromone traps/acre for Pink Bollworm monitoring. Spray Profenophos 50% EC @ 400ml/acre if threshold crossed.',
      doctorRemarks: 'Deep black cotton or well-drained alluvial soil recommended. Watch for red leaf disease; supplement with 1% Magnesium Sulphate spray.'
    }
  },

  banana: {
    displayName: 'Banana / Kela (केला)',
    videos: [
      {
        id: 'full_guide',
        title: 'Grand Naine (G9) Banana Tissue Culture Farming (केले की वैज्ञानिक खेती)',
        channel: 'Kisan Tak / Shramajeevi',
        duration: '21:05',
        category: 'A to Z Cultivation',
        searchQuery: 'banana g9 tissue culture cultivation farming guide',
        highlights: ['Pit Preparation 6x6 feet', 'Drip Fertigation Chart', 'Bunch Spray & Bagging']
      },
      {
        id: 'fertilizer',
        title: 'Weekly Drip Fertigation Schedule for Banana (केले में ड्रिप खाद का पूरा चार्ट)',
        channel: 'Indian Farmer High-Tech',
        duration: '16:20',
        category: 'Fertilizer & NPK',
        searchQuery: 'banana drip fertigation schedule weekly fertilizer',
        highlights: ['19:19:19 Vegetative Phase', '0:52:34 Shooting Phase', '0:0:50 Bunch Development']
      }
    ],
    prescription: {
      rxCode: 'RX-BANANA-2027',
      stage: 'Planting to Bunch Emergence',
      basalDose: 'Add 10 kg Well-rotted FYM + 250g SSP + 50g Neem Cake in each planting pit.',
      firstTopDressing: 'Weekly drip fertigation: 19:19:19 (4 kg/week/1000 plants) from week 4 to week 16.',
      secondTopDressing: '0:0:50 Sulphate of Potash (5 kg/week/1000 plants) during bunch development for sweet pulp and heavy weight.',
      irrigationSchedule: 'Maintain continuous moisture through drip. Requires 15-20 liters water/plant/day in summer.',
      plantProtection: 'Spray Propiconazole 25% EC @ 1ml/L + Mineral oil (1%) to prevent Sigatoka Leaf Spot.',
      doctorRemarks: 'Heavy feeder crop requiring continuous potassium. Provide bamboo propping when bunch forms to prevent lodging.'
    }
  },

  mango: {
    displayName: 'Mango Orchard (आम की बागवानी)',
    videos: [
      {
        id: 'full_guide',
        title: 'Commercial Mango Orchard Care & Bumper Harvest (आम की सफल वैज्ञानिक बागवानी)',
        channel: 'Horticulture Research Institute',
        duration: '19:45',
        category: 'A to Z Cultivation',
        searchQuery: 'mango orchard cultivation farming care guide',
        highlights: ['Canopy Pruning (Center Opening)', 'Flower Induction', 'Fruit Drop Prevention']
      },
      {
        id: 'pest_control',
        title: 'Mango Hopper, Powdery Mildew & Fruit Fly Defense (आम के कीट एवं रोग रोकथाम)',
        channel: 'Green TV India',
        duration: '14:50',
        category: 'Disease & Pest Control',
        searchQuery: 'mango hopper powdery mildew fruit fly spray management',
        highlights: ['Imidacloprid Spray', 'Wettable Sulphur 80%', 'Pheromone Fly Traps']
      }
    ],
    prescription: {
      rxCode: 'RX-MANGO-2027',
      stage: 'Post-Harvest Pruning to Fruit Setting',
      basalDose: 'Apply 25 kg Farmyard Manure + 1 kg SSP + 500g MOP per mature tree in circular basin after harvest.',
      firstTopDressing: 'Spray Paclobutrazol (Cultar) in soil basin (September/October) for regular annual flowering in alternate-bearing varieties.',
      secondTopDressing: 'Spray NAA (Planofix) @ 4ml/15L water at pea-size fruit stage to stop premature fruit drop.',
      irrigationSchedule: 'Withhold irrigation for 2-3 months before flowering to induce flower buds. Irrigate regularly after fruit set.',
      plantProtection: 'First spray at panicle emergence: Imidacloprid 17.8% SL (0.5ml/L) + Hexaconazole (1ml/L) against hoppers and powdery mildew.',
      doctorRemarks: 'Maintain open center tree canopy to allow sun penetration. Install methyl eugenol traps for fruit fly control.'
    }
  },

  watermelon: {
    displayName: 'Watermelon (तरबूज)',
    videos: [
      {
        id: 'full_guide',
        title: 'Watermelon Mulching & Drip High-Tech Farming (तरबूज की बम्पर खेती A to Z)',
        channel: 'The Advance Agriculture',
        duration: '18:10',
        category: 'A to Z Cultivation',
        searchQuery: 'watermelon farming mulching drip cultivation Indian Farmer',
        highlights: ['25 Micron Silver-Black Mulch', 'Drip Fertigation Schedule', 'Fruit Setting & Brix Boost']
      },
      {
        id: 'fertilizer',
        title: 'How to Increase Watermelon Sweetness & Weight (तरबूज का वजन और मिठास कैसे बढ़ाएं)',
        channel: 'Indian Farmer',
        duration: '13:40',
        category: 'Fertilizer & NPK',
        searchQuery: 'watermelon weight sweetness fertilizer 0 0 50',
        highlights: ['Calcium Nitrate + Boron Spray', '0:0:50 Potassium', 'Stopping Water Before Harvest']
      }
    ],
    prescription: {
      rxCode: 'RX-WATERMELON-2027',
      stage: 'Mulch Bed Sowing to Harvesting',
      basalDose: 'Under bed: 50 kg DAP + 30 kg Potash + 10 kg Micronutrients + 10 kg Carbofuran/acre.',
      firstTopDressing: 'Drip fertigation: 12:61:00 (MAP) 3 kg/acre twice a week during early root branching.',
      secondTopDressing: 'Drip fertigation: 0:0:50 (Potassium Sulphate) 4 kg/acre + Boron 250g at fruit sizing stage for deep red color & 12+ Brix sweetness.',
      irrigationSchedule: 'Drip 1.5-2 hours daily in morning. Reduce water 7 days before picking to concentrate sugar sugars.',
      plantProtection: 'Install yellow & blue sticky traps (25/acre). Spray Thiamethoxam 25% WG @ 80g/acre against aphids and leafhoppers.',
      doctorRemarks: 'Sandy loam soil with high organic matter ensures rapid root spread. Mulch paper prevents fruit contact with damp soil.'
    }
  },

  coffee: {
    displayName: 'Coffee (कॉफी)',
    videos: [
      {
        id: 'full_guide',
        title: 'Arabica & Robusta Coffee Cultivation Masterclass (कॉफी की वैज्ञानिक खेती)',
        channel: 'Coffee Board of India / Planters Guild',
        duration: '20:30',
        category: 'A to Z Cultivation',
        searchQuery: 'coffee plantation farming cultivation guide India',
        highlights: ['Two-Tier Shade Tree Canopy', 'Soil pH 6.0-6.5 Conditioning', 'Berry Borer IPM']
      },
      {
        id: 'pest_control',
        title: 'Coffee Berry Borer & Leaf Rust Defense (कॉफी बेरी बोरर एवं पत्ती रतुआ)',
        channel: 'Central Coffee Research Station',
        duration: '15:15',
        category: 'Disease & Pest Control',
        searchQuery: 'coffee leaf rust berry borer control treatment',
        highlights: ['Bordeaux Mixture 0.5% Spray', 'Beauveria Bassiana Bio-Pesticide', 'Sanitary Stripping']
      }
    ],
    prescription: {
      rxCode: 'RX-COFFEE-2027',
      stage: 'Blossom to Berry Ripening',
      basalDose: 'Apply 120 kg N : 90 kg P2O5 : 120 kg K2O per hectare split across pre-monsoon and post-monsoon.',
      firstTopDressing: 'Pre-monsoon application: Balanced NPK complex fertilizer in drip circle around canopy.',
      secondTopDressing: 'Foliar spray of 1% Urea + 0.5% Zinc Sulphate post-blossom showers to encourage vegetative flushing.',
      irrigationSchedule: 'Blossom shower irrigation (25-35 mm) in March/April triggers synchronous flowering. Backing shower required 2 weeks later.',
      plantProtection: 'Pre-monsoon and post-monsoon spray of 0.5% Neutral Bordeaux Mixture against Coffee Leaf Rust (Hemileia vastatrix).',
      doctorRemarks: 'Requires acidic to neutral forest loamy soil rich in humus. Maintain 40-50% filtered shade via silver oak and dadap trees.'
    }
  },

  apple: {
    displayName: 'Apple (सेब)',
    videos: [
      {
        id: 'full_guide',
        title: 'High-Density Apple Orchard Farming Guide (सेब की आधुनिक खेती A to Z)',
        channel: 'Himalayan Horticulture Hub',
        duration: '22:40',
        category: 'A to Z Cultivation',
        searchQuery: 'high density apple orchard cultivation farming guide',
        highlights: ['M9 / MM111 Rootstock Selection', 'Trellis Support Wire Installation', 'Chilling Hours (800-1200 hrs)']
      },
      {
        id: 'pest_control',
        title: 'Apple Scab & Mite Protection Schedule (सेब में स्केब रोग एवं माइट्स का उपचार)',
        channel: 'Dr. YS Parmar Horticulture University',
        duration: '16:10',
        category: 'Disease & Pest Control',
        searchQuery: 'apple scab disease mite control treatment spray chart',
        highlights: ['Dormant Tree Spray Oil (TSO)', 'Difenoconazole 25% EC', 'Captan Protective Spray']
      }
    ],
    prescription: {
      rxCode: 'RX-APPLE-2027',
      stage: 'Silver Tip to Fruit Development',
      basalDose: 'Apply 30 kg Farmyard Manure + 700g Nitrogen + 350g Phosphorus + 700g Potassium per mature standard tree in winter dormancy.',
      firstTopDressing: 'Foliar spray of Boric Acid (0.1%) at pink bud stage to enhance pollen tube viability and fruit set.',
      secondTopDressing: 'Foliar spray of Calcium Chloride (0.5%) 4 weeks and 2 weeks before harvest to prevent bitter pit storage disorder.',
      irrigationSchedule: 'Critical during fruit development (May to July). Drip irrigation ensures uniform sizing without cracking.',
      plantProtection: 'Tree Spray Oil (TSO) 2% at green tip stage for San Jose scale. Difenoconazole @ 0.03% immediately post-bloom for Scab defense.',
      doctorRemarks: 'Requires 800 to 1,200 chill hours below 7°C for bud dormancy break. Plant 10-15% pollinizer varieties (Gala, Granny Smith).'
    }
  },

  jute: {
    displayName: 'Jute / Patsan (पटसन / जूट)',
    videos: [
      {
        id: 'full_guide',
        title: 'Scientific Jute Cultivation & Retting (जूट की उन्नत खेती एवं सड़न विधि)',
        channel: 'ICAR - Central Research Institute for Jute (CRIJAF)',
        duration: '16:50',
        category: 'A to Z Cultivation',
        searchQuery: 'jute cultivation retting process ICAR CRIJAF',
        highlights: ['Line Sowing 25x5 cm', 'Weed Control with Quizalofop', 'CRIJAF Sona Ribbon Retting']
      }
    ],
    prescription: {
      rxCode: 'RX-JUTE-2027',
      stage: 'Line Sowing to Harvesting & Retting',
      basalDose: 'Apply 40 kg Urea + 40 kg SSP + 20 kg MOP per hectare at final land preparation.',
      firstTopDressing: 'Top dress 40 kg Urea per hectare 21-25 days after sowing following first weeding.',
      secondTopDressing: 'Top dress remaining 20 kg Urea at 40-45 days if rainfall has been continuous.',
      irrigationSchedule: 'Thrives in warm, humid monsoon climate with standing moisture. Tolerates waterlogging after 60 days.',
      plantProtection: 'Spray Carbendazim 50% WP @ 2g/L for Stem Rot & Root Rot prevention during humid monsoon flushes.',
      doctorRemarks: 'Harvest at 50% flowering for highest tensile fiber quality. Utilize microbial consortia (CRIJAF Sona) to cut retting time by 7 days.'
    }
  },

  mothbeans: {
    displayName: 'Moth Bean (मोठ दाल)',
    videos: [
      {
        id: 'full_guide',
        title: 'Moth Bean Cultivation in Arid Zones (मोठ की वैज्ञानिक एवं बम्पर खेती)',
        channel: 'Desert Agriculture Research / Krishi Jagran',
        duration: '14:20',
        category: 'A to Z Cultivation',
        searchQuery: 'moth bean kheti cultivation full guide',
        highlights: ['Drought Resistance', 'Sandy Loam Management', 'Rhizobium Seed Treatment']
      },
      {
        id: 'fertilizer',
        title: 'Nutrient & Bio-Fertilizer for Moth Bean (मोठ में जैविक खाद प्रबंधन)',
        channel: 'Kisan Technical Advice',
        duration: '10:45',
        category: 'Fertilizer & NPK',
        searchQuery: 'moth bean fertilizer biofertilizer guide',
        highlights: ['Starter Phosphorus', 'Rhizobium Leguminosarum', 'Zero Nitrogen Needed']
      }
    ],
    prescription: {
      rxCode: 'RX-MOTH-2027',
      stage: 'Sowing to Pod Filling',
      basalDose: 'Apply 20 kg DAP + 10 kg Sulphur per acre at furrow line. Moth bean thrives with minimal synthetic inputs.',
      firstTopDressing: 'Foliar spray of 19:19:19 (0.5 kg/acre) at 25 days if soil moisture is adequate.',
      secondTopDressing: 'Spray 0:52:34 @ 1 kg/acre at flower initiation for maximum pod setting.',
      irrigationSchedule: 'Extremely drought hardy. One life-saving irrigation at 30 days during severe dry spells.',
      plantProtection: 'Treat seeds with Trichoderma @ 4g/kg seed. Spray Neem Oil 1500 PPM @ 3ml/L against Jassids.',
      doctorRemarks: 'Excellent cover crop for arid, sandy soils. Prevents topsoil wind erosion while fixing atmospheric nitrogen.'
    }
  },

  mungbean: {
    displayName: 'Mung Bean / Green Gram (मूंग दाल)',
    videos: [
      {
        id: 'full_guide',
        title: '60-Day Mung Bean High Yield Technology (मूंग की 60 दिन में बंपर पैदावार)',
        channel: 'Indian Farmer / The Advance Agriculture',
        duration: '15:40',
        category: 'A to Z Cultivation',
        searchQuery: 'moong mung bean cultivation farming guide Indian Farmer',
        highlights: ['Short Duration Varieties (IPM 205-7)', 'Line Sowing Spacing', 'Pod Shattering Prevention']
      },
      {
        id: 'pest_control',
        title: 'Yellow Mosaic Virus Defense in Moong (मूंग का पीला मोज़ेक रोग रोकथाम)',
        channel: 'ICAR Pulse Research Institute',
        duration: '11:55',
        category: 'Disease & Pest Control',
        searchQuery: 'moong yellow mosaic virus whitefly control',
        highlights: ['Whitefly Vector Control', 'Thiamethoxam Seed Treatment', 'Acetamiprid Spray']
      }
    ],
    prescription: {
      rxCode: 'RX-MOONG-2027',
      stage: 'Vegetative to Pod Maturation',
      basalDose: 'Apply 35 kg DAP + 15 kg MOP + 10 kg Sulphur per acre. Seed treat with Rhizobium + PSB culture.',
      firstTopDressing: 'Foliar spray of 2% DAP solution or 19:19:19 @ 1 kg/acre at 25-30 days.',
      secondTopDressing: 'Spray 0:52:34 (Mono Potassium Phosphate) @ 1 kg/acre + 100g Boron at flowering.',
      irrigationSchedule: 'Needs 2-3 light irrigations: 1st at 20-25 days, 2nd at pod development. Never irrigate in full bloom.',
      plantProtection: 'Spray Acetamiprid 20% SP @ 50g/acre or Thiamethoxam 25% WG against Whiteflies transmitting Yellow Mosaic Virus.',
      doctorRemarks: 'Short 60-day window ideal for summer cash crop between wheat and paddy rotations.'
    }
  },

  blackgram: {
    displayName: 'Black Gram / Urad (उड़द दाल)',
    videos: [
      {
        id: 'full_guide',
        title: 'Scientific Urad / Black Gram Cultivation (उड़द की वैज्ञानिक खेती तकनीक)',
        channel: 'Krishi Jagran / Shramajeevi',
        duration: '14:50',
        category: 'A to Z Cultivation',
        searchQuery: 'urad dal black gram farming cultivation guide',
        highlights: ['Seed Treatment with Carboxin', 'Ridge Sowing for Drainage', 'Pod Borer Management']
      },
      {
        id: 'fertilizer',
        title: 'Fertilizer Regimen for High-Yield Urad (उड़द में अधिक फलियों के लिए खाद)',
        channel: 'Agriculture Master India',
        duration: '10:20',
        category: 'Fertilizer & NPK',
        searchQuery: 'urad fertilizer schedule NPK spray',
        highlights: ['DAP Basal Balance', 'Sulphur for Protein Synthesis', 'Foliar Micronutrients']
      }
    ],
    prescription: {
      rxCode: 'RX-URAD-2027',
      stage: 'Branching to Pod Formation',
      basalDose: 'Apply 40 kg DAP + 15 kg MOP + 10 kg Sulphur per acre. Seed coating with Rhizobium culture.',
      firstTopDressing: 'Foliar spray of 19:19:19 (1 kg/acre) + Micronutrient mixture at 25 days.',
      secondTopDressing: 'Foliar spray of 0:52:34 @ 1 kg/acre at 50% flowering to boost grain density.',
      irrigationSchedule: 'Requires moderate moisture. Light irrigation at pre-flowering and pod filling ensures plump seeds.',
      plantProtection: 'Spray Chlorantraniliprole 18.5% SC @ 60ml/acre for Pod Borer caterpillars at initiation of flowering.',
      doctorRemarks: 'Deep taproot system thrives in black cotton soils. Ensure efficient drainage to prevent Root Rot.'
    }
  },

  lentil: {
    displayName: 'Lentil / Masoor (मसूर दाल)',
    videos: [
      {
        id: 'full_guide',
        title: 'Masoor / Lentil Bumper Crop Cultivation (मसूर की उन्नत खेती कैसे करें)',
        channel: 'Green TV India',
        duration: '13:40',
        category: 'A to Z Cultivation',
        searchQuery: 'masoor lentil farming cultivation guide Indian Farmer',
        highlights: ['Zero-Till Residual Sowing', 'Nodule Formation', 'Wilt Disease Management']
      },
      {
        id: 'pest_control',
        title: 'Rust & Wilt Control in Lentil (मसूर का उकठा एवं गेरुई रोग नियंत्रण)',
        channel: 'ICAR Pulse Field Research',
        duration: '11:10',
        category: 'Disease & Pest Control',
        searchQuery: 'lentil masoor wilt rust disease control',
        highlights: ['Trichoderma Seed Dressing', 'Mancozeb Spray', 'Crop Rotation']
      }
    ],
    prescription: {
      rxCode: 'RX-MASOOR-2027',
      stage: 'Branching to Grain Filling',
      basalDose: 'Apply 35 kg DAP + 15 kg MOP + 10 kg Sulphur bentonite per acre in furrows.',
      firstTopDressing: 'Foliar spray of 2% Urea or 19:19:19 (1 kg/acre) at 30 days if winter vegetative growth slows.',
      secondTopDressing: 'Foliar spray of 0:52:34 (1 kg/acre) + Boron (100g/acre) at early flowering.',
      irrigationSchedule: 'Low water requirement. One light irrigation at branching (40-45 days) and one at pod filling.',
      plantProtection: 'Seed treatment with Trichoderma viride @ 5g/kg seed. Spray Propiconazole 25% EC @ 1ml/L for Rust.',
      doctorRemarks: 'Exceptional winter pulse for rice-fallow conservation tillage. High natural atmospheric nitrogen fixation.'
    }
  },

  pomegranate: {
    displayName: 'Pomegranate / Anar (अनार की बागवानी)',
    videos: [
      {
        id: 'full_guide',
        title: 'Bhagwa Pomegranate Commercial Orchard Care (अनार की आधुनिक बागवानी)',
        channel: 'Indian Farmer / National Pomegranate Research Centre',
        duration: '24:15',
        category: 'A to Z Cultivation',
        searchQuery: 'pomegranate anar orchard farming cultivation guide Indian Farmer',
        highlights: ['Bahar Treatment (Hasta/Mrug)', 'Canopy Pruning', 'Fruit Size & Gloss Maximization']
      },
      {
        id: 'pest_control',
        title: 'Bacterial Blight (Telya) & Fruit Borer in Anar (अनार का तेल्या रोग व फल छेदक)',
        channel: 'Horticulture Advisory Centre',
        duration: '16:35',
        category: 'Disease & Pest Control',
        searchQuery: 'pomegranate bacterial blight telya disease fruit borer',
        highlights: ['Streptocycline + Copper Oxychloride', 'Fruit Bagging Technique', 'Sanitary Pruning']
      }
    ],
    prescription: {
      rxCode: 'RX-ANAR-2027',
      stage: 'Bahar Rest to Fruit Maturation',
      basalDose: 'Apply 20 kg Farmyard Manure + 500g SSP + 250g Potash + 50g Micronutrient mix per plant basin during bahar activation.',
      firstTopDressing: 'Drip fertigation: 12:61:00 (MAP) 3 kg/week/1000 plants during flowering and fruit setting.',
      secondTopDressing: 'Drip fertigation: 0:0:50 (Potassium Sulphate) 5 kg/week/1000 plants during fruit enlargement for deep red aril color.',
      irrigationSchedule: 'Strict bahar water stress for 40-50 days followed by light activation watering. Drip irrigate 15-20 L/day during fruit growth.',
      plantProtection: 'Spray Copper Hydroxide (2.5g/L) + Streptocycline (0.5g/L) against Bacterial Blight (Telya). Bag developing fruits with butter paper.',
      doctorRemarks: 'Prune dry branches regularly and seal cuts with Bordeaux paste. Bhagwa variety delivers premium export rates.'
    }
  },

  grapes: {
    displayName: 'Grapes / Angoor (अंगूर की खेती)',
    videos: [
      {
        id: 'full_guide',
        title: 'Thompson Seedless & Super Sonaka Grape Farming (अंगूर की आधुनिक वैज्ञानिक खेती)',
        channel: 'Grape Growers Association / Indian Farmer',
        duration: '23:30',
        category: 'A to Z Cultivation',
        searchQuery: 'grape cultivation angoor farming guide India',
        highlights: ['Bower / Y-Trellis Setup', 'Back Pruning & Foundation Pruning', 'Gibberellic Acid (GA3) Dipping']
      },
      {
        id: 'pest_control',
        title: 'Downy & Powdery Mildew Management in Grapes (अंगूर में डाउनी मिल्ड्यू व भुरी रोग)',
        channel: 'National Research Centre for Grapes (NRCG)',
        duration: '17:20',
        category: 'Disease & Pest Control',
        searchQuery: 'grapes downy mildew powdery mildew control NRCG',
        highlights: ['Dimethomorph 50% WP', 'Penconazole Spray', 'Bunch Ventilation']
      }
    ],
    prescription: {
      rxCode: 'RX-GRAPES-2027',
      stage: 'Pruning to Berry Sizing & Veraison',
      basalDose: 'Apply 25 tonnes FYM/ha + 250 kg SSP + 100 kg MOP after forward pruning in October/November.',
      firstTopDressing: 'GA3 (Gibberellic Acid) bunch dipping: 1st dip at 40 ppm at flower cluster elongation, 2nd dip at 50 ppm at 4mm berry size.',
      secondTopDressing: 'Drip fertigation: 0:0:50 (Potassium Sulphate) 8 kg/acre weekly during berry veraison for high brix sugar accumulation.',
      irrigationSchedule: 'Controlled drip irrigation based on pan evaporation. Stop water 10-12 days prior to harvest to prevent skin splitting.',
      plantProtection: 'Spray Mandipropamid 23.4% SC @ 0.8ml/L for Downy Mildew. Alternate with Penconazole 10% EC for Powdery Mildew.',
      doctorRemarks: 'Maintain open bower canopy for sun penetration and rapid leaf drying. Grapes are highly sensitive to soil salinity.'
    }
  },

  muskmelon: {
    displayName: 'Muskmelon / Cantaloupe (खरबूजा)',
    videos: [
      {
        id: 'full_guide',
        title: 'Commercial Muskmelon Mulching Farming (खरबूजा की वैज्ञानिक खेती A to Z)',
        channel: 'The Advance Agriculture',
        duration: '16:45',
        category: 'A to Z Cultivation',
        searchQuery: 'muskmelon kharbuja cultivation mulching drip farming',
        highlights: ['Silver-Black Mulch (25 micron)', 'Bee Pollination Care', 'Netting & Aroma Boost']
      },
      {
        id: 'fertilizer',
        title: 'Muskmelon Sugar & Weight Boost Chart (खरबूजे में मिठास और वजन बढ़ाने की खाद)',
        channel: 'Indian Farmer High-Tech',
        duration: '12:30',
        category: 'Fertilizer & NPK',
        searchQuery: 'muskmelon fertilizer drip schedule sweetness',
        highlights: ['Calcium Nitrate + Boron', '0:0:50 at Netting Stage', 'Controlling Water Before Harvest']
      }
    ],
    prescription: {
      rxCode: 'RX-MELON-2027',
      stage: 'Bed Formation to Fruit Ripening',
      basalDose: 'Under mulch: 50 kg DAP + 35 kg MOP + 15 kg Magnesium Sulphate + 10 kg Sulphur per acre.',
      firstTopDressing: 'Drip fertigation: 19:19:19 @ 3 kg/acre twice weekly during vine running phase.',
      secondTopDressing: 'Drip fertigation: 0:0:50 @ 4 kg/acre + 250g Boron at fruit netting stage for intense aromatic sweetness.',
      irrigationSchedule: 'Daily morning drip (1-1.5 hrs). Reduce water substantially 8-10 days before harvest to avoid fruit burst.',
      plantProtection: 'Spray Cyantraniliprole 10.26% OD @ 1.2ml/L against Fruit Flies. Install 15 pheromone traps/acre.',
      doctorRemarks: 'Light sandy loams with excellent drainage are crucial. Avoid overhead water touching leaves to prevent powdery mildew.'
    }
  },

  orange: {
    displayName: 'Orange / Citrus / Santra (संतरा / मौसमी)',
    videos: [
      {
        id: 'full_guide',
        title: 'Nagpur Mandarin / Orange Orchard Guide (संतरे की सफल बागवानी A to Z)',
        channel: 'Central Citrus Research Institute (CCRI)',
        duration: '21:10',
        category: 'A to Z Cultivation',
        searchQuery: 'orange santra orchard farming cultivation CCRI',
        highlights: ['Rootstock Selection (Rangpur Lime)', 'Water Stress Management', 'Fruit Drop Prevention']
      },
      {
        id: 'pest_control',
        title: 'Citrus Psylla, Leaf Miner & Gummosis Defense (संतरे के कीट एवं गोंदिया रोग)',
        channel: 'Krishi Jagran Technical',
        duration: '15:20',
        category: 'Disease & Pest Control',
        searchQuery: 'citrus psylla leaf miner gummosis spray control',
        highlights: ['Imidacloprid Spray', 'Fosetyl-Al Drenching for Gummosis', 'Micronutrient Foliar Spray']
      }
    ],
    prescription: {
      rxCode: 'RX-ORANGE-2027',
      stage: 'Bahar Initiation to Fruit Harvest',
      basalDose: 'Apply 25 kg FYM + 600g Nitrogen + 200g Phosphorus + 300g Potassium per mature citrus tree per year.',
      firstTopDressing: 'Foliar spray of 2,4-D (Horticultural Grade) @ 10 ppm + Potassium Nitrate (1%) at marble fruit stage to stop premature fruit drop.',
      secondTopDressing: 'Spray Zinc Sulphate (0.5%) + Ferrous Sulphate (0.2%) + Boric Acid (0.1%) during new vegetative flush.',
      irrigationSchedule: 'Provide stress for 30-40 days for flowering bahar. Drip irrigate regularly once fruit setting begins.',
      plantProtection: 'Spray Imidacloprid 17.8% SL @ 0.5ml/L for Citrus Psylla vector. Paint tree trunks with Bordeaux paste (1:1:10) against Gummosis.',
      doctorRemarks: 'Do not allow water to stand around tree collar trunk. Keep circular tree basins well aerated and weed free.'
    }
  },

  papaya: {
    displayName: 'Papaya / Papita (पपीता की खेती)',
    videos: [
      {
        id: 'full_guide',
        title: 'Red Lady 786 Papaya High Profit Cultivation (ताइवान रेड लेडी पपीता की खेती)',
        channel: 'Indian Farmer / The Advance Agriculture',
        duration: '19:50',
        category: 'A to Z Cultivation',
        searchQuery: 'papaya red lady 786 farming cultivation Indian Farmer',
        highlights: ['Raised Bed Mound Planting', 'Drip Fertigation Schedule', 'Fruit Setting & Latex Management']
      },
      {
        id: 'pest_control',
        title: 'Papaya Ring Spot Virus & Collar Rot Prevention (पपीते का रिंग स्पॉट व कॉलर रॉट)',
        channel: 'Krishi Vigyan Kendra Guide',
        duration: '14:40',
        category: 'Disease & Pest Control',
        searchQuery: 'papaya ring spot virus collar rot control prevention',
        highlights: ['Silver Mulch Aphid Deterrence', 'Copper Oxychloride Stem Drench', 'Neem Seed Extract']
      }
    ],
    prescription: {
      rxCode: 'RX-PAPAYA-2027',
      stage: 'Raised Bed Planting to Fruit Maturation',
      basalDose: 'In planting pit: 10 kg Well-cured FYM + 250g SSP + 100g Neem Cake + 50g Trichoderma.',
      firstTopDressing: 'Apply 50g Urea + 50g MOP per plant every 30 days starting from month 2 to month 8.',
      secondTopDressing: 'Foliar spray of 0:52:34 (1 kg/acre) + Boron (100g) during flowering to ensure sturdy flower attachment.',
      irrigationSchedule: 'Strictly avoid waterlogging. Even 24 hours of standing water causes fatal collar rot. Irrigate via drip 8-12 L/day.',
      plantProtection: 'Drench tree collar with Metalaxyl + Mancozeb (2.5g/L) to prevent Damping Off / Collar Rot. Control aphids with Acetamiprid.',
      doctorRemarks: 'Plant on 30-45 cm raised ridges with drip irrigation. Maintain clean borders to intercept aphid virus vectors.'
    }
  },

  coconut: {
    displayName: 'Coconut Palm (नारियल की बागवानी)',
    videos: [
      {
        id: 'full_guide',
        title: 'Scientific Coconut Palm Cultivation & Bunch Boost (नारियल की वैज्ञानिक बागवानी)',
        channel: 'Coconut Development Board (CDB) / ICAR - CPCRI',
        duration: '22:15',
        category: 'A to Z Cultivation',
        searchQuery: 'coconut farming cultivation ICAR CPCRI guide',
        highlights: ['Pit Preparation 3x3x3 ft', 'Salt & Potash Application', 'Rhinoceros Beetle Defense']
      },
      {
        id: 'pest_control',
        title: 'Rhinoceros Beetle & Eriophyid Mite in Coconut (नारियल का गेंडा कीट एवं माइट्स)',
        channel: 'Green TV India / Shramajeevi',
        duration: '15:10',
        category: 'Disease & Pest Control',
        searchQuery: 'coconut rhinoceros beetle eriophyid mite control treatment',
        highlights: ['Naphthalene Ball Placement in Frond Axils', 'Azadirachtin Root Feeding', 'Pheromone Traps']
      }
    ],
    prescription: {
      rxCode: 'RX-COCONUT-2027',
      stage: 'Basin Care & Continuous Bunch Production',
      basalDose: 'Apply 50 kg Farmyard Manure + 1.3 kg Urea + 2 kg Rock Phosphate + 2 kg Muriate of Potash (MOP) per mature palm annually in circular basin (1.8m radius).',
      firstTopDressing: 'Apply 1 kg Common Salt (NaCl) per palm annually in non-coastal areas to boost frond strength and nut count.',
      secondTopDressing: 'Apply 500g Magnesium Sulphate + 100g Borax per tree annually to avoid button shedding and crown choke.',
      irrigationSchedule: 'Requires 45-50 liters water/palm/day through basin drip. Mulch basin with coconut husk to retain moisture.',
      plantProtection: 'Fill top leaf axils with mixture of Sand + Phorate granules or place 3 Naphthalene balls against Rhinoceros Beetle.',
      doctorRemarks: 'Coconut requires steady potassium and chlorine nutrition. Regular organic mulching in palm basins prevents root drying.'
    }
  }
};

/**
 * Fallback generator for crops without explicit custom entry
 */
export function getCropVideoData(cropName) {
  const key = (cropName || '').toLowerCase().trim();
  if (CROP_VIDEOS_AND_PRESCRIPTIONS[key]) {
    return CROP_VIDEOS_AND_PRESCRIPTIONS[key];
  }

  const cleanName = cropName ? cropName.charAt(0).toUpperCase() + cropName.slice(1) : 'Agricultural Crop';

  // Generic intelligent fallback
  return {
    displayName: cleanName,
    videos: [
      {
        id: 'full_guide',
        title: `${cleanName} Scientific Cultivation Masterclass (${cleanName} की उन्नत खेती)`,
        channel: 'Indian Farmer / National Agriculture Hub',
        duration: '16:40',
        category: 'A to Z Cultivation',
        searchQuery: `${key} cultivation farming guide Indian Farmer`,
        highlights: ['Soil Preparation', 'Seed Selection & Sowing', 'Nutrient Schedule', 'Harvesting']
      },
      {
        id: 'fertilizer',
        title: `${cleanName} NPK & Fertilizer Dosage (${cleanName} में खाद एवं पोषण प्रबंधन)`,
        channel: 'Krishi Vigyan Kendra',
        duration: '12:15',
        category: 'Fertilizer & NPK',
        searchQuery: `${key} fertilizer NPK management dose schedule`,
        highlights: ['Basal Dressing', 'Micronutrient Spray', 'Yield Maximization']
      },
      {
        id: 'pest_control',
        title: `${cleanName} Pest & Disease Management (${cleanName} के प्रमुख कीट एवं रोग)`,
        channel: 'Agri Advisory Expert',
        duration: '13:50',
        category: 'Disease & Pest Control',
        searchQuery: `${key} pest disease protection spray treatment`,
        highlights: ['Preventive Bio-Pesticides', 'Fungicide Regimen', 'Organic Care']
      }
    ],
    prescription: {
      rxCode: `RX-${key.toUpperCase()}-2027`,
      stage: 'Vegetative to Maturation',
      basalDose: 'Apply balanced NPK compound fertilizer with 10 kg/acre Farmyard Manure at soil prep.',
      firstTopDressing: 'Apply Nitrogen supplement at 30 days during active vegetative branching.',
      secondTopDressing: 'Foliar spray of water-soluble NPK + Boron at flower initiation for high fruit/grain setting.',
      irrigationSchedule: 'Maintain balanced root zone moisture. Avoid standing water during root development.',
      plantProtection: 'Apply preventive neem seed kernel extract (NSKE 5%) or Trichoderma seed coating.',
      doctorRemarks: 'Statistically optimal crop match. Follow localized agricultural university sowing advisories for peak productivity.'
    }
  };
}
