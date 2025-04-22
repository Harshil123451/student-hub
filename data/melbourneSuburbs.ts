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
  }
]; 