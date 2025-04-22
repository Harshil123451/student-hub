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
    educationLevels: {
      highSchool: 25,
      bachelor: 45,
      postgraduate: 30
    },
    employmentRate: 85,
    transportModes: {
      publicTransport: 60,
      car: 20,
      walking: 15,
      cycling: 5
    },
    postcode: "3067",
    localGovernmentArea: "City of Yarra",
    latitude: -37.8000,
    longitude: 145.0000
  },
  {
    suburbName: "Altona",
    population: 9800,
    medianRent: 380,
    distanceToCBD: 13,
    educationLevels: {
      highSchool: 30,
      bachelor: 40,
      postgraduate: 30
    },
    employmentRate: 82,
    transportModes: {
      publicTransport: 55,
      car: 30,
      walking: 10,
      cycling: 5
    },
    postcode: "3018",
    localGovernmentArea: "City of Hobsons Bay",
    latitude: -37.8667,
    longitude: 144.8333
  },
  {
    suburbName: "Armadale",
    population: 7500,
    medianRent: 650,
    distanceToCBD: 8,
    educationLevels: {
      highSchool: 20,
      bachelor: 45,
      postgraduate: 35
    },
    employmentRate: 88,
    transportModes: {
      publicTransport: 65,
      car: 20,
      walking: 10,
      cycling: 5
    },
    postcode: "3143",
    localGovernmentArea: "City of Stonnington",
    latitude: -37.8500,
    longitude: 145.0167
  },
  {
    suburbName: "Ascot Vale",
    population: 12000,
    medianRent: 480,
    distanceToCBD: 5,
    educationLevels: {
      highSchool: 25,
      bachelor: 45,
      postgraduate: 30
    },
    employmentRate: 84,
    transportModes: {
      publicTransport: 60,
      car: 25,
      walking: 10,
      cycling: 5
    },
    postcode: "3032",
    localGovernmentArea: "City of Moonee Valley",
    latitude: -37.7833,
    longitude: 144.9167
  },
  {
    suburbName: "Balwyn",
    population: 13000,
    medianRent: 580,
    distanceToCBD: 10,
    educationLevels: {
      highSchool: 20,
      bachelor: 45,
      postgraduate: 35
    },
    employmentRate: 87,
    transportModes: {
      publicTransport: 50,
      car: 35,
      walking: 10,
      cycling: 5
    },
    postcode: "3103",
    localGovernmentArea: "City of Boroondara",
    latitude: -37.8000,
    longitude: 145.0833
  },
  {
    suburbName: "Box Hill",
    population: 11000,
    medianRent: 420,
    distanceToCBD: 14,
    educationLevels: {
      highSchool: 25,
      bachelor: 45,
      postgraduate: 30
    },
    employmentRate: 83,
    transportModes: {
      publicTransport: 65,
      car: 20,
      walking: 10,
      cycling: 5
    },
    postcode: "3128",
    localGovernmentArea: "City of Whitehorse",
    latitude: -37.8167,
    longitude: 145.1167
  },
  {
    suburbName: "Brighton",
    population: 23000,
    medianRent: 700,
    distanceToCBD: 11,
    educationLevels: {
      highSchool: 20,
      bachelor: 45,
      postgraduate: 35
    },
    employmentRate: 89,
    transportModes: {
      publicTransport: 55,
      car: 30,
      walking: 10,
      cycling: 5
    },
    postcode: "3186",
    localGovernmentArea: "City of Bayside",
    latitude: -37.9167,
    longitude: 144.9833
  },
  {
    suburbName: "Brunswick",
    population: 25000,
    medianRent: 480,
    distanceToCBD: 5,
    educationLevels: {
      highSchool: 25,
      bachelor: 45,
      postgraduate: 30
    },
    employmentRate: 85,
    transportModes: {
      publicTransport: 60,
      car: 20,
      walking: 15,
      cycling: 5
    },
    postcode: "3056",
    localGovernmentArea: "City of Moreland",
    latitude: -37.7667,
    longitude: 144.9667
  },
  {
    suburbName: "Camberwell",
    population: 20000,
    medianRent: 600,
    distanceToCBD: 10,
    educationLevels: {
      highSchool: 20,
      bachelor: 45,
      postgraduate: 35
    },
    employmentRate: 88,
    transportModes: {
      publicTransport: 55,
      car: 30,
      walking: 10,
      cycling: 5
    },
    postcode: "3124",
    localGovernmentArea: "City of Boroondara",
    latitude: -37.8333,
    longitude: 145.0667
  },
  {
    suburbName: "Carlton",
    population: 15000,
    medianRent: 450,
    distanceToCBD: 2,
    educationLevels: {
      highSchool: 20,
      bachelor: 50,
      postgraduate: 30
    },
    employmentRate: 85,
    transportModes: {
      publicTransport: 60,
      car: 20,
      walking: 15,
      cycling: 5
    },
    postcode: "3053",
    localGovernmentArea: "City of Melbourne",
    latitude: -37.8000,
    longitude: 144.9667
  },
  {
    suburbName: "Caulfield",
    population: 5000,
    medianRent: 480,
    distanceToCBD: 9,
    educationLevels: {
      highSchool: 20,
      bachelor: 50,
      postgraduate: 30
    },
    employmentRate: 86,
    transportModes: {
      publicTransport: 65,
      car: 20,
      walking: 10,
      cycling: 5
    },
    postcode: "3162",
    localGovernmentArea: "City of Glen Eira",
    latitude: -37.8833,
    longitude: 145.0333
  },
  {
    suburbName: "Clayton",
    population: 18000,
    medianRent: 380,
    distanceToCBD: 20,
    educationLevels: {
      highSchool: 25,
      bachelor: 45,
      postgraduate: 30
    },
    employmentRate: 82,
    transportModes: {
      publicTransport: 60,
      car: 25,
      walking: 10,
      cycling: 5
    },
    postcode: "3168",
    localGovernmentArea: "City of Monash",
    latitude: -37.9167,
    longitude: 145.1167
  },
  {
    suburbName: "Collingwood",
    population: 9000,
    medianRent: 480,
    distanceToCBD: 3,
    educationLevels: {
      highSchool: 25,
      bachelor: 45,
      postgraduate: 30
    },
    employmentRate: 84,
    transportModes: {
      publicTransport: 65,
      car: 15,
      walking: 15,
      cycling: 5
    },
    postcode: "3066",
    localGovernmentArea: "City of Yarra",
    latitude: -37.8000,
    longitude: 144.9833
  },
  {
    suburbName: "Dandenong",
    population: 30000,
    medianRent: 320,
    distanceToCBD: 30,
    educationLevels: {
      highSchool: 30,
      bachelor: 40,
      postgraduate: 30
    },
    employmentRate: 80,
    transportModes: {
      publicTransport: 50,
      car: 35,
      walking: 10,
      cycling: 5
    },
    postcode: "3175",
    localGovernmentArea: "City of Greater Dandenong",
    latitude: -37.9833,
    longitude: 145.2000
  },
  {
    suburbName: "Doncaster",
    population: 18000,
    medianRent: 500,
    distanceToCBD: 15,
    educationLevels: {
      highSchool: 25,
      bachelor: 45,
      postgraduate: 30
    },
    employmentRate: 85,
    transportModes: {
      publicTransport: 45,
      car: 40,
      walking: 10,
      cycling: 5
    },
    postcode: "3108",
    localGovernmentArea: "City of Manningham",
    latitude: -37.7833,
    longitude: 145.1167
  },
  {
    suburbName: "Elsternwick",
    population: 12000,
    medianRent: 550,
    distanceToCBD: 8,
    educationLevels: {
      highSchool: 20,
      bachelor: 45,
      postgraduate: 35
    },
    employmentRate: 87,
    transportModes: {
      publicTransport: 60,
      car: 25,
      walking: 10,
      cycling: 5
    },
    postcode: "3185",
    localGovernmentArea: "City of Glen Eira",
    latitude: -37.8833,
    longitude: 145.0000
  },
  {
    suburbName: "Essendon",
    population: 21000,
    medianRent: 480,
    distanceToCBD: 9,
    educationLevels: {
      highSchool: 25,
      bachelor: 45,
      postgraduate: 30
    },
    employmentRate: 85,
    transportModes: {
      publicTransport: 55,
      car: 30,
      walking: 10,
      cycling: 5
    },
    postcode: "3040",
    localGovernmentArea: "City of Moonee Valley",
    latitude: -37.7500,
    longitude: 144.9167
  },
  {
    suburbName: "Fitzroy",
    population: 10000,
    medianRent: 520,
    distanceToCBD: 3,
    educationLevels: {
      highSchool: 20,
      bachelor: 50,
      postgraduate: 30
    },
    employmentRate: 86,
    transportModes: {
      publicTransport: 65,
      car: 15,
      walking: 15,
      cycling: 5
    },
    postcode: "3065",
    localGovernmentArea: "City of Yarra",
    latitude: -37.8000,
    longitude: 144.9833
  },
  {
    suburbName: "Footscray",
    population: 18000,
    medianRent: 400,
    distanceToCBD: 5,
    educationLevels: {
      highSchool: 30,
      bachelor: 40,
      postgraduate: 30
    },
    employmentRate: 82,
    transportModes: {
      publicTransport: 55,
      car: 25,
      walking: 15,
      cycling: 5
    },
    postcode: "3011",
    localGovernmentArea: "City of Maribyrnong",
    latitude: -37.8000,
    longitude: 144.9000
  },
  {
    suburbName: "Glen Waverley",
    population: 40000,
    medianRent: 550,
    distanceToCBD: 20,
    educationLevels: {
      highSchool: 25,
      bachelor: 45,
      postgraduate: 30
    },
    employmentRate: 86,
    transportModes: {
      publicTransport: 50,
      car: 35,
      walking: 10,
      cycling: 5
    },
    postcode: "3150",
    localGovernmentArea: "City of Monash",
    latitude: -37.8833,
    longitude: 145.1667
  },
  {
    suburbName: "Hawthorn",
    population: 22000,
    medianRent: 580,
    distanceToCBD: 6,
    educationLevels: {
      highSchool: 20,
      bachelor: 45,
      postgraduate: 35
    },
    employmentRate: 88,
    transportModes: {
      publicTransport: 60,
      car: 25,
      walking: 10,
      cycling: 5
    },
    postcode: "3122",
    localGovernmentArea: "City of Boroondara",
    latitude: -37.8167,
    longitude: 145.0333
  },
  {
    suburbName: "Kew",
    population: 24000,
    medianRent: 650,
    distanceToCBD: 6,
    educationLevels: {
      highSchool: 20,
      bachelor: 45,
      postgraduate: 35
    },
    employmentRate: 89,
    transportModes: {
      publicTransport: 55,
      car: 30,
      walking: 10,
      cycling: 5
    },
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
    educationLevels: {
      highSchool: 20,
      bachelor: 45,
      postgraduate: 35
    },
    employmentRate: 88,
    transportModes: {
      publicTransport: 60,
      car: 25,
      walking: 10,
      cycling: 5
    },
    postcode: "3144",
    localGovernmentArea: "City of Stonnington",
    latitude: -37.8667,
    longitude: 145.0333
  },
  {
    suburbName: "Northcote",
    population: 24000,
    medianRent: 480,
    distanceToCBD: 7,
    educationLevels: {
      highSchool: 25,
      bachelor: 45,
      postgraduate: 30
    },
    employmentRate: 85,
    transportModes: {
      publicTransport: 60,
      car: 20,
      walking: 15,
      cycling: 5
    },
    postcode: "3070",
    localGovernmentArea: "City of Darebin",
    latitude: -37.7667,
    longitude: 145.0000
  },
  {
    suburbName: "Prahran",
    population: 12000,
    medianRent: 550,
    distanceToCBD: 4,
    educationLevels: {
      highSchool: 20,
      bachelor: 50,
      postgraduate: 30
    },
    employmentRate: 86,
    transportModes: {
      publicTransport: 65,
      car: 20,
      walking: 10,
      cycling: 5
    },
    postcode: "3181",
    localGovernmentArea: "City of Stonnington",
    latitude: -37.8500,
    longitude: 144.9833
  },
  {
    suburbName: "Preston",
    population: 32000,
    medianRent: 420,
    distanceToCBD: 9,
    educationLevels: {
      highSchool: 25,
      bachelor: 45,
      postgraduate: 30
    },
    employmentRate: 83,
    transportModes: {
      publicTransport: 55,
      car: 30,
      walking: 10,
      cycling: 5
    },
    postcode: "3072",
    localGovernmentArea: "City of Darebin",
    latitude: -37.7500,
    longitude: 145.0000
  },
  {
    suburbName: "Richmond",
    population: 28000,
    medianRent: 550,
    distanceToCBD: 3,
    educationLevels: {
      highSchool: 25,
      bachelor: 45,
      postgraduate: 30
    },
    employmentRate: 88,
    transportModes: {
      publicTransport: 65,
      car: 15,
      walking: 15,
      cycling: 5
    },
    postcode: "3121",
    localGovernmentArea: "City of Yarra",
    latitude: -37.8167,
    longitude: 145.0000
  },
  {
    suburbName: "South Yarra",
    population: 22000,
    medianRent: 600,
    distanceToCBD: 4,
    educationLevels: {
      highSchool: 15,
      bachelor: 50,
      postgraduate: 35
    },
    employmentRate: 90,
    transportModes: {
      publicTransport: 70,
      car: 15,
      walking: 10,
      cycling: 5
    },
    postcode: "3141",
    localGovernmentArea: "City of Stonnington",
    latitude: -37.8333,
    longitude: 145.0000
  },
  {
    suburbName: "St Kilda",
    population: 19000,
    medianRent: 520,
    distanceToCBD: 6,
    educationLevels: {
      highSchool: 20,
      bachelor: 50,
      postgraduate: 30
    },
    employmentRate: 85,
    transportModes: {
      publicTransport: 65,
      car: 20,
      walking: 10,
      cycling: 5
    },
    postcode: "3182",
    localGovernmentArea: "City of Port Phillip",
    latitude: -37.8667,
    longitude: 144.9833
  },
  {
    suburbName: "Toorak",
    population: 13000,
    medianRent: 800,
    distanceToCBD: 5,
    educationLevels: {
      highSchool: 15,
      bachelor: 45,
      postgraduate: 40
    },
    employmentRate: 91,
    transportModes: {
      publicTransport: 55,
      car: 30,
      walking: 10,
      cycling: 5
    },
    postcode: "3142",
    localGovernmentArea: "City of Stonnington",
    latitude: -37.8333,
    longitude: 145.0167
  },
  {
    suburbName: "Williamstown",
    population: 14000,
    medianRent: 480,
    distanceToCBD: 8,
    educationLevels: {
      highSchool: 25,
      bachelor: 45,
      postgraduate: 30
    },
    employmentRate: 85,
    transportModes: {
      publicTransport: 55,
      car: 30,
      walking: 10,
      cycling: 5
    },
    postcode: "3016",
    localGovernmentArea: "City of Hobsons Bay",
    latitude: -37.8667,
    longitude: 144.9000
  }
]; 