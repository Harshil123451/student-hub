export interface SuburbData {
  suburbName: string;
  population: number;
  medianRent: number;
  distanceToCBD: number;
  educationLevel: string;
  employmentRate: number;
  transportModes: string[];
  postcode: string;
  localGovernmentArea: string;
  latitude: number;
  longitude: number;
}

export const melbourneSuburbs: SuburbData[] = [
  {
    suburbName: "Carlton",
    population: 15000,
    medianRent: 450,
    distanceToCBD: 2,
    educationLevel: "High",
    employmentRate: 85,
    transportModes: ["Tram", "Train", "Bus"],
    postcode: "3053",
    localGovernmentArea: "City of Melbourne",
    latitude: -37.8000,
    longitude: 144.9667
  },
  {
    suburbName: "Parkville",
    population: 12000,
    medianRent: 480,
    distanceToCBD: 3,
    educationLevel: "Very High",
    employmentRate: 88,
    transportModes: ["Tram", "Train", "Bus"],
    postcode: "3052",
    localGovernmentArea: "City of Melbourne",
    latitude: -37.7833,
    longitude: 144.9500
  },
  {
    suburbName: "Brunswick",
    population: 25000,
    medianRent: 400,
    distanceToCBD: 5,
    educationLevel: "High",
    employmentRate: 82,
    transportModes: ["Tram", "Train", "Bus"],
    postcode: "3056",
    localGovernmentArea: "City of Moreland",
    latitude: -37.7667,
    longitude: 144.9667
  },
  {
    suburbName: "Fitzroy",
    population: 10000,
    medianRent: 500,
    distanceToCBD: 3,
    educationLevel: "High",
    employmentRate: 83,
    transportModes: ["Tram", "Bus"],
    postcode: "3065",
    localGovernmentArea: "City of Yarra",
    latitude: -37.8000,
    longitude: 144.9833
  },
  {
    suburbName: "North Melbourne",
    population: 13000,
    medianRent: 420,
    distanceToCBD: 2,
    educationLevel: "High",
    employmentRate: 84,
    transportModes: ["Tram", "Train", "Bus"],
    postcode: "3051",
    localGovernmentArea: "City of Melbourne",
    latitude: -37.8000,
    longitude: 144.9500
  },
  {
    suburbName: "South Yarra",
    population: 22000,
    medianRent: 600,
    distanceToCBD: 4,
    educationLevel: "Very High",
    employmentRate: 90,
    transportModes: ["Train", "Tram", "Bus"],
    postcode: "3141",
    localGovernmentArea: "City of Stonnington",
    latitude: -37.8333,
    longitude: 145.0000
  },
  {
    suburbName: "Richmond",
    population: 28000,
    medianRent: 550,
    distanceToCBD: 3,
    educationLevel: "High",
    employmentRate: 88,
    transportModes: ["Train", "Tram", "Bus"],
    postcode: "3121",
    localGovernmentArea: "City of Yarra",
    latitude: -37.8167,
    longitude: 145.0000
  },
  {
    suburbName: "St Kilda",
    population: 19000,
    medianRent: 520,
    distanceToCBD: 6,
    educationLevel: "High",
    employmentRate: 85,
    transportModes: ["Tram", "Bus"],
    postcode: "3182",
    localGovernmentArea: "City of Port Phillip",
    latitude: -37.8667,
    longitude: 144.9833
  },
  {
    suburbName: "Footscray",
    population: 18000,
    medianRent: 400,
    distanceToCBD: 5,
    educationLevel: "Medium",
    employmentRate: 82,
    transportModes: ["Train", "Bus", "Tram"],
    postcode: "3011",
    localGovernmentArea: "City of Maribyrnong",
    latitude: -37.8000,
    longitude: 144.9000
  },
  {
    suburbName: "Box Hill",
    population: 11000,
    medianRent: 420,
    distanceToCBD: 14,
    educationLevel: "High",
    employmentRate: 83,
    transportModes: ["Train", "Bus"],
    postcode: "3128",
    localGovernmentArea: "City of Whitehorse",
    latitude: -37.8167,
    longitude: 145.1167
  },
  {
    suburbName: "Clayton",
    population: 18000,
    medianRent: 380,
    distanceToCBD: 20,
    educationLevel: "High",
    employmentRate: 82,
    transportModes: ["Train", "Bus"],
    postcode: "3168",
    localGovernmentArea: "City of Monash",
    latitude: -37.9167,
    longitude: 145.1167
  },
  {
    suburbName: "Hawthorn",
    population: 22000,
    medianRent: 580,
    distanceToCBD: 6,
    educationLevel: "Very High",
    employmentRate: 88,
    transportModes: ["Train", "Tram", "Bus"],
    postcode: "3122",
    localGovernmentArea: "City of Boroondara",
    latitude: -37.8167,
    longitude: 145.0333
  },
  {
    suburbName: "Prahran",
    population: 12000,
    medianRent: 550,
    distanceToCBD: 4,
    educationLevel: "High",
    employmentRate: 86,
    transportModes: ["Tram", "Bus"],
    postcode: "3181",
    localGovernmentArea: "City of Stonnington",
    latitude: -37.8500,
    longitude: 144.9833
  },
  {
    suburbName: "Toorak",
    population: 13000,
    medianRent: 800,
    distanceToCBD: 5,
    educationLevel: "Very High",
    employmentRate: 91,
    transportModes: ["Tram", "Bus"],
    postcode: "3142",
    localGovernmentArea: "City of Stonnington",
    latitude: -37.8333,
    longitude: 145.0167
  },
  {
    suburbName: "Brighton",
    population: 23000,
    medianRent: 700,
    distanceToCBD: 11,
    educationLevel: "Very High",
    employmentRate: 89,
    transportModes: ["Train", "Bus"],
    postcode: "3186",
    localGovernmentArea: "City of Bayside",
    latitude: -37.9167,
    longitude: 144.9833
  },
  {
    suburbName: "Kew",
    population: 24000,
    medianRent: 650,
    distanceToCBD: 6,
    educationLevel: "Very High",
    employmentRate: 89,
    transportModes: ["Tram", "Bus"],
    postcode: "3101",
    localGovernmentArea: "City of Boroondara",
    latitude: -37.8000,
    longitude: 145.0333
  },
  {
    suburbName: "Malvern",
    population: 10000,
    medianRent: 600,
    distanceToCBD: 8,
    educationLevel: "Very High",
    employmentRate: 88,
    transportModes: ["Tram", "Bus"],
    postcode: "3144",
    localGovernmentArea: "City of Stonnington",
    latitude: -37.8667,
    longitude: 145.0333
  },
  {
    suburbName: "Camberwell",
    population: 20000,
    medianRent: 600,
    distanceToCBD: 10,
    educationLevel: "Very High",
    employmentRate: 88,
    transportModes: ["Train", "Tram", "Bus"],
    postcode: "3124",
    localGovernmentArea: "City of Boroondara",
    latitude: -37.8333,
    longitude: 145.0667
  },
  {
    suburbName: "Balwyn",
    population: 13000,
    medianRent: 580,
    distanceToCBD: 10,
    educationLevel: "Very High",
    employmentRate: 87,
    transportModes: ["Bus", "Tram"],
    postcode: "3103",
    localGovernmentArea: "City of Boroondara",
    latitude: -37.8000,
    longitude: 145.0833
  },
  {
    suburbName: "Glen Waverley",
    population: 40000,
    medianRent: 550,
    distanceToCBD: 20,
    educationLevel: "High",
    employmentRate: 86,
    transportModes: ["Train", "Bus"],
    postcode: "3150",
    localGovernmentArea: "City of Monash",
    latitude: -37.8833,
    longitude: 145.1667
  }
]; 