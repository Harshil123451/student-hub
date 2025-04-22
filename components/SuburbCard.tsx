import { useState } from 'react';
import { SuburbData } from '@/data/melbourneSuburbs';

interface SuburbCardProps {
  suburb: SuburbData;
}

export function SuburbCard({ suburb }: SuburbCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold">{suburb.suburbName}</h2>
          <span className="text-sm text-gray-500">{suburb.postcode}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{suburb.localGovernmentArea}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Population</p>
            <p className="font-medium">{suburb.population.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Median Rent</p>
            <p className="font-medium">${suburb.medianRent}/week</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Distance to CBD</p>
            <p className="font-medium">{suburb.distanceToCBD}km</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Employment Rate</p>
            <p className="font-medium">{suburb.employmentRate}%</p>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t">
            <h3 className="font-medium mb-2">Education Levels</h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>High School</span>
                <span>{suburb.educationLevels.highSchool}%</span>
              </div>
              <div className="flex justify-between">
                <span>Bachelor</span>
                <span>{suburb.educationLevels.bachelor}%</span>
              </div>
              <div className="flex justify-between">
                <span>Postgraduate</span>
                <span>{suburb.educationLevels.postgraduate}%</span>
              </div>
            </div>

            <h3 className="font-medium mt-4 mb-2">Transport Modes</h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Public Transport</span>
                <span>{suburb.transportModes.publicTransport}%</span>
              </div>
              <div className="flex justify-between">
                <span>Car</span>
                <span>{suburb.transportModes.car}%</span>
              </div>
              <div className="flex justify-between">
                <span>Walking</span>
                <span>{suburb.transportModes.walking}%</span>
              </div>
              <div className="flex justify-between">
                <span>Cycling</span>
                <span>{suburb.transportModes.cycling}%</span>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>Coordinates: {suburb.latitude}, {suburb.longitude}</p>
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <button 
            className="text-blue-600 hover:text-blue-800 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </div>
  );
} 