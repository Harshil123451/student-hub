import axios from 'axios';

interface SuburbData {
  suburbName: string;
  population: number;
  medianRent: number;
  distanceToCBD: number;
  educationLevels: {
    highSchool: number;
    bachelor: number;
    postgraduate: number;
  };
  employmentRate: number;
  transportModes: {
    publicTransport: number;
    car: number;
    walking: number;
    cycling: number;
  };
  // Melbourne-specific fields
  postcode: string;
  localGovernmentArea: string;
  latitude: number;
  longitude: number;
}

class ABSApiService {
  private baseUrl = 'https://api.abs.gov.au';
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.ABS_API_KEY || '';
    if (!this.apiKey) {
      console.warn('ABS API key not found. Please set ABS_API_KEY in .env.local');
    }
  }

  async getAllMelbourneSuburbs(): Promise<SuburbData[]> {
    try {
      // TODO: Replace with actual ABS API calls
      // This is a mock implementation for now with some real Melbourne suburbs
      const mockSuburbs: SuburbData[] = [
        {
          suburbName: 'Carlton',
          population: 15000,
          medianRent: 450,
          distanceToCBD: 2,
          educationLevels: {
            highSchool: 20,
            bachelor: 50,
            postgraduate: 30,
          },
          employmentRate: 85,
          transportModes: {
            publicTransport: 60,
            car: 20,
            walking: 15,
            cycling: 5,
          },
          postcode: '3053',
          localGovernmentArea: 'City of Melbourne',
          latitude: -37.8000,
          longitude: 144.9667
        },
        {
          suburbName: 'Richmond',
          population: 28000,
          medianRent: 550,
          distanceToCBD: 3,
          educationLevels: {
            highSchool: 25,
            bachelor: 45,
            postgraduate: 30,
          },
          employmentRate: 88,
          transportModes: {
            publicTransport: 65,
            car: 15,
            walking: 15,
            cycling: 5,
          },
          postcode: '3121',
          localGovernmentArea: 'City of Yarra',
          latitude: -37.8167,
          longitude: 145.0000
        },
        {
          suburbName: 'South Yarra',
          population: 22000,
          medianRent: 600,
          distanceToCBD: 4,
          educationLevels: {
            highSchool: 15,
            bachelor: 50,
            postgraduate: 35,
          },
          employmentRate: 90,
          transportModes: {
            publicTransport: 70,
            car: 15,
            walking: 10,
            cycling: 5,
          },
          postcode: '3141',
          localGovernmentArea: 'City of Stonnington',
          latitude: -37.8333,
          longitude: 145.0000
        },
        {
          suburbName: 'Footscray',
          population: 18000,
          medianRent: 400,
          distanceToCBD: 5,
          educationLevels: {
            highSchool: 30,
            bachelor: 40,
            postgraduate: 30,
          },
          employmentRate: 82,
          transportModes: {
            publicTransport: 55,
            car: 25,
            walking: 15,
            cycling: 5,
          },
          postcode: '3011',
          localGovernmentArea: 'City of Maribyrnong',
          latitude: -37.8000,
          longitude: 144.9000
        },
        {
          suburbName: 'Brunswick',
          population: 25000,
          medianRent: 480,
          distanceToCBD: 5,
          educationLevels: {
            highSchool: 25,
            bachelor: 45,
            postgraduate: 30,
          },
          employmentRate: 85,
          transportModes: {
            publicTransport: 60,
            car: 20,
            walking: 15,
            cycling: 5,
          },
          postcode: '3056',
          localGovernmentArea: 'City of Moreland',
          latitude: -37.7667,
          longitude: 144.9667
        }
      ];

      return mockSuburbs;
    } catch (error) {
      console.error('Error fetching Melbourne suburbs:', error);
      return [];
    }
  }

  async getSuburbData(suburbName: string): Promise<SuburbData | null> {
    try {
      // TODO: Implement actual ABS API calls
      const response = await axios.get(`${this.baseUrl}/data/ABS_SUBURB_DATA`, {
        params: {
          suburb: suburbName,
          apiKey: this.apiKey
        }
      });

      return this.transformResponse(response.data);
    } catch (error) {
      console.error('Error fetching suburb data:', error);
      return null;
    }
  }

  private transformResponse(data: any): SuburbData {
    return {
      suburbName: data.suburbName,
      population: data.population,
      medianRent: data.medianRent,
      distanceToCBD: data.distanceToCBD,
      educationLevels: {
        highSchool: data.educationLevels.highSchool,
        bachelor: data.educationLevels.bachelor,
        postgraduate: data.educationLevels.postgraduate,
      },
      employmentRate: data.employmentRate,
      transportModes: {
        publicTransport: data.transportModes.publicTransport,
        car: data.transportModes.car,
        walking: data.transportModes.walking,
        cycling: data.transportModes.cycling,
      },
      postcode: data.postcode,
      localGovernmentArea: data.localGovernmentArea,
      latitude: data.latitude,
      longitude: data.longitude
    };
  }
}

export const absApi = new ABSApiService(); 